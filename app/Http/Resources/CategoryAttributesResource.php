<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryAttributesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 'id' => $this->id,
            // 'name' => $this->name,
            // 'type' => $this->type,  // Adjust according to your attributes' structure
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'values' => $this->values
        ];
    }
}
