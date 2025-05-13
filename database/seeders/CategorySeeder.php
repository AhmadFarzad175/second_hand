<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Phones & Tablets',         'image' => 'phones.jpg'],
            ['name' => 'Computers & Accessories',  'image' => 'computers.jpg'],
            ['name' => 'TVs & Electronics',        'image' => 'tvs.jpg'],
            ['name' => 'Furniture',                'image' => 'furniture.jpg'],
            ['name' => 'Home Appliances',          'image' => 'appliances.jpg'],
            ['name' => 'Clothing & Fashion',       'image' => 'clothing.jpg'],
            ['name' => 'Shoes',                    'image' => 'shoes.jpg'],
            ['name' => 'Watches & Jewelry',        'image' => 'watches.jpg'],
            ['name' => 'Books & Education',        'image' => 'books.jpg'],
            ['name' => 'Sports & Outdoors',        'image' => 'sports.jpg'],
            ['name' => 'Motorcycles',              'image' => 'motorcycles.jpg'],
            ['name' => 'Cars',                     'image' => 'cars.jpg'],
            ['name' => 'Toys & Games',             'image' => 'toys.jpg'],
            ['name' => 'Kitchenware',              'image' => 'kitchenware.jpg'],
            ['name' => 'Tools & Hardware',         'image' => 'tools.jpg'],
            ['name' => 'Musical Instruments',      'image' => 'music.jpg'],
            ['name' => 'Beauty & Health',          'image' => 'beauty.jpg'],
            ['name' => 'Handbags & Accessories',   'image' => 'handbags.jpg'],
            ['name' => 'Baby & Kids Items',        'image' => 'baby.jpg'],
            ['name' => 'Cameras & Photography',    'image' => 'cameras.jpg'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'image' => 'storage/categories/' . $category['image'],
            ]);
        }
    }
}
