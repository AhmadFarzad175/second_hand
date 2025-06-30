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

        // Step 2: Seed conversations that may depend on users
        // Conversation::factory(5)->create();

        // Step 3: Now seed messages and reviews safely
        Message::factory(10)->create();
        Review::factory(5)->create();

        // Optional additional seeders
        $this->call([
            CategorySeeder::class,
            ProductAttributesSeeder::class,
            ProductSeeder::class,
            UserSeeder::class,
            ConversationSeeder::class,
        ]);

        // // Message::factory(10)->create();
        // Review::factory(5)->create();

        // $this->call([
        //     CategorySeeder::class,
        //     ProductAttributesSeeder::class,
        //     ProductSeeder::class,
        //     UserSeeder::class,
        //     ConversationSeeder::class,
        // ]);

        // // Seed other related models
        // // Favorite::factory(10)->create();
        // // Report::factory(15)->create(); // Uncomment when needed
    }
}
