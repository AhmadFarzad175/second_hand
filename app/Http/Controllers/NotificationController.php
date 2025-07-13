<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
 public function index(Request $request)
{
    $user = $request->user(); // use authenticated user
    $notifications = Notification::where('user_id', $user->id)
        ->latest()
        ->get();

    return response()->json($notifications); // directly return data
}


    public function markAsRead(Request $request)
    {
        $userId = $request->input('user_id');

        // Update all unread notifications for this user
    Notification::where('user_id', $userId)
                ->where('is_read', false)
                ->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function unreadCount(Request $request)
    {
        $count = Notification::where('user_id', $request->user()->id)
            ->where('is_read', false)
            ->count();

        return response()->json(['count' => $count]);
    }
}
