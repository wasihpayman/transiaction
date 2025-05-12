<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;
    protected $table = 'friendships'; // نام جدول در دیتابیس    
    
        protected $fillable = ['sender_id', 'receiver_id', 'status'];
    
        public function sender()
        {
            return $this->belongsTo(Profile::class, 'sender_id', 'user_id');
        }
    
        public function receiver()
        {
            return $this->belongsTo(Profile::class, 'receiver_id', 'user_id');
        }
   
}
