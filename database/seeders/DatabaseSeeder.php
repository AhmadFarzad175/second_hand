<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Message;
use App\Models\Review;
use App\Models\Favorite;
use App\Models\Report;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users and categories
        // User::create([
        //     'image' => 'default.png',
        //     'name' => 'farzad',
        //     'email' => 'farzad@gmail.com',
        //     'password' => Hash::make('123456'),
        //     'location' => json_encode(['city' => 'Kabul', 'country' => 'Afghanistan']),
        //     'phone' => '0700123456',
        //     'description' => 'Test user for seeding.',
        //     'rating' => '4.5',
        //     'email_verified_at' => now(),
        //     'role' => 'user',
        //     'is_active' => true,
        // ]);

        // User::factory(10)->create();

        $this->call([
            CategorySeeder::class,
            ProductAttributesSeeder::class,
            ProductSeeder::class,
        ]);

        // Seed other related models
        Message::factory(5)->create();
        Review::factory(5)->create();
        // Favorite::factory(10)->create();
        // Report::factory(15)->create(); // Uncomment when needed
    }
}
