<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'type', 'options','category_id'];
    protected $casts = ['options' => 'array',];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    // public function categories()
    // {
    //     return $this->belongsToMany(Category::class, 'attribute_category', 'attribute_id', 'category_id');
    // }
}
