<?php

namespace Database\Factories;

use App\Models\Category;
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
            'name' => $this->faker->word(),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            'net_price' => $this->faker->randomFloat(2, 10, 500), // Generates price between 10-500
            'discount' => $this->faker->randomFloat(2, 0, 50), // Discount up to 50
            'color' => $this->faker->safeColorName(), // Random color
            'quantity' => $this->faker->numberBetween(1, 100), // Quantity between 1-100
            'condition' => $this->faker->boolean(),
            'location' => $this->faker->city(),
            'description' => $this->faker->paragraph(),
            'date' => now(),
        ];
    }
}
