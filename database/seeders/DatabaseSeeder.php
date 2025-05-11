<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\Message;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\Report;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $users = User::factory(20)->create();
        $category = Category::factory(20)->create();
        $products = Product::factory(20)->create();

        // Create favorites by randomly associating users with products
        foreach ($users as $user) {
            foreach ($products as $product) {
                Favorite::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                ]);
            }
        }

        // Create other entities as needed
        ProductAttributeValue::factory(5)->create();
        ProductAttribute::factory(5)->create();
        Message::factory(5)->create();
        Review::factory(5)->create();
        Report::factory(5)->create();






        // Call other factories as needed
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
