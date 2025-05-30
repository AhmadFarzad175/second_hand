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
            'image' => 'required',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'location' => 'required',
            'phone' => 'required|string|max:20',
            'description' => 'nullable|string',
            'role' => 'nullable|in:admin,user',
            'google_id'  => 'nullable|string|unique:users,google_id',
        ];

        if ($this->routeIs('users.update')) {
            // Creating a user
            $rules['password'] = ['nullable', 'string', 'min:6'];
        } else {
            // Updating a user
            $rules['password'] = ['required', 'string', 'min:6'];
        }
        return $rules;
    }


}


