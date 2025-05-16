<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

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
        $userId = $request->query('user_id') || 1;

        // dd($this);
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'net_price'  => $this->net_price,
            'discount'   => $this->discount,
            'posted'     => Carbon::parse($this->created_at)->diffForHumans(),
            'isFavorite' => $this->checkIsFavorite($userId),
            'images'     => $this->getFirstImageUrl(),
            'howFar'     => $this->getDistanceFromRequest($request),
        ];
    }

    /**
     * Check if product is marked as favorite by the user.
     */
    protected function checkIsFavorite(?int $userId): bool
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
    protected function getFirstImageUrl(): ?string
    {
        if ($this->images?->isNotEmpty()) {
            return asset('storage/' . $this->images->first()->image_url);
        }

        return null;
    }

    /**
     * Calculate how far the product is from the user.
     */
    protected function getDistanceFromRequest(Request $request): ?string
    {
        $userLat = $request->query('latitude', 34.5034699);
        $userLng = $request->query('longitude', 69.1350106);

        $location = json_decode(optional($this->user)->location, true);

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
