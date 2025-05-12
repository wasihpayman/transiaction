<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Controller\Admin\NotificationController;
use App\Models\Profile;
use App\Models\License;
use App\Models\Friendship;
use App\Models\Notification; // اضافه کردن این خط

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public function isAdmin()
{
    return $this->is_admin;
}
// app/Models/User.php

public function profile()
{
    return $this->hasOne(Profile::class);
}


public function notifications()
{
    return $this->hasMany(Notification::class, 'user_id', 'id'); // اتصال به ناتیفیکیشن‌ها با استفاده از user_id
}
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'address',
        'phone',
        'start_date',
        'expiry_date',
        'exchange_name',

    ];
    
    public function getStartDateAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y-m-d'); // تنظیم فرمت تاریخ
    }

    public function getEndDateAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('Y-m-d'); // تنظیم فرمت تاریخ
    }

    // app/Models/User.php
public function friends()
{
    return $this->belongsToMany(User::class, 'friendships', 'sender_id', 'receiver_id')
                ->wherePivot('status', 'accepted')
                ->withPivot('status');
}

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function licenses() {
        return $this->hasMany(License::class);
    }
    public function friendships()
    {
        return $this->hasMany(Friendship::class, 'sender_id')
                    ->orWhere('receiver_id', $this->id);
    }


}
