<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'location' => $this->location,
            'role' => $this->getRoleNames()->first(),
            'description' => $this->description,
            // 'image' => $this->image ? url('storage/' . $this->image) : null, // Image URL if available
            'user_image' => $this->image ? url('storage/' . $this->image) : null, // Image URL if available
            'rating' => (float) $this->rating ?? 0, // Default to 0 if no rating
            // 'role' => $this->role,
            'is_active' => $this->is_active,
            'total_products' => $this->products()->count(), // 👈 this line
            'products' => UserProducts::collection($this->products),

        ];
    }
}
