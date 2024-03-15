<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::paginate(10);
        return MessageResource::collection($messages);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(MessageRequest $request)
    {
        $message = Message::create($request->validated());
        return new MessageResource($message);
    }

    /**
     * Display the specified resource.
     */




    /**
     * Update the specified resource in storage.
     */
    public function update(MessageRequest $request, Message $message)
    {
        $message->update($request->validated());
        return new MessageResource($message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(["message"=> "Message deleted successfully"]);
    }
}
