<?php

namespace App\Http\Requests;

use App\Traits\UpdateRequestRules;
use Illuminate\Foundation\Http\FormRequest;

class ImageRequest extends FormRequest
{
    use UpdateRequestRules;
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'product_id' => 'required|exists:products,id',
            'image_url' => 'required', // You might want to add additional validation rules for the URL format
            'is_primary' => 'boolean',
        ];
        $this->isMethod('put') && $this->validate($rules);
        return $rules;
    }
}
