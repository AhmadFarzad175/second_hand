<?php
namespace Database\Seeders;

use App\Models\Conversation;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Message;
use App\Models\Review;
use App\Models\Favorite;
use App\Models\Product;
use App\Models\Report;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
           // Step 1: Seed users and products first
        User::factory(10)->create();
        Product::factory(10)->create();

        // Users and categories
        // User::create([
        //     'image' => 'default.png',
        //     'name' => 'Farzad',
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

        // Step 3: Now seed messages and reviews safely
        Message::factory(10)->create();
        Review::factory(5)->create();

        // Optional additional seeders
        $this->call([
            CategorySeeder::class,
            ProductAttributesSeeder::class,
            // ProductSeeder::class,
            RolesAndPermissionsSeeder::class,
            // UserSeeder::class,
            // ConversationSeeder::class,
        ]);

        // Seed other related models
        // Message::factory(5)->create();
        // Review::factory(5)->create();
        // Favorite::factory(10)->create();
        // Report::factory(15)->create(); // Uncomment when needed
    }
}
