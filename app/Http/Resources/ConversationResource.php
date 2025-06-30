<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    public function toArray($request)
    {
        //   $authId = auth()->id();
        // $otherUser = $this->user_one_id === $authId ? $this->userTwo : $this->userOne;
        return [
            'id' => $this->id,
            'user_one' => [
                'id' => $this->userOne->id,
                'name' => $this->userOne->name,
                'avatar' => $this->userOne->avatar_url ?? null,
            ],
            'user_two' => [
                'id' => $this->userTwo->id,
                'name' => $this->userTwo->name,
                'avatar' => $this->userTwo->avatar_url ?? null,
            ],

            'unread_count' => $this->whenCounted('messages', function() {
                return $this->messages_count;
            }),
        ];
    }
}
