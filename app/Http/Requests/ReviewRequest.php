<?php

namespace App\Http\Requests;

use App\Traits\UpdateRequestRules;
use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'product_id' => ['required', 'exists:products,id'],
            'rating' => ['required', 'string', 'max:255'],
            'comment' => ['required', 'string','max:255'],
            'date'=> ['nullable', 'string','max:255'],

        ];
        $this->isMethod('PUT') && $this->validate($rules);
        return $rules;
    }

    /**
     * Customize the error messages for the validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.required' => 'User ID is required.',
            'user_id.exists' => 'User with the specified ID does not exist.',
            'product_id.required' => 'Product ID is required.',
            'product_id.exists' => 'Product with the specified ID does not exist.',
            'rating.required' => 'Rating is required.',
            'rating.numeric' => 'Rating must be a number.',
            'rating.min' => 'Rating must be at least 1.',
            'rating.max' => 'Rating must not exceed 5.',
            'comment.required' => 'Comment is required.',
            'comment.string' => 'Comment must be a string.',
            'comment.max' => 'Comment may not be greater than 255 characters.',
        ];
    }
}
