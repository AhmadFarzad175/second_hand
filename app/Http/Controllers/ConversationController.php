<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    /**
     * List all conversations for a test user (user_id = 1)
     */
   public function index()
{
    $userId = auth()->id();

    $conversations = Conversation::with([
            'userOne',
            'userTwo',
            'messages' => fn($query) => $query->latest()->limit(1)
        ])
        ->withCount(['messages as unread_count' => function ($query) use ($userId) {
            $query->where('is_read', false)
            ->where('sender_id', '!=', $userId);
        }])
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
        $userId = Auth::id();
// dd($request->input('user_id'), $userId);

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
/////////////////////////////////////
// <?php

// namespace App\Http\Controllers;

// use App\Models\Conversation;
// use Illuminate\Http\Request;
// use App\Http\Resources\ConversationResource;

// class ConversationController extends Controller
// {
//     public function index()
//     {
//         $userId = auth()->id();

//         $conversations = Conversation::with([
//             'userOne',
//             'userTwo',
//             'messages' => fn($query) => $query->latest()->limit(1),
//         ])
//         ->where('user_one_id', $userId)
//         ->orWhere('user_two_id', $userId)
//         ->orderByDesc('updated_at')
//         ->get();

//         return ConversationResource::collection($conversations);
//     }

//     public function store(Request $request)
//     {
//         $userId = auth()->id();

//         $request->validate([
//             'user_id' => 'required|exists:users,id|not_in:' . $userId,
//         ]);

//         $conversation = Conversation::betweenUsers($userId, $request->user_id)->first();

//         if (!$conversation) {
//             $conversation = Conversation::create([
//                 'user_one_id' => min($userId, $request->user_id),
//                 'user_two_id' => max($userId, $request->user_id),
//             ]);
//         }

//         return new ConversationResource(
//             $conversation->load(['userOne', 'userTwo'])
//         );
//     }

//     public function show(Conversation $conversation)
//     {
//         return new ConversationResource(
//             $conversation->load(['userOne', 'userTwo', 'messages.sender'])
//         );
//     }

//     public function destroy(Conversation $conversation)
//     {
//         // Optional: Check if auth user is part of the conversation
//         if (auth()->id() !== $conversation->user_one_id && auth()->id() !== $conversation->user_two_id) {
//             return response()->json(['error' => 'Unauthorized'], 403);
//         }

//         $conversation->delete();

//         return response()->json(['message' => 'Conversation deleted']);
//     }
// }
