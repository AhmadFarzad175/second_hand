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
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name
            ],
            'category_id' => $this->category_id,
            'user' => $this->user?->name,
            'net_price' => $this->net_price . ' ' . $this->currency,
            'discount' => $this->discount,
            'quantity' => $this->quantity,
            'condition' => $this->condition,
            'date' => Carbon::parse($this->created_at)->format('Y-m-d'), // Parse and format the date
            'favorites_count' => $this->favorites->count(),
            'description' => $this->description,
            'attributes' => $this->attributes,
            'state' =>  $this->state,

            // 'image' => asset('storage/' .$this->images[0]?->image_url),
            'images' => $this->images->map(function ($image) {
                return asset('storage/' . $image->image_url);
            }),
        ];
    }

}
