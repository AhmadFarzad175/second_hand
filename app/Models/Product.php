<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //the user_id should delete in this model////////////////////////////////////////////////////////
    use HasFactory;
    protected $fillable = [
        'name', 'location', 'description', 'previous_price','price', 'last_price','user_id',
        'condition', 'date', 'category_id'
    ];

    public function getWhatsappLinkAttribute()
{
    // Ensure user relationship is loaded and phone is not null
    if (!$this->user || !$this->user->phone) {
        return null; // Return null if user or phone is missing
    }

    $phone = $this->user->phone; // Access the user's phone
    $message = "Hello, I'm interested in your product '{$this->name}' listed for {$this->price}.";
    return "https://wa.me/{$phone}?text=" . urlencode($message);
}

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
        return $this->hasMany(Favorite::class); // Define a hasMany relationship
    }
    public function images()
    {
        return $this->hasMany(Image::class); // Define a hasMany relationship
    }
    public function attributeValues()
    {
        return $this->hasMany(ProductAttributeValue::class);
    }
    public function reports()
    {
        return $this->hasMany(Report::class); // Define a hasMany relationship
    }
    public function scopeSearch($query, $search)
{
    if (!$search) {
        return $query;
    }
    return $query->where('name', 'LIKE', '%' . $search . '%')
                 ->orWhere('location', 'LIKE', '%' . $search . '%');
}


}
