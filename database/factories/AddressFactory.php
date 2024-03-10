<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
     /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition(): array
    {
        return [
            'user_id' => rand(1,10),
            'Street_address' => $this->faker->streetAddress,
            'City' => $this->faker->city,
            'State' => $this->faker->state,
            'Country' => $this->faker->country,
        ];
    }
}


