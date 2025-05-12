<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User; // حتما باید User را وارد کنی

class DashboardController extends Controller
{
    public function index(){
        // اگر صفحه داشبورد ادمین در فولدر admin قرار داره
        return Inertia::render('Admin/Dashboard'); // مسیر کامل صفحه باید 'admin/Dashboard' باشه
    }

    public function users()
    {
        $users = User::all(); // یا فیلتر شده
        return Inertia::render('Admin/ADUsers', [
            'users' => $users
        ]);
    }
}

