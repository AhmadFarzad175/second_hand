<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Electronics',
            'Furniture',
            'Home Appliances',
            'Mobile Phones',
            'Laptops & Computers',
            'Clothing & Accessories',
            'Books & Stationery',
            'Vehicles',
            'Bicycles',
            'Toys & Games',
            'Sports Equipment',
            'Musical Instruments',
            'Kitchen Items',
            'Gardening Tools',
            'Baby Products',
            'Building Materials',
            'Pet Supplies',
            'Health & Beauty',
            'TVs & Entertainment',
            'Handbags & Luggage',
        ];

        foreach ($categories as $index => $name) {
            Category::create([
                'name' => $name,
                'image' => 'images/image-' . ($index + 1) . '.jpg',
            ]);
        }
    }
}
