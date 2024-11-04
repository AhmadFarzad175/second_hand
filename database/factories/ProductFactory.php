<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => rand(1,10),//it should delete the user from this factory
            'category_id' => rand(1,10),
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 0, 1000),
            'location' => $this->faker->address,
            // 'latitude' => $this->faker->latitude,
            // 'longitude' => $this->faker->longitude,
            'previous_price' => $this->faker->optional()->randomFloat(2, 10, 100),
            'condition' => $this->faker->boolean,
            'date' => now(),
        ];
    }
}
