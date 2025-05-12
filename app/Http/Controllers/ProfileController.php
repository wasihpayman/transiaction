<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $profile = $user->profile;

        return Inertia::render('Profile', [
            'profile' => [
                'username' => $profile?->username ?? '',
                'expiry_date' => $user->expiry_date,
                'phone' => $profile?->phone ?? '',
                'address' => $profile?->address ?? '',
                'profile_photo' => $profile?->profile_photo 
                    ? asset('storage/' . $profile->profile_photo)
                    : null,
            ],
            'errors' => session('errors') ? session('errors')->getBag('default')->toArray() : [],
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $profile = $user->profile ?? $user->profile()->create([]);
    
        // اعتبارسنجی ورودی‌ها
        $validated = $request->validate([
            'username' => 'required|string|unique:profiles,username,' . $profile->id,
            'phone' => 'required|string',
            'address' => 'required|string',
            'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);
    
        // اگر فایلی برای عکس پروفایل ارسال شده باشد، آن را ذخیره می‌کنیم
        if ($request->hasFile('profile_photo')) {
            $newPhotoPath = $request->file('profile_photo')->store('profile_photos', 'public');
    
            if ($profile->profile_photo) {
                Storage::disk('public')->delete($profile->profile_photo);
            }
    
            $profile->profile_photo = $newPhotoPath;
        }
    
        // به‌روزرسانی فیلدهای پروفایل
        $profile->username = $validated['username'];
        $profile->phone = $validated['phone'];
        $profile->address = $validated['address'];
        $profile->save();
    
        // بازگشت با پیام موفقیت
        return redirect()->back()->with('success', 'پروفایل با موفقیت به‌روزرسانی شد.');
    }
    
    
}
