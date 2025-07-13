<?php
namespace App\Services;

use App\Models\Notification;
use App\Models\ProductTransaction;
use App\Events\TransactionNotificationEvent;

class NotificationService
{
    public static function notifyTransactionRequest(ProductTransaction $transaction)
    {
        $transaction->loadMissing(['product', 'buyer']);
dd($transaction->product_id);
        $notification = Notification::create([
            'user_id' => $transaction->seller_id,
            'product_id' => $transaction->product_id,
            'notifiable_id' => $transaction->id,
            'notifiable_type' => ProductTransaction::class,
            'type' => 'transaction_request',
            'message' => "New purchase request for {$transaction->product->name} from {$transaction->buyer->name}",
            'is_read' => false
        ]);

        event(new TransactionNotificationEvent(
            $transaction->seller_id,
            $notification->message,
            $transaction->id,
            'transaction_request'
        ));

        return $notification;
    }

    public static function notifyTransactionStatusUpdate(ProductTransaction $transaction)
    {
        $transaction->loadMissing(['product']);

        $action = $transaction->status === 'completed' ? 'accepted' : 'cancelled';

        $notification = Notification::create([
            'user_id' => $transaction->buyer_id,
            'notifiable_id' => $transaction->id,
            'product_id' => $transaction->product_id,
            'notifiable_type' => ProductTransaction::class,
            'type' => "transaction_{$action}",
            'message' => "Your purchase request for {$transaction->product->name} has been {$action}",
            'is_read' => false
        ]);

        event(new TransactionNotificationEvent(
            $transaction->buyer_id,
            $notification->message,
            $transaction->id,
            "transaction_{$action}"
        ));

        return $notification;
    }
}
