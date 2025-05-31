<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    // protected $fillable = [
    //     'sender_id',
    //     'receiver_id',
    //     'product_id',
    //     'reason',
    //     'date'
    // ];
    // protected $fillable = [
    //     'sender_id',
    //     'receiver_id',
    //     'product_id',
    //     'message',
    //     'is_read',
    //     'date',
    // ];

    // public function sender()
    // {
    //     return $this->belongsTo(User::class, 'sender_id');
    // }

    // public function receiver()
    // {
    //     return $this->belongsTo(User::class, 'receiver_id');
    // }

    // public function product()
    // {
    //     return $this->belongsTo(Product::class);
    // }
protected $fillable = [
        'conversation_id',
        'sender_id',
        'message',
        'is_read'
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

}
