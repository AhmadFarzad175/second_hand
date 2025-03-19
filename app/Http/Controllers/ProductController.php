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
        $filters = $request->only(['category', 'price', 'location', 'condition', 'date']);
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');

        $query = Product::with(['category', 'user', 'images', 'reviews', 'attribute'])
            ->orderBy('id', 'ASC')
            ->search($search);

        $filteredQuery = ProductFilter::apply($query, $filters);
        $products = $perPage ? $filteredQuery->paginate($perPage) : $filteredQuery->get();
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->validated());
        // Step 2: Add product attributes if they exist in the request
        if ($request->has('attributes')) {
            foreach ($request->attributes as $attribute) {
                // Assuming the 'attributes' is an array of 'attribute_id' and 'value'
                $product->attributeValues()->create([
                    'attribute_id' => $attribute['attribute_id'], // The ID of the attribute
                    'value' => $attribute['value'],               // The value of the attribute (e.g., 'Red', '3')
                ]);
            }
        }

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

        // Handle updating images
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
}
