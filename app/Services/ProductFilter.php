<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;

class ProductFilter
{
    /**
     * Applies filters to the Product query.
     *
     * @param  Builder  $query
     * @param  array  $filters
     * @return Builder
     */
    public static function apply(Builder $query, array $filters)
    {
        return (new static)->applyFiltersToQuery($query, $filters);
    }

    /**
     * Iterates over each filter and applies it to the query.
     *
     * @param  Builder  $query
     * @param  array  $filters
     * @return Builder
     */
    private function applyFiltersToQuery(Builder $query, array $filters)
    {
        foreach ($filters as $filter => $value) {
            // Check if the filter method exists and apply it if the value is not null
            if (method_exists($this, $filter) && !is_null($value)) {
                $this->$filter($query, $value);
            }
        }
        return $query;
    }

    /**
     * Filter by category ID.
     *
     * @param  Builder  $query
     * @param  int  $categoryId
     */
    protected function category(Builder $query, $categoryId)
    {
        $query->where('category_id', $categoryId);
    }

    /**
     * Filter by price range or single price.
     *
     * @param  Builder  $query
     * @param  string|array  $range
     */
    protected function price(Builder $query, $range)
    {
        // Check if the range is in array format
        if (is_array($range)) {
            $min = $range['min'] ?? null;
            $max = $range['max'] ?? null;

            if ($min !== null && $max !== null) {
                // Filter between the min and max
                $query->whereBetween('price', [(float)$min, (float)$max]);
            } elseif ($min !== null) {
                // Filter greater than or equal to min
                $query->where('price', '>=', (float)$min);
            } elseif ($max !== null) {
                // Filter less than or equal to max
                $query->where('price', '<=', (float)$max);
            }
        } elseif (is_string($range) && strpos($range, ',') !== false) {
            // Handle string input as comma-separated values
            list($min, $max) = explode(',', $range);
            $query->whereBetween('price', [(float) $min, (float) $max]);
        } elseif (is_numeric($range)) {
            // Handle a single price value
            $query->where('price', '=', (float)$range);
        }
    }

    /**
     * Filter by location.
     *
     * @param  Builder  $query
     * @param  string  $location
     */
    protected function location(Builder $query, $location)
    {
        $query->where('location', 'LIKE', '%' . $location . '%');
    }

    /**
     * Filter by product condition.
     *
     * @param  Builder  $query
     * @param  bool  $condition
     */
    protected function condition(Builder $query, $condition)
    {
        $query->where('condition', $condition);
    }

    /**
     * Filter by date.
     *
     * @param  Builder  $query
     * @param  string  $date
     */
    protected function date(Builder $query, $date)
    {
        $query->whereDate('created_at', '=', $date); // Ensure you're filtering by the correct date field
    }
}
