<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image', 'parent_id'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // public function attributes()
    // {
    //     return $this->belongsToMany(ProductAttribute::class, 'attribute_category', 'category_id', 'attribute_id');
    // }
    public function attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }


    public function scopeSearch($query, $search)
    {
        if (!$search) {
            return $query;
        }
        return $query->where('name', 'LIKE', '%' . $search . '%');
    }
}
