<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
   public function index()
{
    $userId = Auth::id();

    $conversations = Conversation::with([
        'userOne',
        'userTwo',
        'product', // if needed
        'messages' => function ($q) {
            $q->latest()->limit(1); // fetch only the last message
        }
    ])
    ->where(function ($query) use ($userId) {
        $query->where('user_one_id', $userId)
              ->orWhere('user_two_id', $userId);
    })
    ->orderByDesc('updated_at')
    ->get();

    return ConversationResource::collection($conversations);
}


    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $userId = Auth::id();
        $otherUserId = $request->user_id;

        $conversation = Conversation::betweenUsers($userId, $otherUserId)->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $userId,
                'user_two_id' => $otherUserId,
            ]);
        }

        return new ConversationResource($conversation);
    }

    public function getOrCreate($userId)
    {
        $authId = Auth::id();

        $conversation = Conversation::betweenUsers($authId, $userId)->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user_one_id' => $authId,
                'user_two_id' => $userId,
            ]);
        }

        return new ConversationResource($conversation);
    }

    public function destroy($id)
    {
        $conversation = Conversation::findOrFail($id);

        $userId = Auth::id();

        if ($conversation->user_one_id !== $userId && $conversation->user_two_id !== $userId) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $conversation->delete();

        return response()->json(['message' => 'Conversation deleted']);
    }
}
