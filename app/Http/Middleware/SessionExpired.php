<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class SessionExpired
{
    public function handle($request, Closure $next)
    {
        // بررسی اگر سشن منقضی شده باشد
        if (!Auth::check()) {
            // کاربر لاگ‌اوت شده است و باید به صفحه لاگین هدایت شود
            return redirect()->route('login');
        }

        return $next($request);
    }
}
