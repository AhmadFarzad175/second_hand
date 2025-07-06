<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'category_id',
        'user_id',
        'price',
        'discount',
        'discount_type',
        'quantity',
        'condition',
        'attributes',
        'stock',
        'description',
        'state',
        'currency'
    ];



    public function user()
    {
        return $this->belongsTo(User::class); // Define a belongsTo relationship
    }
    public function category()
    {
        return $this->belongsTo(Category::class); // Define a belongsTo relationship
    }
    public function reviews()
    {
        return $this->hasMany(Review::class); // Define a hasMany relationship
    }

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites')
            ->withTimestamps();
    }


    public function images()
    {
        return $this->hasMany(Image::class); // Define a hasMany relationship
    }
    public function attributeValues()
    {
        return $this->hasMany(ProductAttributeValue::class);
    }


    public function attribute()
    {
        return $this->belongsToMany(ProductAttribute::class, 'product_attribute_values', 'product_id', 'attribute_id'); // Define a belongsTo relationship
    }
    public function reports()
    {
        return $this->hasMany(Report::class); // Define a hasMany relationship
    }

    public function favoriteByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }

    public function transactions()
    {
        return $this->hasMany(ProductTransaction::class);
    }

    public function pendingTransactions()
    {
        return $this->transactions()->pending();
    }

    public function scopeSearch($query, $search)
    {
        if (!$search) {
            return $query;
        }
        return $query->where('products.name', 'LIKE', '%' . $search . '%');
    }

    public function scopeNearby($query, $userLatitude, $userLongitude, $distance = 10)
    {
        return $query->selectRaw("
                *, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance
            ", [$userLatitude, $userLongitude, $userLatitude])
            ->havingRaw("distance < ?", [$distance])
            ->orderBy('distance', 'asc');
    }

    protected $casts = [
        'attributes' => 'array', // Ensures JSON data is treated as an array
    ];
    protected static function booted()
    {
        static::deleting(function ($product) {
            foreach ($product->images as $image) {
                if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
                    Storage::disk('public')->delete($image->image_path);
                }
            }

            $product->images()->delete();
        });
    }




    public function getFinalPriceAttribute()
    {
        if ($this->discount === 0) {
            return $this->price;
        } elseif ($this->discount_type === 'fixed') {
            return max(0, $this->price - $this->discount);
        } elseif ($this->discount_type === '%') {
            return number_format(max(0, $this->price - ($this->price * ($this->discount / 100))), 2);
        }
        return $this->price;
    }



    // public function getCurrencyAttribute()
    // {
    //     return $this->attributes['currency'] === "AFN" ? "؋" : "$";
    // }


    public function getStateAttribute()
    {
        return $this->attributes['state'] ? 'available' : 'sold';
    }
}
