<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::with(['user','category'])->get();
        return ProductResource::collection($products);

    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        // Product::create($request->validated());
        //

    $product = Product::create($request->validated());

    // Handle product images
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $path = $image->store('product_images');
            $product->images()->create(['image_path' => $path]);
        }
    }

    // Optionally, you can return a response
    return response()->json(['message' => 'Product created successfully'], 201);
}


// Optionally, you can return a response


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return ProductResource::make($product);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return response()->json(['success'=> 'Product updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductRequest $product)
    {
        $product->delete();
        return response()->json(['success'=>'Product deleted successfully']);

    }
}
