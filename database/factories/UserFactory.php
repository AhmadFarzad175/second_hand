<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;


    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'password' => bcrypt('password'),
            'email' => $this->faker->unique()->safeEmail(),
            'remember_token' => Str::random(10),
            'rating' => $this->faker->randomFloat(1, 1, 5),
            'image' =>$this->faker->filePath(),
            // 'location' => $this->faker->city(),
            'location' => json_encode(['city' => $this->faker->city()]),

            'phone' => $this->faker->phoneNumber(),
            'description' => $this->faker->sentence(),
            'role' => $this->faker->randomElement(['admin', 'user', 'manager']),
            'is_active' => $this->faker->randomElement([true, false]),

        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
