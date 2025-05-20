<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Currency;
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
        $users = User::factory(10)->create();
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);

        // ProductAttributeValue::factory(5)->create();
        ProductAttribute::factory(5)->create();
        Message::factory(5)->create();
        Review::factory(5)->create();
        // Favorite::factory(10)->create();

        // Report::factory(15)->create();

    }
}
