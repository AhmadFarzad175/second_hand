<?php

namespace App\Http\Requests;

use App\Traits\UpdateRequestRules;
use Illuminate\Support\Facades\Auth;
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
        return  [
            'name' => 'required|string|max:255',
            'images' => 'sometimes',
            'category_id' => 'required',
            'price' => 'required|numeric|gte:0',
            'discount' => 'nullable|numeric|gte:0',
            'quantity' => 'required|integer|min:1',
            'condition' => 'nullable|boolean',
            'attributes' => 'nullable|json',
            'description' => 'required|string|min:10',
            'currency' => 'required|string|in:AFN,USD,EUR',
            'discount_type' => 'required|string|in:fixed,%'
        ];
    }
}
