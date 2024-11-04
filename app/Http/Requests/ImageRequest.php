<?php

// namespace App\Http\Requests;

// use App\Traits\UpdateRequestRules;
// use Illuminate\Foundation\Http\FormRequest;

// class ImageRequest extends FormRequest
// {
//     use UpdateRequestRules;
//     public function authorize(): bool
//     {
//         return true;
//     }

//     public function rules(): array
//     {
//         $rules = [
//             'product_id' => 'required|exists:products,id',
//             // 'image_url' => 'required',
//             'image_url' => 'required|image|mimes:jpg,jpeg,png|', // Add validation for file type and size

//             'is_primary' => 'boolean',
//         ];
//         $this->isMethod('put') && $this->validate($rules);
//         return $rules;
//     }
// }


namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'product_id' => 'required|exists:products,id',
            'image_url' => 'required|image|mimes:jpg,jpeg,png|max:2048', // Updated for file validation and max size
            'is_primary' => 'boolean',
        ];

        // If updating (PUT method), allow optional `image_url` so that you can update other fields without changing the image
        if ($this->isMethod('put')) {
            $rules['image_url'] = 'sometimes|image|mimes:jpg,jpeg,png|';
        }

        return $rules;
    }
}
