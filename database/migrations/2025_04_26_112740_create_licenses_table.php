<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::create('licenses', function (Blueprint $table) {
        $table->id(); // آیدی یکتا برای هر لایسنس
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ارتباط با یوزر
        $table->date('start_date'); // تاریخ شروع لایسنس
        $table->date('end_date');   // تاریخ انقضای لایسنس
        $table->boolean('is_blocked')->default(false); // آیا بلاک شده یا خیر
        $table->timestamps(); // created_at و updated_at
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses');
    }
};
