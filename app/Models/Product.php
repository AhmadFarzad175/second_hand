<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'title',
        'description',
        'price',
        'condation',
        'date',
    ];
    public function user()
    {

        return $this->belongsTo(User::class); // Define a belongsTo relationship
    }
    public function category()
    {
        return $this->belongsTo(Category::class); // Define a belongsTo relationship
    }
    public function products()
    {
        return $this->belongsTo(Address::class); // Define a belongsTo relationship
    }
    public function product()
{
    return $this->hasMany(Image::class);
}

}
