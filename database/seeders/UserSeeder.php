<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            ['latitude' => 34.5553, 'longitude' => 69.2075 ],
            ['latitude' => 36.7090, 'longitude' => 67.1109],
            ['latitude' => 34.3482, 'longitude' => 62.1997],
            ['latitude' => 33.6857, 'longitude' => 66.9430],
            ['latitude' => 31.6339, 'longitude' => 65.7372],
        ];

        for ($i = 1; $i <= 6; $i++) {
            $user = User::create([
                'name' => "Test User $i",
                'email' => "user$i@example.com",
                'phone' => "07000000$i",
                'password' => Hash::make('password'),
                'image' => "images/user$i.jpg", // 💡 same format as category seeder
                'location' => json_encode($locations[$i - 1]),
                'description' => "This is user $i description.",
                'rating' => rand(3, 5),
                // 'role' => 'user',
                'is_active' => true,
                'google_id' => null,
            ]);
            $user->assignRole('user'); // Assign default role to user
        }
    }
}
