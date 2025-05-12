<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\LoginAttempt; // اضافه کردن مدل LoginAttempt
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::all(); // همه کاربران را می‌گیرد

        return inertia('Admin/ADUsers', [
            'users' => $users
        ]);
    }

    public function showLoginAttempts()
    {
        // دریافت تلاش‌های ناموفق ورود به سیستم
        $loginAttempts = LoginAttempt::where('successful', false)->latest()->get(); // تلاش‌های ناموفق، مرتب‌شده به ترتیب جدیدترین

        // نمایش این تلاش‌ها در صفحه ادمین
        return inertia('Admin/LoginAttempts', [
            'loginAttempts' => $loginAttempts
        ]);
    }
}
