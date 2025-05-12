<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Currency;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::find(3);
        // Loop to create 20 products
        for ($i = 1; $i <= 20; $i++) {
            Product::firstOrCreate(
                ['name' => 'Product ' . $i], // Unique column to check
                [
                    'category_id' => Category::inRandomOrder()->first()->id, // Random category
                    // 'user_id' => User::inRandomOrder()->first()->id, // Random user
                     'user_id' => $i <= 5 ? $user->id : User::inRandomOrder()->first()->id,
                    'net_price' => rand(100, 500), // Random net price
                    'discount' => rand(0, 50), // Random discount
                    'quantity' => rand(1, 10), // Random quantity
                    'condition' => rand(0, 1), // Random condition (new or used)
                    'currency_id' => Currency::inRandomOrder()->first()->id,

                    'state' => 'available', // Set state as available
                    'description' => 'This is a description for product ' . $i, // Description
                    'attributes' => json_encode(['color' => 'red', 'size' => 'L']), // Example attributes
                ]
            );
        }
    }
}
