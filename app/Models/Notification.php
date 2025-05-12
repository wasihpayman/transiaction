<?php

// app/Models/Notification.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'message', 
        'user_id',  // در صورتی که از شناسه‌ی یوزر به‌طور مستقیم استفاده می‌کنید
        'type', 
        'is_read'
    ];

    // تعریف رابطه برای ارتباط با مدل User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
