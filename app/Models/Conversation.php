<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable = ['user_one_id', 'user_two_id','product_id'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }
    public function product()
{
    return $this->belongsTo(Product::class);
}

    public function scopeBetweenUsers($query, $userA, $userB)
    {
        return $query->where(function ($q) use ($userA, $userB) {
            $q->where('user_one_id', $userA)->where('user_two_id', $userB);
        })->orWhere(function ($q) use ($userA, $userB) {
            $q->where('user_one_id', $userB)->where('user_two_id', $userA);
        });
    }
}
