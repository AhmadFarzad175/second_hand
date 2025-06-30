<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use App\Models\User;

class ProductFilter
{
    public static function apply(Builder $query, array $filters)
    {
        return (new static)->applyFiltersToQuery($query, $filters);
    }

    private function applyFiltersToQuery(Builder $query, array $filters)
    {
        foreach ($filters as $filter => $value) {
            if (method_exists($this, $filter) && !is_null($value)) {
                $this->$filter($query, $value);
            }
        }
        return $query;
    }

    protected function category(Builder $query, $categoryId)
    {
        $query->where('category_id', $categoryId);
    }

    protected function price(Builder $query, $price)
    {
        $price = trim($price);

        if (strpos($price, '-') !== false) {
            [$min, $max] = explode('-', $price);
            $min = trim($min);
            $max = trim($max);

            if (is_numeric($min) && is_numeric($max)) {
                $query->whereBetween('price', [(float)$min, (float)$max]);
            } elseif (is_numeric($min)) {
                $query->where('price', '>=', (float)$min);
            } elseif (is_numeric($max)) {
                $query->where('price', '<=', (float)$max);
            }
        } elseif (is_numeric($price)) {
            $query->where('price', '=', (float)$price);
        }
    }

    protected function state(Builder $query, $state)
    {
        if (in_array($state, ['available', 'sold'])) {
            $query->where('state', $state);
        }
    }

    protected function location(Builder $query, $location)
    {
        $query->where('location', 'LIKE', '%' . $location . '%');
    }

    protected function condition(Builder $query, $condition)
    {
        // dd($condition);
        $query->where('condition', $condition);
    }

    protected function date(Builder $query, $date)
    {
        // Ensure the date is in the correct format
        try {
            $startDate = \Carbon\Carbon::parse($date)->startOfDay();
            $endDate = now()->endOfDay(); // Current date and time

            $query->whereBetween('products.created_at', [$startDate, $endDate]);
        } catch (\Exception $e) {
            // Handle invalid date format
            logger()->error("Invalid date format provided: " . $date);
        }
    }

    protected function search(Builder $query, $term)
    {
        if (empty($term)) {
            return;
        }

        $query->where(function ($q) use ($term) {
            $q->where('products.name', 'like', "%{$term}%")
                ->orWhere('products.description', 'like', "%{$term}%");
        });
    }

    protected function attributes(Builder $query, array $attributes)
    {
        foreach ($attributes as $key => $value) {
            if (is_array($value)) {
                $query->where(function ($q) use ($key, $value) {
                    foreach ($value as $v) {
                        $q->orWhereJsonContains("attributes->$key", $v);
                    }
                });
            } else {
                $query->whereJsonContains("attributes->$key", $value);
            }
        }
    }

    // 🔥 Distance filter added here
    protected function distance(Builder $query, $maxDistance)
    {
        $user = auth()->user() ?? User::find(1);
        if (!$user || !$user->location) return;

        $userLat = $user->location["latitude"];
        $userLng = $user->location["longitude"];

        if (!is_numeric($maxDistance) || !is_numeric($userLat) || !is_numeric($userLng)) {
            return;
        }

        $query->join('users', 'products.user_id', '=', 'users.id')
            ->select('products.*') // Ensure we only select product columns
            ->whereRaw("(
            6371 * acos(
                cos(radians(?)) *
                cos(radians(CAST(JSON_UNQUOTE(JSON_EXTRACT(users.location, '$.latitude')) AS DECIMAL(10,7)))) *
                cos(radians(CAST(JSON_UNQUOTE(JSON_EXTRACT(users.location, '$.longitude')) AS DECIMAL(10,7))) - radians(?)) +
                sin(radians(?)) *
                sin(radians(CAST(JSON_UNQUOTE(JSON_EXTRACT(users.location, '$.latitude')) AS DECIMAL(10,7))))
            )
        ) < ?", [$userLat, $userLng, $userLat, $maxDistance]);
    }
}
