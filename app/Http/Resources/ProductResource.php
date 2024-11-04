<?php

// namespace App\Http\Resources;

// use Illuminate\Http\Request;
// use Illuminate\Http\Resources\Json\JsonResource;

// class ProductResource extends JsonResource
// {
//     /**
//      * Transform the resource into an array.
//      *
//      * @return array<string, mixed>
//      */
//     public function toArray(Request $request): array
//     {

//             return [
//                 'id' => $this->id,
//                 'name' => $this->name,
//                 'description' => $this->description,
//                 'price' => $this->price,
//                 'condation' => $this->condition,
//                 'date' => $this->date,
//             ];

//     }
// }

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
            'previous_price' => $this->previous_price,
            'price' => $this->price,
            'condition' => $this->condition ? 'new' : 'used',
            'date' => $this->date ? Carbon::parse($this->date)->format('Y-m-d') : null, // Parse and format the date
            'category' => $this->category ? new CategoryResource($this->category) : null,
            'images' => $this->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'image_path' => url('storage/' . $image->image_path),
                ];
            }),
            'attribute_values' => $this->attributeValues->map(function ($attributeValue) {
                return [
                    'attribute' => $attributeValue->attribute->name,
                    'value' => $attributeValue->value,
                ];
            }),
            'reviews' => [
                'count' => $this->reviews->count(),
                'average_rating' => $this->reviews->average('rating'),
            ],
            'favorites_count' => $this->favorites->count(),
            // 'whatsapp_link' => $this->user->phone
            //     ? 'https://wa.me/' . $this->user->phone . '?text=Hello%2C%20I%27m%20interested%20in%20your%20product%20%27' . urlencode($this->name) . '%27%20listed%20for%20' . $this->price
            //     : null,
            'whatsapp_link' => $this->user && $this->user->phone
                ? 'https://wa.me/' . $this->user->phone . '?text=' . urlencode("Hello, I'm interested in your product '{$this->name}' listed for {$this->price}")
                : null,
        ];
    }
}
