<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Image;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            $categoryId = rand(1, 10); // assumes at least 10 categories
            $product = Product::create([
                'name' => "Dummy Product $i",
                'category_id' => $categoryId,
                'user_id' => rand(1, 5),
                'currency' => 'AFN', // Use valid codes: AFN, USD, EUR
                'net_price' => rand(100, 1000),
                'discount' => rand(0, 100),
                'quantity' => rand(1, 20),
                'condition' => (bool)rand(0, 1),
                'state' => 'available',
                'description' => "Description for Dummy Product $i",
                'attributes' => json_encode([
                    'Color' => ['Red', 'Blue', 'Green'][array_rand(['Red', 'Blue', 'Green'])],
                    'Size' => ['S', 'M', 'L', 'XL'][array_rand(['S', 'M', 'L', 'XL'])],
                    'Material' => ['Cotton', 'Plastic', 'Leather'][array_rand(['Cotton', 'Plastic', 'Leather'])]
                ]),
            ]);

            for ($j = 1; $j <= 2; $j++) {
                Image::create([
                    'product_id' => $product->id,
                    'image_url' => "images/products/image{$i}_{$j}.jpg",
                ]);
            }
        }
    }
}
