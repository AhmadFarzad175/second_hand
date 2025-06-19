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
            'last_message' => $this->whenLoaded('messages', function() {
                return $this->messages->first() ? [
                    'message' => $this->messages->first()->message,
                    'created_at' => $this->messages->first()->created_at,
                    'is_read' => $this->messages->first()->is_read,
                ] : null;
            }),
            'unread_count' => $this->whenCounted('messages', function() {
                return $this->messages_count;
            }),
            'updated_at' => $this->updated_at,
        ];
    }
}
