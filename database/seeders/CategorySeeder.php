<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Phones',         'image' => 'tablet.webp'],
            ['name' => 'Computers',  'image' => 'computer.webp'],
            ['name' => 'electronics',        'image' => 'electronics.jpg'],
            // ['name' => 'Home ',          'image' => 'image5.jpg'],
            ['name' => 'Clothing',       'image' => 'clothes.jpg'],
            ['name' => 'mouse',                    'image' => 'mouse.webp'],
            ['name' => 'Jewelry',        'image' => 'watch.webp'],
            ['name' => 'Books',        'image' => 'books.jpg'],
            ['name' => 'Sports',        'image' => 'sport.jpg'],
            ['name' => 'Motorcycles',              'image' => 'motorcycle.jpg'],
            ['name' => 'Cars',                     'image' => 'tools.jpg'],
            ['name' => ' Games',             'image' => 'gameStick.webp'],
            ['name' => 'Kitchenware',              'image' => 'kitchen.jpg'],
            ['name' => 'Tools',         'image' => 'tools.jpg'],
            ['name' => 'Musical',      'image' => 'watch2.webp'],
            // ['name' => 'Health',          'image' => 'image8.jpg'],
            ['name' => 'Handbags',   'image' => 'householdThings.jpg'],
            ['name' => 'Kids Items',        'image' => 'childDolls.jpg'],
            ['name' => 'Cameras ',    'image' => 'health&beauty.png'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'image' => 'categories/' . $category['image'],
            ]);
        }
    }
}
