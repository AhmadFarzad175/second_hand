<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Image;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 30; $i++) {
            $product = Product::create([
                'name' => "Dummy Product $i",
                'category_id' => rand(1, 10), // assuming you have at least 10 categories
                'user_id' => rand(1,5),               // or random user_id if needed
                'currency' => 'AFG',           // or random currency_id
                'net_price' => rand(100, 1000),
                'discount' => rand(0, 100),
                'quantity' => rand(1, 20),
                'condition' => rand(0, 1),
                'state' => 'available',
                'description' => "Description for Dummy Product $i",
                'attributes' => json_encode([
                    'color' => 'Color ' . $i,
                    'size' => rand(1, 100) . 'cm'
                ]),
            ]);

            // Each product gets 2 images: imageX_1.jpg and imageX_2.jpg
            for ($j = 1; $j <= 2; $j++) {
                Image::create([
                    'product_id' => $product->id,
                    'image_url' => "images/products/image{$i}.jpg",
                ]);
            }
        }
    }
}
