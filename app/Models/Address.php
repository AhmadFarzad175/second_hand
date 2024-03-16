<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'street_address',
        'city',
        'state',
        'country',
    ];
    public function address()
    {
        return $this->belongsTo(Product::class); // Define a hasMany relationship
    }
}
