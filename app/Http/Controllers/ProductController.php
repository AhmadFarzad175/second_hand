<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use App\Services\ProductFilter; // Import the ProductFilter service

class ProductController extends Controller
{
    /**
     * Display a listing of the resource with filtering.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['category', 'price', 'location', 'condition', 'date']);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');

        // Get the authenticated user's latitude and longitude
        $user = Auth::user();
        $userLat = $user->latitude;
        $userLng = $user->longitude;

        // Start the product query with the necessary relationships
        $query = Product::with(['category', 'user', 'images', 'reviews', 'attributes'])
            ->orderBy('id', 'ASC')
            ->search($search);

        // If the user’s latitude and longitude are available, add the distance calculation to the query
        if ($userLat && $userLng) {
            $query->select('*')
                ->selectRaw("(
                6371 * acos(cos(radians($userLat))
                * cos(radians(latitude))
                * cos(radians(longitude) - radians($userLng))
                + sin(radians($userLat))
                * sin(radians(latitude)))
            ) AS distance")
                ->orderBy('distance', 'asc'); // Order products by distance (ascending)
        }

        // Apply additional filters if provided
        $filteredQuery = ProductFilter::apply($query, $filters);

        // Paginate or get all products
        $products = $perPage ? $filteredQuery->paginate($perPage) : $filteredQuery->get();

        // Return the filtered products in the ProductResource format
        return ProductResource::collection($products);
    }


    /**
     * Store a newly created resource in storage.
     */

    public function store(ProductRequest $request)
    {
        // Validate the location fields if they are provided
        $validatedData = $request->validated();
        // Handle attributes (store as a JSON object)
        if ($request->has('attributes')) {
            $validatedData['attributes'] = json_encode($request->input('attributes'));
        }
        $validatedData = $this->handleLocationData($request, $validatedData);


        $product = Product::create($validatedData);


        // Handle product images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_images');
                $product->images()->create(['image_path' => $path]);
            }
        }

        return response()->json([
            'message' => 'Product created successfully',
            'product' => new ProductResource($product),
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return ProductResource::make($product->load(['images', 'category', 'user', 'attribute',]));
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());


        // Validate and get the validated data from the request
        $validatedData = $request->validated();
        // Handle attributes (store as a JSON object)
        if ($request->has('attributes')) {
            $validatedData['attributes'] = json_encode($request->input('attributes'));
        }

        $validatedData = $this->handleLocationData($request, $validatedData);

        // Update the product with the validated data
        $product->update($validatedData);

        // Handle updating images if they exist in the request
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_images');
                $product->images()->create(['image_path' => $path]);
            }
        }

        return response()->json(['success' => 'Product updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete associated images
        $product->images()->delete();
        $product->delete();

        return response()->json(['success' => 'Product deleted successfully']);
    }

    private function handleLocationData(Request $request, array $validatedData)
    {
        if ($request->has('latitude') && $request->has('longitude')) {
            $validatedData['latitude'] = $request->input('latitude');
            $validatedData['longitude'] = $request->input('longitude');
        }

        if ($request->has('location')) {
            $validatedData['location'] = $request->input('location');
        }

        return $validatedData;
    }

public function bulkDelete(Request $request)
{
    // Validate that productIds is an array of valid IDs
    $request->validate([
        'productIds' => 'required|array',
        'productIds.*' => 'exists:products,id',
    ]);

    $productIds = $request->input('productIds');

    // Fetch the products owned by the authenticated user
    $products = Product::with('images')
        ->whereIn('id', $productIds)
        ->where('user_id', Auth::id()) // Authorization: only delete your own
        ->get();

    if ($products->isEmpty()) {
        return response()->json(['message' => 'No valid or authorized products found.'], 404);
    }

    // Delete image files and product entries
    foreach ($products as $product) {
        foreach ($product->images as $image) {
            if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
                Storage::disk('public')->delete($image->image_path);
            }
        }

        $product->images()->delete();
        $product->delete();
    }

    return response()->noContent(); // 204 No Content
}
}
