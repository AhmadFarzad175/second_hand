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
            'user_id' => 'required|exists:users,id',//////////////////////the user is must delete in this request
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'previous_price' => 'nullable|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'location' => 'required|',
            'condition' => 'nullable|boolean|max:255',
            'date' => 'nullable|string|max:255',
        ];

        $this->isMethod('PUT') && $this->validate($rules);
        return $rules;
    }
}
