<?php
// app/Http/Controllers/SearchController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Profile; // اطمینان حاصل کن که این مدل را وارد کرده‌ای
class SearchController extends Controller
{

// SearchController.php
public function search(Request $request)
{
    $query = $request->input('query');

    // پیدا کردن پروفایل‌ها بر اساس username
    $profiles = Profile::with('user')
                ->where('username', 'like', '%' . $query . '%')
                ->whereHas('user', function($q) {
                    $q->where('id', '!=', auth()->id());
                })
                ->get();

    return Inertia::render('UserDashboard', [
        'results' => $profiles,
    ]);
}


    // ارسال درخواست دوستی
    public function addFriend(Request $request)
    {
        $user = User::find($request->user_id);
        
        // اضافه کردن به دوستان
        auth()->user()->friends()->attach($user);
        
        return redirect()->route('dashboard');
    }
}
