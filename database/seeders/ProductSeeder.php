<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Faker\Factory as Faker;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run()
    {
        $faker = Faker::create();

        // Create 20 products
        for ($i = 0; $i < 20; $i++) {
            // Create a product with fake data
            $product = Product::create([
                'name' => $faker->word,
                'category_id' => Category::inRandomOrder()->first()->id, // Assign random category
                'user_id' => User::inRandomOrder()->first()->id, // Assign random user
                'net_price' => $faker->randomFloat(2, 10, 1000),
                'discount' => $faker->randomFloat(2, 0, 100),
                'quantity' => $faker->randomDigitNotNull,
                'condition' => $faker->boolean,
                'description' => $faker->paragraph,
                'state' => $faker->randomElement(['available', 'sold']),
            ]);

            // Add an image to the product
            $imagePath = 'images/products/product' . $i . '.jpg'; // Generate the image path
            $image = public_path('storage/' . $imagePath);

            // Store a fake image file in the public folder (for example purposes)
            if (!Storage::disk('public')->exists('images/products')) {
                Storage::disk('public')->makeDirectory('images/products');
            }

            // Using a dummy image file to save (in real case, you may use real images)
            file_put_contents($image, file_get_contents('https://via.placeholder.com/150'));

            // Associate image with the product
            $product->images()->create(['image_url' => $imagePath]);
        }

        // Output a success message
        $this->command->info('20 products with images have been added to the database.');
    }
}
