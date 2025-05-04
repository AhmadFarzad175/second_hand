<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * List messages between two users (with pagination and optional product filter)
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
        $message = Message::create($request->validated());
        broadcast(new MessageSent($message))->toOthers(); // Real-time broadcast

        return new MessageResource($message);
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
