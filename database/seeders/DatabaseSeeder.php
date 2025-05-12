<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Favorite;
use App\Models\Product;
use App\Models\User;
use App\Models\ProductAttributeValue;
use App\Models\ProductAttribute;
use App\Models\Message;
use App\Models\Review;
use App\Models\Report;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users and categories
        $users = User::factory(20)->create();
        $this->call([CategorySeeder::class, ProductSeeder::class]);
        // Create 20 products ensuring they don't get deleted on fresh migrations
        // for ($i = 1; $i <= 20; $i++) {
        //     Product::firstOrCreate(
        //         ['name' => 'Product ' . $i], // Ensure uniqueness based on 'name'
        //         [
        //             'category_id' => $categories->random()->id, // Random category from the created categories
        //             'user_id' => $users->random()->id, // Random user from the created users
        //             'net_price' => rand(100, 500), // Random net price
        //             'discount' => rand(0, 50), // Random discount
        //             'quantity' => rand(1, 10), // Random quantity
        //             'condition' => rand(0, 1), // Random condition (new or used)
        //             'state' => 'available', // Set state as available
        //             'description' => 'This is a description for product ' . $i, // Example description
        //             'attributes' => json_encode(['color' => 'red', 'size' => 'L']), // Example attributes
        //         ]
        //     );
        // }

        // // Create favorites by randomly associating users with products
        // foreach ($users as $user) {
        //     foreach ($categories as $category) {
        //         // Create a random number of favorites per user
        //         $product = Product::inRandomOrder()->first();
        //         Favorite::firstOrCreate([
        //             'user_id' => $user->id,
        //             'product_id' => $product->id,
        //         ]);
        //     }
        // }

        // Create other entities as needed
        ProductAttributeValue::factory(5)->create();
        ProductAttribute::factory(5)->create();
        Message::factory(5)->create();
        Review::factory(5)->create();
        Report::factory(5)->create();
    }
}
