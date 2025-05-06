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
        // dd('es');
        $rules = [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            // 'password' => 'required|min:6',
            'location' => 'required',
            'phone' => 'required|string|max:20',
            'description' => 'nullable|string',
            'role' => 'required|in:admin,user',
        ];

        $this->isMethod('put') ? $this->applyUpdateRules($rules) : null;

        return $rules;
    }


}


