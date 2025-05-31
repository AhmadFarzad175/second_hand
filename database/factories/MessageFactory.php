<?php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'conversation_id' => Conversation::factory(),
            'sender_id' => User::inRandomOrder()->first()->id,
            'message' => $this->faker->sentence,
            'is_read' => $this->faker->boolean(30), // 30% chance read
        ];
    }
}

