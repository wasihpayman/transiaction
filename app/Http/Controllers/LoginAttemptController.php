<?php

// app/Http/Controllers/LoginAttemptController.php

namespace App\Http\Controllers;

use App\Models\LoginAttempt;
use Inertia\Inertia;

class LoginAttemptController extends Controller
{
    public function index()
    {
        // گرفتن همه تلاش‌های ورود از دیتابیس
        $loginAttempts = LoginAttempt::all();
    
    
        // ارسال داده‌ها به کامپوننت React با استفاده از Inertia
        return Inertia::render('Admin/LoginAttempts', [
            'loginAttempts' => $loginAttempts
        ]);
    }
    
}
