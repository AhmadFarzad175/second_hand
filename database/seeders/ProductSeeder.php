<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure there's a user to associate products with (or create a new one)
        $user = User::first() ?? User::factory()->create();

        // Example products (realistic, related to second-hand market)
        $products = [
            ['Samsung Galaxy S10', 1, 250.00, 20.00, 1, true, 'available', 'Used Samsung Galaxy S10, fully functional.', ['color' => 'black']],
            ['iPhone 11 Pro Max', 1, 420.00, 50.00, 1, true, 'available', 'Slightly used iPhone 11 Pro Max.', ['color' => 'space gray']],
            ['Dell Inspiron Laptop', 2, 350.00, 30.00, 1, true, 'available', 'Used Dell laptop, 8GB RAM, 256GB SSD.', ['ram' => '8GB']],
            ['Leather Sofa Set', 4, 500.00, 70.00, 1, true, 'available', '3-piece brown leather sofa set.', ['material' => 'leather']],
            ['LG Washing Machine', 5, 180.00, 20.00, 1, true, 'available', 'Top-load LG washer.', ['capacity' => '7kg']],
            ['Men’s Winter Jacket', 6, 40.00, 5.00, 1, true, 'available', 'Warm jacket, size L.', ['size' => 'L']],
            ['Nike Air Max', 7, 60.00, 10.00, 1, true, 'available', 'Used Nike shoes, size 42.', ['size' => '42']],
            ['Casio Watch', 8, 30.00, 0.00, 1, true, 'available', 'Digital Casio watch.', ['type' => 'digital']],
            ['Harry Potter Book Set', 9, 50.00, 0.00, 1, false, 'available', 'Full Harry Potter book series.', ['genre' => 'fantasy']],
            ['Mountain Bike', 10, 150.00, 15.00, 1, true, 'available', 'All-terrain mountain bike.', ['gears' => '21']],
            ['Honda CG125', 11, 750.00, 100.00, 1, true, 'available', '2018 model, excellent condition.', ['model' => '2018']],
            ['Toyota Corolla 2010', 12, 3500.00, 250.00, 1, true, 'available', 'Clean title, 160,000 km.', ['year' => '2010']],
            ['Lego City Set', 13, 30.00, 5.00, 1, false, 'available', 'Lego set for ages 6+. Box included.', ['pieces' => '500+']],
            ['Cookware Set', 14, 40.00, 5.00, 1, true, 'available', 'Stainless steel cookware, 10 pieces.', ['material' => 'steel']],
            ['Bosch Power Drill', 15, 55.00, 5.00, 1, true, 'available', 'Cordless drill, 18V.', ['battery' => '18V']],
            ['Samsung Smart TV 42"', 3, 200.00, 25.00, 1, true, 'available', 'Full HD LED TV.', ['size' => '42"']],
            ['PS4 Slim Console', 13, 250.00, 25.00, 1, true, 'available', 'Includes 2 controllers.', ['storage' => '500GB']],
            ['Canon DSLR Camera', 20, 320.00, 30.00, 1, true, 'available', 'Canon EOS Rebel, 18MP.', ['lens' => '18-55mm']],
            ['Women’s Handbag', 18, 40.00, 5.00, 1, true, 'available', 'Leather handbag, like new.', ['material' => 'leather']],
            ['Yamaha Acoustic Guitar', 16, 100.00, 10.00, 1, true, 'available', 'F310 model, good sound.', ['type' => 'acoustic']],
        ];

        foreach ($products as $index => $item) {
            // Create product
            $product = Product::create([
                'name' => $item[0],
                'category_id' => $item[1],
                'user_id' => $user->id,
                'net_price' => $item[2],
                'discount' => $item[3],
                'quantity' => $item[4],
                'condition' => $item[5],
                'state' => $item[6],
                'description' => $item[7],
                'attributes' => json_encode($item[8]),
            ]);

            // Attach 2-3 images per product
            $imageCount = rand(2, 3);
            for ($i = 1; $i <= $imageCount; $i++) {
                $product->images()->create([
                    'image_url' => "images/products/product-" . ($index + 1) . "-$i.jpg", // image naming: product-1-1.jpg, product-1-2.jpg etc.
                ]);
            }
        }
    }
}
