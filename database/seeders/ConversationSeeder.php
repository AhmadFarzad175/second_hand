<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Database\Seeder;

class ConversationSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 conversations and seed each with 3–8 messages
        Conversation::factory(10)->create()->each(function ($conversation) {
            Message::factory(rand(3, 8))->create([
                'conversation_id' => $conversation->id,
                'sender_id' => fake()->randomElement([
                    $conversation->user_one_id,
                    $conversation->user_two_id,
                ]),
            ]);
        });
    }
}
