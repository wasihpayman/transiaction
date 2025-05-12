<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\LoginAttempt; // اضافه کردن مدل LoginAttempt
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        // ارسال تلاش‌های ناموفق ورود به صفحه ورود (در صورت نیاز)
        $loginAttempts = LoginAttempt::latest()->paginate(10); 

        return Inertia::render('Auth/Login', [
            'loginAttempts' => $loginAttempts,
        ]);
    }

    public function login(Request $request)
    {
        // اعتبارسنجی داده‌های ورودی
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // تلاش برای لاگین
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            // چک کردن تاریخ انقضا
            if ($user->expiry_date && now()->greaterThan($user->expiry_date)) {
                // اگر تاریخ انقضا گذشته باشد، لاگ اوت و هدایت به صفحه اکسپایرد
                Auth::logout();

                // اطلاعات تماس مدیریت
                $contactInfo = [
                    'whatsapp' => '0793101061', // شماره واتساپ مدیریت
                    'telegram' => 'money_tree', // کانال تلگرام
                    'email' => 'mirwaisp8@gmail.com',
                    'phone1' => '0700221209',
                    'phone2' => '0793101061',
                    'phone3' => '0798338570',
                ];

                return Inertia::render('Expired', [
                    'message' => 'تاریخ اشتراک شما منقضی شده است. لطفاً با مدیریت تماس بگیرید.',
                    'contactInfo' => $contactInfo,
                ]);
            }

            // اگر همه چیز درست باشد، هدایت به داشبورد
            return redirect()->route('dashboard');
        }

        // ثبت تلاش ناموفق ورود به سیستم
        LoginAttempt::create([
            'ip_address' => $request->ip(),
            'successful' => false,
            'attempted_at' => now(),
            'error_message' => 'یوزرنیم یا پسورد اشتباه است', // اضافه کردن پیام خطای دقیق
        ]);

        // اگر لاگین ناموفق بود
        return back()->withErrors([
            'email' => 'اطلاعات وارد شده معتبر نیست.',
        ]);
    }

    // ارسال پاسخ در صورتی که لاگین ناموفق بود
    protected function sendFailedLoginResponse(Request $request)
    {
        $securityLogRepository = app(SecurityLogRepository::class);
        $securityLogRepository->logEvent('failed_login', 'تلاش ناموفق برای ورود با ایمیل: ' . $request->email, [
            'email' => $request->email,
            'attempts' => $this->limiter()->attempts($this->throttleKey($request)),
        ]);

        throw ValidationException::withMessages([
            $this->username() => [trans('auth.failed')],
        ]);
    }

    public function logout(Request $request)
    {
        // خروج کاربر از سیستم
        Auth::logout();
        
        // پاکسازی سشن و توکن‌های csrf
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        // هدایت به صفحه لاگین
        return redirect()->route('login');
    }
}
