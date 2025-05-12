<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Phones & Tablets',
            'Computers & Accessories',
            'TVs & Electronics',
            'Furniture',
            'Home Appliances',
            'Clothing & Fashion',
            'Shoes',
            'Watches & Jewelry',
            'Books & Education',
            'Sports & Outdoors',
            'Motorcycles',
            'Cars',
            'Toys & Games',
            'Kitchenware',
            'Tools & Hardware',
            'Musical Instruments',
            'Beauty & Health',
            'Handbags & Accessories',
            'Baby & Kids Items',
            'Cameras & Photography',
        ];

        foreach ($categories as $index => $name) {
            Category::create([
                'name' => $name,
                'image' => "image-" . ($index + 1) . ".jpg", // Assuming image-1.jpg to image-20.jpg
            ]);
        }
    }
}
