<?php

namespace App\Http\Controllers;

use App\Models\ProductAttributeValue;
use App\Http\Requests\ProductAttributeValueRequest;
use App\Http\Resources\ProductAttributeValueResource;


class ProductAttributeValueController extends Controller
{
    public function store(ProductAttributeValueRequest $request)
    {
        $value = ProductAttributeValue::create($request->validated());
        return new ProductAttributeValueResource($value);
    }

    public function update(ProductAttributeValueRequest $request, ProductAttributeValue $value)
    {
        $value->update($request->validated());
        return new ProductAttributeValueResource($value);
    }

    public function destroy(ProductAttributeValue $value)
    {
        $value->delete();
        return response()->json(null, 204);
    }

}
