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

protected function price(Builder $query, $price)
{
    $price = trim($price);

    if (strpos($price, '-') !== false) {
        [$min, $max] = explode('-', $price);

        $min = trim($min);
        $max = trim($max);

        if (is_numeric($min) && is_numeric($max)) {
            $query->whereBetween('net_price', [(float)$min, (float)$max]);
        } elseif (is_numeric($min)) {
            $query->where('net_price', '>=', (float)$min);
        } elseif (is_numeric($max)) {
            $query->where('net_price', '<=', (float)$max);
        }
    } elseif (is_numeric($price)) {
        $query->where('net_price', '=', (float)$price);
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
    protected function currency(Builder $query, $currencyId)
    {
        if (is_numeric($currencyId)) {
            $query->where('currency_id', $currencyId);
        }
    }



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
