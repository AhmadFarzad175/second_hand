<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;

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

    protected function price(Builder $query, $range)
    {
        if (is_array($range)) {
            $min = $range['min'] ?? null;
            $max = $range['max'] ?? null;

            if ($min !== null && $max !== null) {
                $query->whereBetween('net_price', [(float)$min, (float)$max]);
            } elseif ($min !== null) {
                $query->where('net_price', '>=', (float)$min);
            } elseif ($max !== null) {
                $query->where('net_price', '<=', (float)$max);
            }
        } elseif (is_string($range) && strpos($range, ',') !== false) {
            list($min, $max) = explode(',', $range);
            $query->whereBetween('net_price', [(float)$min, (float)$max]);
        } elseif (is_numeric($range)) {
            $query->where('net_price', '=', (float)$range);
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
        $query->where('condition', $condition);
    }
//     protected function currency(Builder $query, $currencyId)
// {
//     if (is_numeric($currencyId)) {
//         $query->where('currency_id', $currencyId);
//     }
// }



    protected function date(Builder $query, $date)
    {
        $query->whereDate('created_at', $date);
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

    // 🔥 Dynamic JSON attribute filters: size, brand, color, status
    protected function attributes(Builder $query, array $attributes)
    {
        foreach ($attributes as $key => $value) {
            if (is_array($value)) {
                // Multi-select (e.g., sizes = [S, M, L])
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
}
