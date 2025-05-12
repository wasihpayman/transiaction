<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('remittances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users'); // صرافی فرستنده
            $table->foreignId('receiver_id')->constrained('users'); // صرافی گیرنده
            $table->decimal('amount', 15, 2);
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'delivered'])->default('pending');
            $table->timestamp('delivered_at')->nullable();
            $table->json('receiver_info')->nullable(); // برای اپلود اطلاعات تحویل گیرنده
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remittances');
    }
};
