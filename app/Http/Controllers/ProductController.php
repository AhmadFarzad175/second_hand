<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShowProductResource;
use App\Models\Image;
use App\Models\Product;
use App\Traits\ImageManipulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ImageResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\WebsiteProductsResource;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Services\ProductFilter; // Import the ProductFilter service
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    use ImageManipulation;
    /**
     * Display a listing of the resource with filtering.
     */
    public function index(Request $request)
    {
        $filters = $request->only([
            'category',
            'price',
            'location',
            'condition',
            'date',
            'attributes'
        ]);

        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');

        $user = Auth::user();
        $userLat = $user->latitude ?? null;
        $userLng = $user->longitude ?? null;

        $query = Product::with(['category', 'user', 'images', 'favorites'])
            ->orderBy('id', 'DESC')
            ->search($search);

        // Distance filtering and ordering
        if ($userLat && $userLng) {
            $query->select('*')->selectRaw("(
                6371 * acos(cos(radians(?)) * cos(radians(latitude))
                * cos(radians(longitude) - radians(?)) + sin(radians(?))
                * sin(radians(latitude)))
            ) AS distance", [$userLat, $userLng, $userLat])
                ->orderBy('distance', 'asc');
        }

        // Apply all filters, including attributes
        $filteredQuery = ProductFilter::apply($query, $filters);

        $products = $perPage ? $filteredQuery->paginate($perPage) : $filteredQuery->get();

        return ProductResource::collection($products);
    }


    /**
     * Store a newly created resource in storage.
     */

    public function store(ProductRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()?->id || 1;

        // CREATE PRODUCT
        $product = Product::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Store the image and get the path
                $path = $image->store('images/products', 'public');

                // Save the path to the images table
                $product->images()->create(['image_url' => $path]);
            }
        }

        return response()->json([
            'message' => 'Product created successfully',
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return ShowProductResource::make($product->load(['images', 'category', 'user',]));
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(ProductRequest $request, Product $product)
    {
        // Validate and get the validated data from the request
        $validated = $request->validated();

        // Update product fields
        $product->update($validated);

        // Handle images (if new images are uploaded)
        if ($request->hasFile('images')) {
            // Optional: delete old images from storage and database
            foreach ($product->images as $oldImage) {
                // Delete the file from storage
                if (Storage::disk('public')->exists(str_replace('storage/', '', $oldImage->image_url))) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $oldImage->image_url));
                }

                // Delete from DB
                $oldImage->delete();
            }

            // Store new images
            foreach ($request->file('images') as $image) {
                $path = $image->store('images/products', 'public');
                $product->images()->create(['image_url' => $path]);
            }
        }

        return response()->json([
            'message' => 'Product updated successfully',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        foreach ($product->images as $image) {
            $this->deleteImage($image, 'images/products', 'image_url');
        }

        $product->images()->delete();
        $product->delete();

        return response()->json(['success' => 'Product deleted successfully']);
        // foreach ($product->images as $image) {
        //     $path = public_path($image->image_url);
        //     File::exists($path) ? File::delete($path) : null;
        // }
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
        // it is the comment which i need for pushing
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


    public function allImages($id)
    {
        $images = Image::where('product_id', $id)->get();
        return ImageResource::collection($images);
    }


    public function websiteProducts(Request $request)
    {
        $filters = $request->only([
            'category',
            'price',
            'location',
            'condition',
            'date',
            'attributes'
        ]);

        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');

        $user = Auth::user();
        $user = User::find(1);

        $location = json_decode($user->location);
        $userLat = $location->latitude ?? null;
        $userLng = $location->longitude ?? null;
        // dd($user->location);
        // dd($userLat);
        $query = Product::with(['images', 'favorites', 'user']) // <-- add 'user'
            ->orderBy('id', 'DESC')
            ->search($search);


        // Distance filtering and ordering
        if ($userLat && $userLng) {
            $query->select('products.*')->selectRaw("(
                6371 * acos(
                    cos(radians(?)) * cos(radians(CAST(JSON_UNQUOTE(JSON_EXTRACT(users.location, '$.latitude')) AS DECIMAL(10,7)))) *
                    cos(radians(CAST(JSON_UNQUOTE(JSON_EXTRACT(users.location, '$.longitude')) AS DECIMAL(10,7)) - ?)) +
                    sin(radians(?)) * sin(radians(CAST(JSON_UNQUOTE(JSON_EXTRACT(users.location, '$.latitude')) AS DECIMAL(10,7))))
                )
            ) AS distance", [$userLat, $userLng, $userLat])
                ->join('users', 'products.user_id', '=', 'users.id')
                ->orderBy('distance', 'asc');
        }

        // Apply all filters, including attributes
        $filteredQuery = ProductFilter::apply($query, $filters);

        $products = $perPage ? $filteredQuery->paginate($perPage) : $filteredQuery->get();

        return WebsiteProductsResource::collection($products);
    }
}
