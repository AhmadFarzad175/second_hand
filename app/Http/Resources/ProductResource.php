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
            'WhatsApp' => $this->user && $this->user->phone
            ? 'https://wa.me/' . $this->user->phone . '?text=' . urlencode("Hello, I'm interested in your product '{$this->name}' listed for {$this->price}")
            : null,
            'category' => $this->category ? new CategoryResource($this->category) : null,
            'favorites_count' => $this->favorites->count(),
            'attributes' => $this->attributes,
            'distance' => $this->when(
                $request->has('latitude') && $request->has('longitude'),
                fn() => $this->calculateDistance($request->input('latitude'), $request->input('longitude'))
            ),

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
