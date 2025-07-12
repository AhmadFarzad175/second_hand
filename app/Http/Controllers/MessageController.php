<?php

namespace App\Http\Controllers;

use App\Events\UnreadCountUpdated;
use App\Models\Message;
use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Events\MessageDeleted;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index($conversationId)
    {
        $conversation = Conversation::findOrFail($conversationId);

        $messages = $conversation->messages()
            ->with('sender')
            ->orderBy('created_at')
            ->get();

        return MessageResource::collection($messages);
    }

    public function store(MessageRequest $request, $conversationId)
    {
        $validated = $request->validated();
        $message = Message::create([
            'conversation_id' => $validated['conversation_id'],
            'sender_id' => $validated['sender_id'],
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        // Broadcast unread count update to the recipient
        $recipientId = $message->conversation->user_one_id == auth()->id()
            ? $message->conversation->user_two_id
            : $message->conversation->user_one_id;

        broadcast(new UnreadCountUpdated($recipientId, $this->calculateUnreadCount($recipientId)));

        return new MessageResource($message->load('sender'));
    }
    public function destroy($messageId, Request $request)
    {
        $message = Message::findOrFail($messageId);

        // if ($message->sender_id !== $request->user_id) {
        //     return response()->json(['error' => 'Unauthorized'], 403);
        // }

        broadcast(new MessageDeleted($message))->toOthers();

        $message->delete();

        return response()->json(['message' => 'Message deleted successfully.']);
    }



    public function markAsRead($conversationId, Request $request)
    {
        // $conversation = Conversation::findOrFail($conversationId);
        $userId = Auth::id();

        Message::where('conversation_id', $conversationId)
            ->where('sender_id', '!=', $userId) // no Auth
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['status' => 'read']);
    }

    public function unreadCount(Request $request)
    {
        $userId = Auth::id();
        // $userId = $request->user_id;
        // dd($userId);
        $count = Message::whereHas('conversation', function ($q) use ($userId) {
            $q->where('user_one_id', $userId)->orWhere('user_two_id', $userId);
        })->where('sender_id', '!=', $userId)->where('is_read', false)->count();
        // dd($count);

        return response()->json(['unread_count' => $count]);
    }

    protected function calculateUnreadCount($userId)
    {
        return Message::whereHas('conversation', function ($q) use ($userId) {
            $q->where('user_one_id', $userId)
                ->orWhere('user_two_id', $userId);
        })->where('sender_id', '!=', $userId)
            ->where('is_read', false)
            ->count();
    }
}

// <?php

// namespace App\Http\Controllers;

// use App\Models\Message;
// use App\Events\MessageSent;
// use App\Events\MessageDeleted;
// use App\Models\Conversation;
// use Illuminate\Http\Request;
// use App\Http\Requests\MessageRequest;
// use App\Http\Resources\MessageResource;

// class MessageController extends Controller
// {
//     public function index($conversationId)
//     {
//         $conversation = Conversation::findOrFail($conversationId);

//         $messages = $conversation->messages()
//             ->with('sender')
//             ->orderBy('created_at')
//             ->get();

//         return MessageResource::collection($messages);
//     }

//     public function store(MessageRequest $request, $conversationId)
//     {
//         $message = Message::create([
//             'conversation_id' => $conversationId,
//             'sender_id' => auth()->id(),
//             'message' => $request->message,
//             'is_read' => false,
//         ]);

//         broadcast(new MessageSent($message))->toOthers();

//         return new MessageResource($message->load('sender'));
//     }

//     public function destroy($messageId)
//     {
//         $message = Message::findOrFail($messageId);

//         if ($message->sender_id !== auth()->id()) {
//             return response()->json(['error' => 'Unauthorized'], 403);
//         }

//         broadcast(new MessageDeleted($message))->toOthers();

//         $message->delete();

//         return response()->json(['message' => 'Message deleted successfully.']);
//     }

//     public function markAsRead($conversationId)
//     {
//         $conversation = Conversation::findOrFail($conversationId);

//         Message::where('conversation_id', $conversationId)
//             ->where('sender_id', '!=', auth()->id())
//             ->where('is_read', false)
//             ->update(['is_read' => true]);

//         return response()->json(['status' => 'read']);
//     }

//     public function unreadCount()
//     {
//         $userId = auth()->id();

//         $count = Message::whereHas('conversation', function ($q) use ($userId) {
//             $q->where('user_one_id', $userId)
//               ->orWhere('user_two_id', $userId);
//         })->where('sender_id', '!=', $userId)
//           ->where('is_read', false)
//           ->count();

//         return response()->json(['unread_count' => $count]);
//     }
// }
