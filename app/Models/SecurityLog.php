<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', // شناسه کاربر
        'action_type', // نوع عمل
        'ip_address', // آدرس IP
        'details', // جزئیات
    ];

    // اگر نیاز دارید که این مدل به کاربر مربوط شود:
    public function user()
    {
        return $this->belongsTo(User::class); // مدل User که مربوط به کاربران است
    }
}
