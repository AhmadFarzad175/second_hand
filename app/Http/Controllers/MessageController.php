<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * List messages between two users.
     */
    public function index(Request $request): JsonResponse
    {
        $senderId = $request->query('sender_id');
        $receiverId = $request->query('receiver_id');
        $productId = $request->query('product_id'); // optional

        if (!$senderId || !$receiverId) {
            return response()->json(['error' => 'sender_id and receiver_id are required'], 422);
        }

        $messages = Message::where(function ($query) use ($senderId, $receiverId) {
                $query->where('sender_id', $senderId)
                      ->where('receiver_id', $receiverId);
            })
            ->orWhere(function ($query) use ($senderId, $receiverId) {
                $query->where('sender_id', $receiverId)
                      ->where('receiver_id', $senderId);
            })
            ->when($productId, fn($q) => $q->where('product_id', $productId))
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json(MessageResource::collection($messages));
    }

    /**
     * Store and broadcast a new message.
     */
    public function store(MessageRequest $request): MessageResource
    {
        $data = $request->validated();
        $data['sender_id'] = auth()->id(); // Ensure sender is authenticated user
        $message = Message::create($data);
        broadcast(new MessageSent($message))->toOthers();

        return new MessageResource($message);
    }

    /**
     * Get messages between the logged-in user and another user.
     */
    public function fetchMessages($userId): JsonResponse
    {
        $messages = Message::where(function ($q) use ($userId) {
                $q->where('sender_id', auth()->id())
                  ->where('receiver_id', $userId);
            })
            ->orWhere(function ($q) use ($userId) {
                $q->where('sender_id', $userId)
                  ->where('receiver_id', auth()->id());
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json(MessageResource::collection($messages));
    }

    /**
     * Mark messages as read from a specific user.
     */
    public function markAsRead($userId): JsonResponse
    {
        Message::where('sender_id', $userId)
            ->where('receiver_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['status' => 'read']);
    }

    /**
     * List all users the authenticated user has chatted with.
     */
    public function conversations(): JsonResponse
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
            ->with('sender', 'receiver')
            ->get();

        $users = User::whereIn('id', $conversations->pluck('other_user_id'))->get();

        return response()->json($users);
    }

    public function show(Message $message): JsonResponse
    {
        return response()->json(new MessageResource($message));
    }

    public function update(MessageRequest $request, Message $message): MessageResource
    {
        $message->update($request->validated());
        return new MessageResource($message);
    }

    public function destroy(Message $message): JsonResponse
    {
        $message->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }
}
