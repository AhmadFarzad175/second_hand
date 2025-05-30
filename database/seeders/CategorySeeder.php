<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Phones',         'image' => 'image1.jpg'],
            ['name' => 'Computers',  'image' => 'image2.jpg'],
            ['name' => 'TVs',        'image' => 'image3.jpg'],
            ['name' => 'Furniture',                'image' => 'image4.jpg'],
            ['name' => 'Home ',          'image' => 'image5.jpg'],
            ['name' => 'Clothing',       'image' => 'image6.jpg'],
            ['name' => 'Shoes',                    'image' => 'shoes.jpg'],
            ['name' => 'Jewelry',        'image' => 'image8.jpg'],
            ['name' => 'Books',        'image' => 'image9.jpg'],
            ['name' => 'Sports',        'image' => 'image10.jpg'],
            ['name' => 'Motorcycles',              'image' => 'image11.jpg'],
            ['name' => 'Cars',                     'image' => 'image12.jpg'],
            ['name' => ' Games',             'image' => 'image13.jpg'],
            ['name' => 'Kitchenware',              'image' => 'image14.jpg'],
            ['name' => 'Tools',         'image' => 'image1.jpg'],
            ['name' => 'Musical',      'image' => 'image4.jpg'],
            ['name' => 'Health',          'image' => 'image8.jpg'],
            ['name' => 'Handbags',   'image' => 'image11.jpg'],
            ['name' => 'Kids Items',        'image' => 'image2.jpg'],
            ['name' => 'Cameras ',    'image' => 'image5.jpg'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'image' => 'storage/categories/' . $category['image'],
            ]);
        }
    }
}
