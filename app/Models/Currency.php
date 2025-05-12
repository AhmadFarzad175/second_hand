<?php

namespace App\Models;

use App\Models\Account;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Currency extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'symbol', 'rate'
    ];

     public function products()
    {
        return $this->hasMany(Product::class);
    }




    public function scopeSearch($query, $search){
        if(!$search){
            return $query;
        }
        $query->where('name', 'like', '%' . $search . '%');
    }
}
