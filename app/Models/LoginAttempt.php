<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class LoginAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address', // آدرس IP
        'username',   // نام کاربری
        'successful', // وضعیت موفقیت
        'attempted_at', // زمان تلاش
        'error_message', // پیام خطا
    ];

    // اگر بخواهید زمان‌های ایجاد و بروزرسانی رکورد را به فرمت خاصی تنظیم کنید
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}

