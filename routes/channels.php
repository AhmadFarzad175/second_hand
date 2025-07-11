<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('chat.{conversationId}', function ($user, $conversationId) {
    $conversation = Conversation::findOrFail($conversationId);
    return $conversation->user_one_id == $user->id || $conversation->user_two_id == $user->id;
});
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});
// Broadcast::channel('chat.{sender_id}.{receiver_id}', function ($user, $sender_id, $receiver_id) {
//     return $user->id == (int)$sender_id || $user->id == (int)$receiver_id;
// });
