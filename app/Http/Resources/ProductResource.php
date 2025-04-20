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
            'category' => $this->category ? new CategoryResource($this->category) : null,
            'price' => $this->net_price,
            'discount' => $this->discount,
            'condition' => $this->condition,
            'date' => Carbon::parse($this->created_at)->format('Y-m-d'), // Parse and format the date
            'favorites_count' => $this->favorites->count(),
            'description' => $this->description,

            'location' => $this->location,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'attributes' => $this->attributes,
            'image' => asset($this->images[0]->image_url),
            
            'WhatsApp' => $this->user && $this->user->phone
            ? 'https://wa.me/' . $this->user->phone . '?text=' . urlencode("Hello, I'm interested in your product '{$this->name}' listed for {$this->price}")
            : null,
        ];
    }
   
}
