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
            'net_price' => $this->net_price,
            'discount' => $this->discount,
            'quantity' => $this->quantity,
            'condition' => $this->condition,
            'date' => Carbon::parse($this->created_at)->format('Y-m-d'), // Parse and format the date
            'favorites_count' => $this->favorites->count(),
            'description' => $this->description,
            'attributes' => $this->attributes,
            'state' =>  $this->state,
            // 'image' => asset('storage/' .$this->images[0]?->image_url),
            'images' => asset('storage/' . $this->images->first() ?->image_url),
        ];
    }


    /**
     * Calculate the distance from a given latitude and longitude.
     *
     * @param float $latitude
     * @param float $longitude
     * @return float
     */
    private function calculateDistance($latitude, $longitude)
    {
        // Using the Haversine formula to calculate the distance (in km) between two lat/long points
        $earthRadius = 6371; // Earth radius in kilometers

        $latFrom = deg2rad($latitude);
        $longFrom = deg2rad($longitude);
        $latTo = deg2rad($this->latitude);
        $longTo = deg2rad($this->longitude);

        $latDelta = $latTo - $latFrom;
        $longDelta = $longTo - $longFrom;

        $a = sin($latDelta / 2) * sin($latDelta / 2) +
            cos($latFrom) * cos($latTo) *
            sin($longDelta / 2) * sin($longDelta / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c; // Distance in kilometers
    }
}
