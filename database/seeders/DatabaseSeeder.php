<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Message;
use App\Models\Review;
use App\Models\Favorite;
use App\Models\Report;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users and categories
        User::factory(10)->create();

        $this->call([
            CategorySeeder::class,
            ProductAttributesSeeder::class,
            ProductSeeder::class,
        ]);

        // Seed other related models
        Message::factory(5)->create();
        Review::factory(5)->create();
        Favorite::factory(10)->create();
        // Report::factory(15)->create(); // Uncomment when needed
    }
}
