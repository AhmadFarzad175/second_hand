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
            'name' => $this->faker->word,
            'category_id' => Category::factory(), // Assuming a Category factory exists
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'discount' => $this->faker->randomFloat(2, 0, 100),
            'quantity' => $this->faker->numberBetween(1, 100),
            'user_id' => rand(1, 10),
            'condition' => $this->faker->boolean,
            'description' => $this->faker->sentence,
            // 'latitude' => $this->faker->latitude(34.0, 35.0), // Example latitude range for Kabul, Afghanistan
            // 'longitude' => $this->faker->longitude(69.0, 70.0), // Example longitude range for Kabul
            'attributes' => json_encode([
                'size' => $this->faker->word,
                'color' => $this->faker->colorName,
            ]),
            // 'date' => $this->faker->date,
            "currency" => 1,
            "state" => 0, // 0 == available, 1 == sold
        ];
    }
}
