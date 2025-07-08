<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait ProjectFormatTrait
{
    protected function formatPrice($amount)
    {
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

    protected function getUserImage($image)
    {
        if ($image) {
            return asset('storage/' . $image);
        }

        return null;
    }

    protected function getImageUrls()
    {
        return $this->images->map(function ($image) {
            return [
                'id' => $image->id,
                'url' => asset('storage/' . $image->image_url)
            ];
        });
    }
}
