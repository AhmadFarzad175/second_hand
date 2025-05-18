<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Phones & Tablets',         'image' => 'image1.jpg'],
            ['name' => 'Computers & Accessories',  'image' => 'image2.jpg'],
            ['name' => 'TVs & Electronics',        'image' => 'image3.jpg'],
            ['name' => 'Furniture',                'image' => 'image4.jpg'],
            ['name' => 'Home Appliances',          'image' => 'image5.jpg'],
            ['name' => 'Clothing & Fashion',       'image' => 'image6.jpg'],
            ['name' => 'Shoes',                    'image' => 'image7.jpg'],
            ['name' => 'Watches & Jewelry',        'image' => 'image8.jpg'],
            ['name' => 'Books & Education',        'image' => 'image9.jpg'],
            ['name' => 'Sports & Outdoors',        'image' => 'image10.jpg'],
            ['name' => 'Motorcycles',              'image' => 'image11.jpg'],
            ['name' => 'Cars',                     'image' => 'image12.jpg'],
            ['name' => 'Toys & Games',             'image' => 'image13.jpg'],
            ['name' => 'Kitchenware',              'image' => 'image14.jpg'],
            ['name' => 'Tools & Hardware',         'image' => 'image1.jpg'],
            ['name' => 'Musical Instruments',      'image' => 'image4.jpg'],
            ['name' => 'Beauty & Health',          'image' => 'image8.jpg'],
            ['name' => 'Handbags & Accessories',   'image' => 'image11.jpg'],
            ['name' => 'Baby & Kids Items',        'image' => 'image2.jpg'],
            ['name' => 'Cameras & Photography',    'image' => 'image5.jpg'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'image' => 'storage/categories/' . $category['image'],
            ]);
        }
    }
}
