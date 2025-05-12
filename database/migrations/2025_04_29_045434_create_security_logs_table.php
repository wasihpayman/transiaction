<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('security_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // برای شناسایی کاربر
            $table->string('action_type'); // نوع اقدام (ورود، تلاش غیرمجاز و ...)
            $table->string('ip_address'); // آدرس IP
            $table->text('details')->nullable(); // جزئیات اضافی
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('security_logs');
    }
};
