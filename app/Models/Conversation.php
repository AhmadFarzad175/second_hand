<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['user_one_id', 'user_two_id'];

    public function userOne(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    public function userTwo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }


    public function scopeBetweenUsers($query, $userOne, $userTwo)
    {
        return $query->where(function ($q) use ($userOne, $userTwo) {
            $q->where('user_one_id', min($userOne, $userTwo))
              ->where('user_two_id', max($userOne, $userTwo));
        });
    }

    public function otherParticipant(): ?User
    {
        $authId = auth()->id();

        if ($authId === $this->user_one_id) {
            return $this->userTwo;
        } elseif ($authId === $this->user_two_id) {
            return $this->userOne;
        }

        return null;
    }

    public function isParticipant($userId): bool
    {
        return $this->user_one_id === $userId || $this->user_two_id === $userId;
    }
}
