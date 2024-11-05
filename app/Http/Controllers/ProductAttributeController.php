<?php

namespace App\Http\Controllers;

use App\Models\ProductAttribute;
use App\Http\Requests\ProductAttributeRequest;
use App\Http\Resources\ProductAttributeResource;

class ProductAttributeController extends Controller
{
    public function index()
    {
        return ProductAttributeResource::collection(ProductAttribute::all());
    }

    public function store(ProductAttributeRequest $request)
    {
        $attribute = ProductAttribute::create($request->validated());
        return new ProductAttributeResource($attribute);
    }

    public function show(ProductAttribute $attribute)
    {
        return new ProductAttributeResource($attribute->load('categories'));
    }

    public function update(ProductAttributeRequest $request, ProductAttribute $attribute)
    {
        $attribute->update($request->validated());
        return new ProductAttributeResource($attribute);
    }

    public function destroy(ProductAttribute $attribute)
    {
        $attribute->delete();
        return response()->json(null, 204);
    }
}
