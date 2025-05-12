<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    

    public function friendships()
    {
        return $this->hasMany(Friendship::class, 'user_id');
    }

    public function friends()
    {
        return $this->belongsToMany(Profile::class, 'friendships', 'user_id', 'id');
    }

    protected $fillable = [
        'user_id',
        'username',
        'phone',
        'address',
        'profile_photo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function sentFriendRequests()
    {
        return $this->hasMany(Friendship::class, 'sender_id', 'user_id');
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(Friendship::class, 'receiver_id', 'user_id');
    }
}
