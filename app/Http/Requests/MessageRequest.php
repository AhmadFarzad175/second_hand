<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for message creation or update.
     */
    public function rules(): array
    {
        $rules = [
            'receiver_id' => 'required|exists:users,id|different:auth_user',
            'product_id' => 'nullable|exists:products,id',
            'message' => 'required|string|max:255',
            'is_read' => 'boolean',
            'date' => 'nullable|date',
        ];

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            // Fields become optional on update
            $rules['receiver_id'] = 'sometimes|exists:users,id|different:auth_user';
            $rules['message'] = 'sometimes|string|max:255';
        }

        return $rules;
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'receiver_id.different' => 'You cannot send a message to yourself.',
        ];
    }

    /**
     * Replace placeholder "auth_user" in validation with actual user ID.
     */
    protected function prepareForValidation()
    {
        if ($this->user()) {
            $this->merge([
                'auth_user' => $this->user()->id,
            ]);
        }
    }
}
