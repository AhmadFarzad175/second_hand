<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    /**
     * List all conversations for a test user (user_id = 1)
     */
    public function index()
    {
        $userId = 1; // TEMP: Hardcoded test user ID

        $conversations = Conversation::with([
            'userOne',
            'userTwo',
            'messages' => fn($query) => $query->latest()->limit(1)
        ])
        ->where('user_one_id', $userId)
        ->orWhere('user_two_id', $userId)
        ->orderByDesc('updated_at')
        ->get();

        return ConversationResource::collection($conversations);
    }

    /**
     * Start or fetch existing conversation between user 1 and another user
     */
    public function store(Request $request)
    {
        $userId = 1; // TEMP: Hardcoded user ID for testing

        $request->validate([
            'user_id' => 'required|exists:users,id|not_in:' . $userId,
        ]);

        // Avoid duplicate conversations
        $conversation = Conversation::betweenUsers($userId, $request->user_id)->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => min($userId, $request->user_id),
                'user_two_id' => max($userId, $request->user_id),
            ]);
        }

        return new ConversationResource(
            $conversation->load(['userOne', 'userTwo'])
        );
    }

    /**
     * Show full conversation details
     */
    public function show(Conversation $conversation)
    {
        return new ConversationResource(
            $conversation->load(['userOne', 'userTwo', 'messages'])
        );
    }

    /**
     * Delete a conversation (no auth check for now)
     */
    public function destroy(Conversation $conversation)
    {
        $conversation->delete();

        return response()->json(['message' => 'Conversation deleted']);
    }
}
