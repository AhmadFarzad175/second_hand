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
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $rules = [
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id|different:sender_id',
            'product_id' => 'required|exists:products,id',
            'reason' => 'required|string|max:255',
            'date' => 'required|date',
        ];

        // For update requests, some fields might be optional.
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['reason'] = 'sometimes|string|max:255';
            $rules['date'] = 'sometimes|date';
        }

        return $rules;
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'receiver_id.different' => 'The sender and receiver must be different users.',
        ];
    }
}
