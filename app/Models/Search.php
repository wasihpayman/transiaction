<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Search extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'username'
    ];

    // ارتباط‌ها
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
