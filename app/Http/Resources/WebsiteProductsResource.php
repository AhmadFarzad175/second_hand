<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
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
        $user = Auth::user() || 1;
        $user = User::find(1);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'net_price' => $this->net_price,
            'discount' => $this->discount,
            'posted' => Carbon::parse($this->created_at)->diffForHumans(),
            'isFavorite' => $user
                ? $user->favorites()->where('product_id', $this->id)->exists()
                : false,
            'images' => $this->images->isNotEmpty()
                ? asset('storage/' . $this->images->first()->image_url)
                : null,
            'howFar' => isset($this->distance) ? round($this->distance, 1) . ' km' : null,
        ];
    }

    protected function calculateDistanceFrom(Request $request)
    {
        $userLat = $request->query('latitude') ?? 34.5034699;
        $userLng = $request->query('longitude') ?? 69.1350106;

        $location = json_decode(optional($this->user)->location, true);

        if (
            !$userLat || !$userLng ||
            !$location ||
            !isset($location['latitude']) ||
            !isset($location['longitude'])
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
