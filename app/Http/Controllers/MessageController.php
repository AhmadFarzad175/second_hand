<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    /**
     * Display a listing of messages with pagination.
     */
    public function index()
    {
        $messages = Message::paginate(10);
        return MessageResource::collection($messages);
    }

    /**
     * Store a newly created message in storage.
     */
    public function store(MessageRequest $request): MessageResource
    {
        $message = Message::create($request->validated());
        event(new MessageSent($message));
        
        // broadcast(new MessageSent($message));

        // return response()->json(['message' => 'Message sent successfully!']);
        return new MessageResource($message);
    }

    public function show(Message $message): JsonResponse
    {
        return response()->json(new MessageResource($message), 200);
    }

    /**
     * Update the specified message in storage.
     */
    public function update(MessageRequest $request, Message $message): MessageResource
    {
        $message->update($request->validated());
        return new MessageResource($message);
    }

    /**
     * Remove the specified message from storage.
     */
    public function destroy(Message $message): JsonResponse
    {
        $message->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }
}
