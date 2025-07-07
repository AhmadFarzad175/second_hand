<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class WebsiteProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
{
    // dd($request->all()); // Debugging line to check request data
    $userId = $request->input('user_id'); // Fixed null coalescing operator
    return [
        'id' => $this->id,
        'name' => $this->name,
        'original_price' => $this->formatPrice($this->price), // Formatted original price
        'final_price' => $this->formatPrice($this->final_price), // Formatted final price
        'currency' => $this->currency === "AFN" ? "؋" : "$",
        'discount' => $this->discount > 0 ? $this->formatDiscount() : null, // Only show if discount exists
        'discount_type' => $this->discount_type,
        'posted' => Carbon::parse($this->created_at)->diffForHumans(),
        'isFavorite' => $this->checkIsFavorite($userId),
        'images' => $this->getFirstImageUrl(),
        'howFar' => $this->getDistanceFromRequest($userId),
        'condition' => $this->condition,
        'state' => $this->state,
        'has_discount' => $this->discount > 0, // Helper flag for frontend
    ];
}

protected function formatPrice($amount)
{
    $amount = (float) $amount;

    if ($this->currency === "AFN") {
        return number_format($amount, 0, '.', ',') . ' ؋';
    }
    return '$' . number_format($amount, 2);
}

protected function formatDiscount()
{
    if ($this->discount_type === '%') {
        return $this->discount . '% OFF';
    }
    return $this->formatPrice($this->discount) . ' OFF';
}



    /**
     * Check if product is marked as favorite by the user.
     */
    protected function checkIsFavorite($userId)
    {
        if (!$userId) {
            return false;
        }

        return DB::table('favorites')
            ->where('user_id', $userId)
            ->where('product_id', $this->id)
            ->exists();
    }

    /**
     * Get the first image URL or null.
     */
    protected function getFirstImageUrl()
    {
        if ($this->images?->isNotEmpty()) {
            return asset('storage/' . $this->images->first()->image_url);
        }

        return null;
    }

    /**
     * Calculate how far the product is from the user.
     */
    protected function getDistanceFromRequest($userId)
    {
 // Check if $userId is "undefined" or invalid
    if ($userId === "undefined" || !is_numeric($userId)) {
        return null; // or throw an exception
    }
$user = User::find($userId);
$AuthLocation = json_decode($user->location, true);
$userLat = $AuthLocation['latitude'] ?? null;       // Use array access
$userLng = $AuthLocation['longitude'] ?? null;


        $location = json_decode($this->user?->location, true );
        if (
            !isset($location['latitude'], $location['longitude']) ||
            !$userLat || !$userLng
        ) {
            return null;
        }

        $productLat = $location['latitude'];
        $productLng = $location['longitude'];

        // Haversine formula
        $earthRadius = 6371;
        $latDiff = deg2rad($productLat - $userLat);
        $lngDiff = deg2rad($productLng - $userLng);

        $a = sin($latDiff / 2) ** 2 +
            cos(deg2rad($userLat)) * cos(deg2rad($productLat)) *
            sin($lngDiff / 2) ** 2;

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius * $c;

        return round($distance, 1) . ' km';
    }
}
