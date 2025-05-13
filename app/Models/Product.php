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
        'net_price',
        'discount',
        'quantity',
        'condition',
        'attributes',
        'description',
        'state',
        'currency_id'
    ];


    // public function getWhatsappLinkAttribute()
    // {
    //     // Ensure user relationship is loaded and phone is not null
    //     if (!$this->user || !$this->user->phone) {
    //         return null; // Return null if user or phone is missing
    //     }

    //     $phone = $this->user->phone; // Access the user's phone
    //     $message = "Hello, I'm interested in your product '{$this->name}' listed for {$this->price}.";
    //     return "https://wa.me/{$phone}?text=" . urlencode($message);
    // }

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

    public function currency()
    {
        return $this->belongsTo(Currency::class);
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

    public function scopeSearch($query, $search)
    {
        if (!$search) {
            return $query;
        }
        return $query->where('name', 'LIKE', '%' . $search . '%');
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
}



// it is from product resource
   // 'attribute_values' => $this->attributeValues->map(function ($attributeValue) {
            //     return [
            //         'attribute' => $attributeValue->attribute->name,
            //         'value' => $attributeValue->value,
            //     ];
            // }),
            // 'reviews' => [
            //     'count' => $this->reviews->count(),
            //     'average_rating' => $this->reviews->average('rating'),
            // ],
            // 'favorites_count' => $this->favorites->count(),
            // // 'whatsapp_link' => $this->user->phone
            // //     ? 'https://wa.me/' . $this->user->phone . '?text=Hello%2C%20I%27m%20interested%20in%20your%20product%20%27' . urlencode($this->name) . '%27%20listed%20for%20' . $this->price
            // //     : null,
            // 'whatsapp_link' => $this->user && $this->user->phone
            //     ? 'https://wa.me/' . $this->user->phone . '?text=' . urlencode("Hello, I'm interested in your product '{$this->name}' listed for {$this->price}")
                // : null,
