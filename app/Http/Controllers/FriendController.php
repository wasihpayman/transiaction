<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Friendship;
use App\Models\User; // اضافه کردن این خط
use App\Http\Controllers\Controller; // اضافه کردن این خط
use App\Http\Middleware\CheckUserExpiry; // اضافه کردن این خط

class FriendController extends Controller
{
    public function search(Request $request)
    {
        $username = $request->input('username');
        $userId = Auth::id();  // گرفتن user_id از طریق احراز هویت
    
        // جستجو در پروفایل‌ها که username را جستجو می‌کند و user_id خود کاربر را حذف می‌کند
        $profiles = Profile::where('username', 'like', "%$username%")
            ->where('user_id', '!=', $userId)  // فیلتر کردن خود کاربر
            ->with('user')  // برای ارتباط با مدل User
            ->get();
    
        // اگر درخواست AJAX بود یا expects JSON
        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'searchResults' => $profiles,
            ]);
        }
    
        // بازگشت به صفحه UserDashboard با نتایج جستجو
        return Inertia::render('UserDashboard', [
            'searchResults' => $profiles->map(function ($profile) {
                return [
                    'username' => $profile->user->username,  // نام کاربر فرستنده
                    'avatar' => $profile->user->avatar,  // عکس پروفایل (اگر وجود داشته باشد)
                    'created_at' => $profile->user->created_at,  // تاریخ ایجاد پروفایل
                ];
            }),
            'csrf_token' => csrf_token(),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    // ارسال درخواست دوستی
    public function sendRequest(Request $request)
    {
        // اعتبارسنجی ورودی‌ها
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id|not_in:' . Auth::id(),
        ]);
    
        $senderId = Auth::id();  // user_id فرستنده از طریق احراز هویت
        $receiverId = $validated['receiver_id'];  // دریافت user_id گیرنده از درخواست
    
        // بررسی اینکه آیا درخواست دوستی قبلاً ارسال شده
        $existingRequest = Friendship::where(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $senderId)
                ->where('receiver_id', $receiverId);
        })
        ->orWhere(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $receiverId)
                ->where('receiver_id', $senderId);
        })
        ->first();
    
        // اگر درخواست قبلاً ارسال شده باشد، خطا به صورت JSON باز می‌گردانیم
        if ($existingRequest) {
            return response()->json(['message' => 'درخواست دوستی قبلاً ارسال شده است.'], 400);
        }
    
        // ایجاد درخواست دوستی جدید
        Friendship::create([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'status' => 'pending', // وضعیت در انتظار تایید
        ]);
    
        // موفقیت در ارسال درخواست دوستی
        return response()->json(['message' => 'درخواست دوستی با موفقیت ارسال شد!'], 200);
    }

    public function showFriendRequests()
{
    $userId = Auth::id();  // گرفتن شناسه کاربری فعلی

    // دریافت درخواست‌های دوستی که به کاربر ارسال شده‌اند (گیرنده)
    $friendRequests = Friendship::where('receiver_id', $userId)
        ->where('status', 'pending')  // فقط درخواست‌هایی که هنوز در انتظار هستند
        ->with('sender')  // بارگذاری اطلاعات فرستنده
        ->get();

    return Inertia::render('UserDashboard', compact('friendRequests'));
}
public function getReceivedRequests()
{
    // اینجا شما می‌توانید درخواست‌های دریافت شده را از دیتابیس بگیرید
    $receivedRequests = Friendship::where('status', 'pending') // فرض کنید که درخواست‌ها با وضعیت 'pending' هستند
                                   ->where('receiver_id', auth()->id()) // و دریافت‌کننده آن‌ها کاربر جاری است
                                   ->get();

    return response()->json($receivedRequests);
}
// app/Http/Controllers/FriendController.php

public function getSentRequests(Request $request)
{
    // فرض می‌کنیم که مدل FriendRequest مربوط به درخواست‌های دوستی است
    $sentRequests = Friendship::where('sender_id', auth()->id())->get();

    return response()->json(['sentRequests' => $sentRequests]);
}
public function accept($id)
{
    // پیدا کردن درخواست دوستی با id
    $request = Friendship::find($id);

    if (!$request) {
        return response()->json(['message' => 'Request not found'], 404);
    }

    // به‌روزرسانی وضعیت به accepted
    $request->status = 'accepted';
    $request->save();

    return response()->json(['message' => 'Friend request accepted'], 200);
}
// app/Http/Controllers/FriendshipController.php
// app/Http/Controllers/FriendshipController.php
public function listfriends(Request $request)
{
    $user = $request->user();  // کاربر لاگین شده را می‌گیریم

    // گرفتن لیست دوستان تایید شده
    $friends = $user->friends()->get();

    // ارسال پاسخ با اطلاعات دوستان
    return response()->json([
        'success' => true,
        'friends' => $friends->map(function ($friend) {
            return [
                'id' => $friend->id,
                'username' => $friend->username,  // فرض بر این است که فیلد username در مدل User وجود دارد
                'avatar' => $friend->avatar,  // فرض بر این است که فیلد avatar در مدل User وجود دارد
                'created_at' => $friend->created_at,  // فرض بر این است که فیلد created_at در مدل User وجود دارد
            ];
        }),
    ]);
}



}
