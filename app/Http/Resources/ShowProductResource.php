<?php

namespace App\Http\Resources;

use App\Traits\ProjectFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ShowProductResource extends JsonResource
{
    use ProjectFormatTrait;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $userId = $request->input('user_id') ?? null; // Fixed null coalescing operator
        // dd($userId);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category_id' => $this->category_id,
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name
            ],
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
                'phone' => $this->user?->phone,
                'description' => $this->user?->description,
                'image' => $this->getUserImage($this->user?->image),
                'rating' => $this->user?->rating ?? 3,
                'total_products' => $this->user?->products()->count(),
            ],
            'original_price' => $this->formatPrice($this->price),
            'final_price' => $this->formatPrice($this->final_price),
            'formattedDiscount' => $this->discount > 0 ? $this->formatDiscount() : 0,
            'discount' => $this->discount,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'currency' => $this->currency,
            'discount_type' => $this->discount_type,
            'condition' => $this->condition,
            'date' => Carbon::parse($this->created_at)->format('Y-m-d'), // Parse and format the date
            'favorites_count' => $this->favorites->count(),
            'isFavorite' => $this->checkIsFavorite($userId),
            'description' => $this->description,

            'location' => $this->user->location,
            // 'location' => json_decode($this->location ?? '{}', true),

            'attributes' => $this->attributes,
            'images' => $this->getImageUrls(),

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
