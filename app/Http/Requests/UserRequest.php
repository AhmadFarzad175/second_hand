<?php

namespace App\Http\Requests;

use App\Traits\UpdateRequestRules;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    use UpdateRequestRules;

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        $rules = [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'description' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'role' => 'required|in:admin,user,manager',
            'is_active' => 'required|boolean',
        ];

        $this->isMethod('put') ? $this->applyUpdateRules($rules) : null;

        return $rules;
    }


}


