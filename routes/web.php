<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\LoginAttempt;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\ADUsersController;
use App\Http\Controllers\Admin\UserRegisterController;
use App\Http\Controllers\Admin\UserExtendController;
use App\Http\Controllers\SecurityLogController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\FriendController;

// صفحه اصلی (ریدایرکت به لاگین)
Route::get('/', function () {
    return redirect()->route('login');
});

// روت‌های کاربران مهمان (گروه guest)
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login'])->name('login.post');
});

// روت‌های مشترک برای هدایت به داشبورد بر اساس نقش
Route::middleware(['auth', 'check.expiry'])->get('/dashboard', function () {
    $user = auth()->user();
    return $user->is_admin ? redirect()->route('admin.dashboard') : redirect()->route('user.dashboard');
})->name('dashboard');

// روت‌های ادمین
Route::middleware(['auth', 'admin', 'check.expiry'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminUserController::class, 'index'])->name('users');

    // ثبت‌نام کاربر جدید
    Route::get('/user-reg', function () {
        return Inertia::render('Admin/UserReg');
    })->name('user.register');
    Route::post('/register-user', [UserRegisterController::class, 'store'])->name('user.register.store');

    // صفحه تمدید کاربر
    Route::post('/users/{id}/set-dates', [ADUsersController::class, 'setDates'])->name('user.setDates');

    // مدیریت تمدید مجوز کاربر
    // در فایل routes/web.php
Route::get('/user-extend', [UserExtendController::class, 'index'])->name('admin.user-extend');
    Route::post('/user-extend', [UserExtendController::class, 'extendLicense'])->name('extend-license');
    Route::get('/user-extend/create', [UserExtendController::class, 'create'])->name('user-extend.create');
    Route::delete('/user-extend/{license}', [UserExtendController::class, 'destroy'])->name('user-extend.destroy');
    Route::patch('/user-extend/{license}/toggle-block', [UserExtendController::class, 'toggleBlock'])->name('user-extend.toggleBlock');

    Route::middleware(['auth', 'admin', 'check.expiry'])->get('/admin/user-extend', [UserExtendController::class, 'index'])->name('admin.user-extend');

    Route::prefix('admin')->middleware(['auth'])->group(function () {
        Route::get('/notification', [NotificationController::class, 'index'])->name('admin.notification');
        Route::post('/notification', [NotificationController::class, 'store'])->name('admin.notification.store');

        Route::post('/notification/send-to-all', [NotificationController::class, 'sendToAll'])->name('admin.notification.sendToAll');
        Route::post('/user/notification/read/{id}', [NotificationController::class, 'markAsRead'])->middleware('auth');
        Route::delete('/user/notification/delete/{id}', [NotificationController::class, 'delete'])->middleware('auth');
    });

    // مدیریت لاگ‌های امنیتی
    Route::middleware(['auth', 'admin'])->prefix('admin')->group(function() {
        Route::get('/security-logs', [SecurityLogController::class, 'index'])->name('admin.security-logs');
    });

    // مشاهده تلاش‌های ناموفق ورود


    // بلاک کردن آی‌پی
    Route::post('/block-ip/{id}', [AdminUserController::class, 'blockIp'])->name('blockIp');
});

// routes/web.php

use App\Http\Controllers\ProfileController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
});
// در routes/web.php موقتاً این route را اضافه کنید

// routes/web.php

Route::middleware('auth')->group(function () {
    Route::get('/getexchangeusername', [RemittanceController::class, 'getExchangeUsername']);
});


use App\Http\Controllers\SearchController;
Route::middleware(['auth'])->group(function () {
    Route::get('/friendship/search', [FriendController::class, 'search'])->name('friendship.search');
    Route::post('/friendship/send', [FriendController::class, 'sendRequest'])->name('friendship.send');
    Route::get('/friendship/friend-request', [FriendController::class, 'getSentRequests']);
    Route::get('/friendship/received-requests', [FriendController::class, 'getReceivedRequests']);
    Route::post('/friendship/accept/{id}', [FriendController::class, 'accept']);
    Route::get('/friendship/friends', [FriendController::class, 'listfriends']);

});

use App\Http\Controllers\RemittanceController;

Route::middleware('auth')->group(function () {
    Route::post('/remittances', [RemittanceController::class, 'store'])->name('remittances.store');

    Route::get('/remittances', [remittanceController::class, 'index'])->name('remittances.index');
    Route::get('/remittances/sent', [RemittanceController::class, 'sent']);
    Route::get('/remittances/received', [RemittanceController::class, 'received']);
    Route::get('/remittances/pending', [RemittanceController::class, 'pending']);
    Route::get('/remittances/delivered', [RemittanceController::class, 'delivered']);
});



use App\Http\Controllers\LoginAttemptController;

Route::get('/login-attempts', [LoginAttemptController::class, 'index']);


// روت‌های کاربران معمولی
Route::middleware(['auth', 'check.expiry'])->prefix('user')->name('user.')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
});

// روت خروج از حساب کاربری
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
