<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'location' => $this->location,
            'description' => $this->description,
            'net_price' => $this->net_price,
            'condition' => $this->condition ? 'New' : 'Used',
            'date' => $this->date ? Carbon::parse($this->date)->format('Y-m-d') : null, // Parse and format the date
            // 'attribute_values' => $this->attributeValues->map(function ($attributeValue) {
            //     return [
            //         'attribute' => $attributeValue->attribute->name,
            //         'value' => $attributeValue->value,
            //     ];
            // }),
            'attribute_values' => $this->attributeValues->map(function ($attributeValue) {
                return [
                    'attribute' => $attributeValue->attribute ? $attributeValue->attribute->name : null,
                    'value' => $attributeValue->value,
                ];
            }),
            'WhatsApp' => $this->user && $this->user->phone
                ? 'https://wa.me/' . $this->user->phone . '?text=' . urlencode("Hello, I'm interested in your product '{$this->name}' listed for {$this->price}")
                : null,
            'category' => $this->category ? new CategoryResource($this->category) : null,
            'favorites_count' => $this->favorites->count(),

        ];
    }
}
