<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;  // اضافه کردن این خط
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia; 
use App\Models\User; // اضافه کردن این خط
use App\Controller\ProfileController; // اضافه کردن این خط

class CheckUserExpiry
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if ($user && $user->expiry_date && now()->greaterThan($user->expiry_date)) {
            // اگر تاریخ گذشته باشد، برگردد به یک صفحه خاص
            return Inertia::render('Expired', [
                'message' => 'تاریخ اشتراک شما منقضی شده است. لطفاً با مدیریت تماس بگیرید.'
            ]);
        }

        return $next($request);
    }
}
