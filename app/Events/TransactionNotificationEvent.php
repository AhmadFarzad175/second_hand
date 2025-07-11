<?php
// app/Events/TransactionNotificationEvent.php
namespace App\Events;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Support\Facades\Log;


class TransactionNotificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
   public $userId;
    public $message;
    public $transactionId;
    public $type;

    public function __construct($userId, $message, $transactionId, $type)
    {
       $this->userId = $userId;
        $this->message = $message;
        $this->transactionId = $transactionId;
        $this->type = $type;
    }

    // public function broadcastOn()
    // {
    //     return new PrivateChannel('user.' . $this->userId);
    // }
    public function broadcastOn()
{
    // Log::info("5. Broadcasting to user.{$this->userId}");
    return new PrivateChannel('user.'.$this->userId);
}

public function broadcastWith()
{
    // Log::info('6. Preparing broadcast data');
    return [
        'message' => $this->message,
        'transaction_id' => $this->transactionId,
        'type' => $this->type,
    ];
}


    // public function broadcastWith()
    // {
    //     return [
    //         'message' => $this->message,
    //         'transaction_id' => $this->transactionId,
    //     ];
    // }

    public function broadcastAs()
    {
        return 'transaction.notification';
    }
}
