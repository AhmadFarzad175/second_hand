<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Nette\Utils\Random;

class CategoryResource extends JsonResource
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
            'name' => $this->name,
            'image' => $this->image ? asset($this->image) : null,

            // 'image' => $this->image ? url('storage/' . $this->image) : null,
            // 'image' => $this->image ? asset('storage/images/categories/cat' . rand(1, 4) . '.jpg')  : null,
            'total_productss' => $this->products_count ?? $this->products()->count(), // Number of products
        ];
    }
}
