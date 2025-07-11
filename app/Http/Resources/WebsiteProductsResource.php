<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Traits\ProjectFormatTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class WebsiteProductsResource extends JsonResource
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
        $userId = $request->input('user_id');
        return [
            'id' => $this->id,
            'name' => $this->name,
            'original_price' => $this->formatPrice($this->price),
            'final_price' => $this->formatPrice($this->final_price),
            'currency' => $this->currency === "AFN" ? "؋" : "$",
            'discount' => $this->discount > 0 ? $this->formatDiscount() : null,
            'posted' => Carbon::parse($this->created_at)->diffForHumans(),
            'isFavorite' => $this->checkIsFavorite($userId),
            'images' => $this->getFirstImageUrl(),
            'howFar' => $this->getDistanceFromRequest($userId),
            'condition' => $this->condition,
            'state' => $this->state,
            'has_discount' => $this->discount > 0, // Helper flag for frontend
        ];
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


        $location = json_decode($this->user?->location, true);
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
