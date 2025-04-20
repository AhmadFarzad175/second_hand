<?php

namespace App\Http\Controllers\Mobile;

use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessageMobileController extends Controller
{

    // POST /api/mobile/messages
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'message' => 'required|string',
        ]);

        $message = Message::create($validated);
        return response()->json($message, 201);
    }

    // GET /api/mobile/messages/{user_id}
    public function inbox($user_id)
    {
        $messages = Message::where('receiver_id', $user_id)
            ->orWhere('sender_id', $user_id)
            ->latest()
            ->get();

        return response()->json($messages);
    }

}
