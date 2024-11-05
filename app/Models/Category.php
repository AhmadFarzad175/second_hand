<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
    ];
    public function products()
{
    return $this->hasMany(Product::class);
    // Define a hasMany relationship
}

// public function attributes()
// {
//     return $this->hasMany(Attribute::class);
// }
public function attributes()
{
    return $this->belongsToMany(ProductAttribute::class, 'attribute_category');
}

}
