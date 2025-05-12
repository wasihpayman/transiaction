<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Notification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with('user:id,name,phone,exchange_name,address')  // اطمینان حاصل کن که فیلدها به درستی بارگذاری شوند
        ->latest()
        ->paginate(10);
        \Log::info($notifications);
        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('Admin/Notification', [
            'notifications' => $notifications,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'required|in:warning,info,license_expiry',
            'user_id' => 'required|exists:users,id'
        ]);
    
        Notification::create([
            'title' => $request->title,
            'message' => $request->message,
            'type' => $request->type,
            'user_id' => $request->user_id
        ]);
    
        return redirect()->back()->with('success', 'نوتیفیکیشن با موفقیت ارسال شد.');
    }
    // NotificationController.php
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
    
        // فقط نوتیفیکیشن خود کاربر قابل تغییر باشد
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }
    
        $notification->is_read = true;
        $notification->save();
    
        return response()->json(['message' => 'Marked as read']);
    }
    
public function delete($id)
{
    $notification = Notification::findOrFail($id);
    $notification->delete();

    return response()->json(['message' => 'Notification deleted successfully']);
    
}
// در NotificationController.php

public function sendToAll(Request $request)
{
    // دریافت تمام کاربران
    foreach (User::all() as $user) {
        Notification::create([
            'user_id' => $user->id,
            'title' => $request->title,
            'message' => $request->message,
            'type' => $request->type,
        ]);
        \Log::info('SendToAll called by: ' . auth()->user()->id);

    }
    
    return back()->with('success', 'نوتیفیکیشن به همه کاربران ارسال شد!');
}
}
