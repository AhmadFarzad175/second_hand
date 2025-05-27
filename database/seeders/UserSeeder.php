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
            ['lat' => 34.5553, 'lng' => 69.2075, 'address' => 'Kabul'],
            ['lat' => 36.7090, 'lng' => 67.1109, 'address' => 'Mazar-e-Sharif'],
            ['lat' => 34.3482, 'lng' => 62.1997, 'address' => 'Herat'],
            ['lat' => 33.6857, 'lng' => 66.9430, 'address' => 'Ghazni'],
            ['lat' => 31.6339, 'lng' => 65.7372, 'address' => 'Kandahar'],
        ];

        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'name' => "Test User $i",
                'email' => "user$i@example.com",
                'phone' => "07000000$i",
                'password' => Hash::make('password'),
                'image' => "images/user$i.jpg", // 💡 same format as category seeder
                'location' => json_encode($locations[$i - 1]),
                'description' => "This is user $i description.",
                'rating' => rand(3, 5),
                'role' => 'user',
                'is_active' => true,
                'google_id' => null,
            ]);
        }
    }
}
