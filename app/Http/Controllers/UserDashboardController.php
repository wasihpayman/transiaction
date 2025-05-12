<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Notification;
use App\Models\SecurityLog; // اضافه کردن مدل SecurityLog

class UserDashboardController extends Controller
{
    
    public function index()
    {
        $user = auth()->user();
    
        // دریافت نوتیفیکیشن‌های خوانده‌نشده
        $notifications = Notification::where('user_id', $user->id)
            ->where('is_read', true)
            ->latest()
            ->get();
    
        return Inertia::render('UserDashboard', [
            'unreadNotifications' => $notifications,
            'user' => $user
        ]);
    }
    
    private function storeLoginAttempt($user, $action_type, $details = null)
    {
        // ایجاد یک رکورد جدید در جدول SecurityLog
        $log = new SecurityLog();
        $log->user_id = $user->id;  // شناسه کاربر
        $log->action_type = $action_type;  // نوع عمل ورود
        $log->ip_address = request()->ip();  // آدرس IP کاربر
        $log->details = $details;  // جزئیات اضافی (اختیاری)
        $log->save();  // ذخیره اطلاعات
    }
}
