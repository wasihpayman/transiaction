<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->date('start_date')->nullable();
            $table->date('expire_date')->nullable();
            $table->string('exchange_name')->nullable();
        });
    }
    
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['address', 'phone', 'start_date', 'expire_date', 'exchange_name']);
        });
    }
    
};
