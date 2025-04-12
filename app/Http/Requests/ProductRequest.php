<?php

namespace App\Http\Requests;

use App\Traits\UpdateRequestRules;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    use UpdateRequestRules;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'net_price' => 'required|numeric|gte:0',
            'discount' => 'nullable|numeric|gte:0',
            'color' => 'nullable|string|max:255',
            'quantity' => 'required|integer|min:1',
            'condition' => 'nullable|boolean',
            'location' => 'required|string|max:255',
            'description' => 'required|string|min:10',
            'date' => 'nullable|date_format:Y-m-d',
            'attributes' => 'nullable|array', // attributes should be an array
            // 'attributes.*.attribute_id' => 'required|exists:product_attributes,id', // attribute ID must exist in the product_attributes table
            // 'attributes.*.value' => 'required|string|max:255', // value must be a string and is required

        ];

        $this->isMethod('PUT') && $this->validate($rules);
        return $rules;
    }
}
