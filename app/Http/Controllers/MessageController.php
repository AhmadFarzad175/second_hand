<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index($conversationId)
    {
        $messages = Message::where('conversation_id', $conversationId)
            ->with('sender')
            ->orderBy('created_at', 'asc')
            ->get();

        return MessageResource::collection($messages);
    }

    public function store(MessageRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = Auth::id();

        $message = Message::create($data);
        $message->conversation->touch();

        broadcast(new MessageSent($message))->toOthers();

        return new MessageResource($message);
    }

    public function show($id)
    {
        $message = Message::with('sender')->findOrFail($id);
        return new MessageResource($message);
    }

    public function update(MessageRequest $request, Message $message)
    {
        $this->authorize('update', $message);
        $message->update($request->validated());
        return new MessageResource($message);
    }

    public function destroy($id)
    {
        $message = Message::findOrFail($id);

        if ($message->sender_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message->delete();

        return response()->json(['message' => 'Message deleted']);
    }

    public function markAsRead($conversationId)
    {
        Message::where('conversation_id', $conversationId)
            ->where('receiver_id', Auth::id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['status' => 'read']);
    }

    public function unreadCount()
    {
        $count = Message::where('receiver_id', Auth::id())
            ->where('is_read', false)
            ->count();

        return response()->json(['unread_count' => $count]);
    }

    public function latestMessage($conversationId)
    {
        $message = Message::where('conversation_id', $conversationId)
            ->latest()
            ->first();

        return new MessageResource($message);
    }

    public function conversations()
    {
        $userId = auth()->id();

        $conversations = Message::selectRaw('
                CASE
                    WHEN sender_id = ? THEN receiver_id
                    ELSE sender_id
                END as other_user_id,
                MAX(created_at) as last_message_time
            ', [$userId])
            ->where(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                      ->orWhere('receiver_id', $userId);
            })
            ->groupBy('other_user_id')
            ->orderByDesc('last_message_time')
            ->get();

        $users = User::whereIn('id', $conversations->pluck('other_user_id'))->get();

        return response()->json($users);
    }
}
