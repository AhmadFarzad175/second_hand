<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Favorite>
 */
class FavoriteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' =>rand(1,10),
            'product_id'=>rand(1,10),
            //  'user_id' => $this->faker->numberBetween(1, 10),
            // 'product_id' => $this->faker->numberBetween(1, 20),
        ];
    }
}
