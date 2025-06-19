<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'conversation_id' => $this->conversation_id,
            'sender_id' => $this->sender_id,
            'message' => $this->message,
            'is_read' => $this->is_read,
            'created_at' => $this->created_at,
            'sender' => [
                'id' => $this->sender->id,
                'name' => $this->sender->name,
            ]
        ];
    //    return [
    //         'id' => $this->id,
    //         'conversation_id' => $this->conversation_id,
    //         'sender' => [
    //             'id' => $this->sender->id,
    //             'name' => $this->sender->name,
    //             'avatar' => $this->sender->avatar_url ?? null,
    //         ],
    //         'message' => $this->message,
    //         'is_read' => $this->is_read,
    //         'created_at' => $this->created_at,
    //         'updated_at' => $this->updated_at,];
    }
}
