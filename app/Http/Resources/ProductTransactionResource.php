<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductTransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "quantity"=> $this->quantity,
            "buyer_image"=> $this->buyer->image,
            "buyer_name"=> $this->buyer->name,
            "product_name"=> $this->product->name,
        ];
    }
}
