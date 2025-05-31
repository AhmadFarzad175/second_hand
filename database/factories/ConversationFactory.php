<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    public function definition(): array
    {
        $userOne = User::inRandomOrder()->first();
        $userTwo = User::where('id', '!=', $userOne->id)->inRandomOrder()->first();

        return [
            'user_one_id' => $userOne->id,
            'user_two_id' => $userTwo->id,
        ];
    }
}
