<?php

// app/Http/Controllers/Admin/ADUsersController.php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\User; // مدل User رو وارد کن
use Inertia\Inertia;

class ADUsersController extends Controller
{
    // متد برای نمایش کاربران
    public function index()
    {
        // گرفتن همه‌ی کاربران از دیتابیس
        $users = User::select('id','name', 'email', 'address', 'phone', 'start_date', 'expiry_date', 'exchange_name')->get();

        // ارسال کاربران به نمای React
        return Inertia::render('Admin/ADUsers', [
            'users' => $users
        ]);
    }

    public function setDates(Request $request, User $user)
    {
        // اعتبارسنجی ورودی‌ها
        $request->validate([
            'start_date' => 'required|date',
            'expiry_date' => 'required|date',
        ]);
    
        // فقط تاریخ‌ها را بروزرسانی می‌کنیم
        $user->update([
            'start_date' => $request->start_date,
            'expiry_date' => $request->expiry_date,
        ]);
    
        // استفاده از flash برای ارسال پیام موفقیت به نمای React
        return Inertia::render('Admin/ADUsers', [
            'users' => User::select('id','name', 'email', 'address', 'phone', 'start_date', 'expiry_date', 'exchange_name')->get(),
            'flash' => [
                'success' => 'تاریخ‌ها با موفقیت ذخیره شدند.'
            ]
        ]);
    }
    
}
