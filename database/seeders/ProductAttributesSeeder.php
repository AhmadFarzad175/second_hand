<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\ProductAttribute;
use Illuminate\Database\Seeder;

class ProductAttributesSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::all();

        $commonAttributes = [
            [
                'name' => 'Color',
                'type' => 'select',
                'options' => ['Red', 'Blue', 'Green', 'Black', 'White']
            ],
            [
                'name' => 'Size',
                'type' => 'select',
                'options' => ['S', 'M', 'L', 'XL']
            ],
            [
                'name' => 'Material',
                'type' => 'text'
            ]
        ];

        foreach ($categories as $category) {
            foreach ($commonAttributes as $attribute) {
                ProductAttribute::create([
                    'name' => $attribute['name'],
                    'category_id' => $category->id,
                    'type' => $attribute['type'],
                    'options' => $attribute['options'] ?? null
                ]);
            }

            // Category-specific attributes
            switch ($category->name) {
                case 'Electronics':
                    ProductAttribute::create([
                        'name' => 'Warranty',
                        'category_id' => $category->id,
                        'type' => 'select',
                        'options' => ['1 Year', '2 Years', 'Lifetime']
                    ]);
                    break;

                case 'Clothing':
                    ProductAttribute::create([
                        'name' => 'Fabric',
                        'category_id' => $category->id,
                        'type' => 'text'
                    ]);
                    break;
            }
        }
    }
}
