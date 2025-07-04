<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    public function toArray($request)
    {
        // Get the last message if the relationship is loaded
        $lastMessage = $this->messages && $this->messages->isNotEmpty() 
            ? $this->messages->last()
            : null;

        return [
            'id' => $this->id,
            'user_one' => [
                'id' => $this->userOne->id,
                'name' => $this->userOne->name,
                'image' => asset('storage/'.$this->userOne->image) ?? null,
            ],
            'user_two' => [
                'id' => $this->userTwo->id,
                'name' => $this->userTwo->name,
                'image' => asset('storage/'.$this->userTwo->image) ?? null,
            ],
            'last_message' => $lastMessage ? [
                'id' => $lastMessage->id,
                'content' => $lastMessage->message,
                'time' => $lastMessage->created_at->diffForHumans(),
                'raw_time' => $lastMessage->created_at->toIso8601String(),
                'sender_id' => $lastMessage->sender_id,
            ] : null,
            'unread_count' => $this->unread_count ?? 0,

            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
