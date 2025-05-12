<?php

namespace App\Http\Controllers;

use App\Models\SecurityLog;
use Inertia\Inertia;

class SecurityLogController extends Controller
{
// app/Http/Controllers/SecurityLogController.php
// app/Http/Controllers/SecurityLogController.php
public function index()
{
    $logs = SecurityLog::with('user')->latest()->paginate(10);
    
    return Inertia::render('Admin/SecurityLog', [
        'auth' => auth()->user(),
        'logs' => $logs, // اگر داده‌های `logs` را نیز به صفحه ارسال می‌کنید
    ]);
    
}
public function storeSecurityLog($user, $action_type, $details = null)
    {
        // ایجاد یک شیء جدید از مدل SecurityLog
        $log = new SecurityLog();
        
        // مقداردهی به فیلدهای مختلف
        $log->user_id = $user->id;  // شناسه کاربر
        $log->action_type = $action_type;  // نوع عمل (مثلاً ورود)
        $log->ip_address = Request::ip();  // آدرس IP کاربر
        $log->details = $details;  // جزئیات اضافی (اختیاری)
        
        // ذخیره‌سازی رکورد جدید در پایگاه داده
        $log->save();
    }
    // در کنترلر
public function getSecurityLogs()
{
    $logs = SecurityLog::all(); // یا هر کوئری دیگری که استفاده می‌کنید
    dd($logs); // نمایش داده‌ها در کنسول
    return Inertia::render('Admin/SecurityLog', [
        'logs' => $logs,
    ]);
}

}
