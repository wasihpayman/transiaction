<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class UserRegisterController extends Controller
{
     // اطمینان حاصل کنید که Inertia را وارد کرده‌اید

     public function store(Request $request)
     {
         if (!auth()->check() || !auth()->user()->isAdmin()) {
             abort(403, 'شما اجازه انجام این عملیات را ندارید.');
         }
     
         $validated = $request->validate([
             'name' => 'required|string|max:255',
             'phone' => 'required|string|unique:users,phone',
             'exchange_name' => 'required|string|max:255',
             'start_date' => 'required|date',
             'expiry_date' => 'required|date|after_or_equal:start_date',
             'address' => 'required|string|max:1000',
             'password' => 'required|string|min:6',
             'email' => 'required|email|unique:users,email',
             
         ]);
             // آپلود فایل‌ها
     
         $user = User::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'exchange_name' => $validated['exchange_name'],
            'start_date' => $validated['start_date'],
            'expiry_date' => $validated['expiry_date'],
            'address' => $validated['address'],
            'password' => Hash::make($validated['password']),
            'email' => $validated['email'],
        ]);
        
        session()->flash('success', 'کاربر با موفقیت ثبت شد.');

        return Inertia::render('Admin/UserReg', [
            'message' => 'کاربر با موفقیت ثبت شد.',
            'user' => $user,
        ]);
        
        
     }
     
    
}
