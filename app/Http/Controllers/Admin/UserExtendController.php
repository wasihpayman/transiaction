<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\License; // به فرض اینکه مدل License وجود دارد
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class UserExtendController extends Controller
{
    /**
     * نمایش همه کاربران به همراه تاریخ شروع و تاریخ انقضا
     */
    public function index()
    {
        $users = User::select('id', 'name', 'start_date', 'expiry_date', 'exchange_name', 'phone')
            ->get()
            ->map(function ($user) {
                $user->start_date = Carbon::parse($user->start_date)->toDateString();
                $user->expiry_date = Carbon::parse($user->expiry_date)->toDateString();
                return $user;
            });

        return Inertia::render('Admin/UserExtend', [
            'users' => $users,
            
        ]);
    }

    public function extendLicense(Request $request): RedirectResponse
    {
        $request->validate([
            'id' => 'required|exists:users,id',
            'new_expiry_date' => 'required|date|after_or_equal:today',
        ]);

        $user = User::find($request->id);

        if (!$user) {
            return redirect()->back()->with('error', 'کاربر پیدا نشد.');
        }

        $user->expiry_date = Carbon::parse($request->new_expiry_date);
        $user->save();

        return redirect()->back()->with('success', 'لایسنس با موفقیت تمدید شد.');


    }



    
    /**
     * صفحه ایجاد لایسنس جدید
     */
    public function create()
    {
        // دریافت همه کاربران
        $users = User::all();
    
        return Inertia::render('Admin/UserExtend', [
            'users' => $users
        ]);
    }

    /**
     * ذخیره لایسنس جدید
     */
    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id',
            'new_expiry_date' => 'required|date|after_or_equal:today',
        ]);
    
        $user = User::find($request->id);
    
        if (!$user) {
            return back()->withErrors(['user_not_found' => 'کاربر مورد نظر یافت نشد.']);
        }
    
        $user->expiry_date = Carbon::parse($request->new_expiry_date);
        $user->save();
    
        return redirect()->back()->with('message', 'تاریخ انقضا لایسنس با موفقیت تمدید شد.');
    }

}
