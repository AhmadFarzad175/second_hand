<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message->load(['sender', 'conversation']);
    }

    public function broadcastOn()
    {
        $conversation = $this->message->conversation;
        $otherUserId = $conversation->user_one_id == $this->message->sender_id
            ? $conversation->user_two_id
            : $conversation->user_one_id;

        return new PresenceChannel('chat.'.$conversation->id);
    }

    public function broadcastWith()
    {
 
          return [
            'id' => $this->message->id,
            'conversation_id' => $this->message->conversation_id,
            'sender_id' => $this->message->sender_id,
            'sender' => [
                'id' => $this->message->sender->id,
                'name' => $this->message->sender->name,
            ],
            'message' => $this->message->message,
            'is_read' => $this->message->is_read,
            'created_at' => $this->message->created_at->toDateTimeString(),
        ];
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}
// namespace App\Events;

// use App\Models\Message;
// use Illuminate\Broadcasting\Channel;
// use Illuminate\Broadcasting\InteractsWithSockets;
// use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
// use Illuminate\Foundation\Events\Dispatchable;
// use Illuminate\Queue\SerializesModels;

// class MessageSent implements ShouldBroadcast
// {
//     use Dispatchable, InteractsWithSockets, SerializesModels;

//     public $message;

//     public function __construct(Message $message)
//     {
//         $this->message = $message->load('sender');
//     }

//     public function broadcastOn()
//     {
//         // return new Channel('chat.' . $this->message->receiver_id);
//         return new Channel('chat.' . $this->message->sender_id . '.' . $this->message->receiver_id);
//     }

//     public function broadcastWith()
//     {
//         return [
//             'id' => $this->message->id,
//             'sender_id' => $this->message->sender_id,
//             'receiver_id' => $this->message->receiver_id,
//             'message' => $this->message->message,
//             'is_read' => $this->message->is_read,
//             'date' => $this->message->date,
//         ];
//     }
//}
