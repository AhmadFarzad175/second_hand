<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class UserProducts extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        // dd($this->images);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'currency' => $this->currency,
            'discount' => $this->discount,
            'posted'     => Carbon::parse($this->created_at)->diffForHumans(),
            'state' =>  $this->state,
            'image' => asset('storage/' . $this->images->first()->image_url),
            'rating' => rand(3, 5)

            // 'quantity' => $this->quantity,
            // 'category' => $this->category?->name,
            // 'condition' => $this->condition,
            // 'favorites_count' => $this->favorites->count(),
            // 'images' => $this->images->map(function ($image) {
            //     return asset('storage/' . $image->image_url);
            // }),
        ];
    }
}
