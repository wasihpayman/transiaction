<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Profile;

class Remittances extends Model
{
    protected $fillable = [
        'sender_id', 'receiver_id', 'amount', 'description', 'status', 'delivered_at'
    ];

    protected $casts = [
        'delivered_at' => 'datetime',
    ];

    // ارتباط با فرستنده
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // ارتباط با گیرنده
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    // پیدا کردن شماره تلفن با یوزرنیم
    public static function getPhoneByUsername($username)
    {
        $user = User::where('username', $username)->first();
        return $user ? $user->profile->phone : null;
    }
}
