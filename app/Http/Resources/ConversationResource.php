<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
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
            'user_one' => $this->userOne,
            'user_two' => $this->userTwo,
            'product' => new ProductResource($this->product),
            'last_message' => new MessageResource($this->messages->first()),

            'last_updated' => $this->updated_at,
        ];
    }
}
