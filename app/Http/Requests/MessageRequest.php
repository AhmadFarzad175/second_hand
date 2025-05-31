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
        // $rules = [
        //     'receiver_id' => 'required|exists:users,id|different:auth_user',
        //     'product_id' => 'nullable|exists:products,id',
        //     'message' => 'required|string|max:255',
        //     'is_read' => 'boolean',
        //     'date' => 'nullable|date',
        // ];
        return [
            'conversation_id' => 'required|exists:conversations,id',
            'message' => 'required|string',
        ];


    }

}
