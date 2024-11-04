<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductFilter; // Import the ProductFilter service
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource with filtering.
     */
    public function index(Request $request)
    {
        // Retrieve filters and pagination settings from the request
        $filters = $request->only(['category', 'price', 'location', 'condition', 'date']);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');

        // Start a base query on the Product model with eager-loaded relationships
        $query = Product::with(['category', 'user', 'images', 'reviews'])
                        ->orderBy('id', 'ASC')
                        ->search($search);

        // Apply filters using the ProductFilter service
        $filteredQuery = ProductFilter::apply($query, $filters);

        // Apply pagination or get all filtered results
        $products = $perPage ? $filteredQuery->paginate($perPage) : $filteredQuery->get();

        // Return a paginated or collection response with ProductResource
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->validated());

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
        return ProductResource::make($product->load(['images', 'category', 'user']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        // Handle updating images
        if ($request->hasFile('images')) {
            // Optionally delete old images if needed
            // $product->images()->delete(); // Uncomment if you want to delete existing images

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
}
