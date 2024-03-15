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
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'location' => 'nullable|string',
            'phone' => 'nullable|string',
            'address_id' => 'nullable|exists:addresses,id',
        ];
        // if ($this->isMethod('PUT')) {
        //     foreach ($rules as $key => $rule) {
        //         $rules[$key] = str_replace('required', 'sometimes', $rule);
        //     }
        // }

        // return $rules;


        $this->isMethod('put') ? $this->applyUpdateRules($rules) : null;

        return $rules;
    }


}
