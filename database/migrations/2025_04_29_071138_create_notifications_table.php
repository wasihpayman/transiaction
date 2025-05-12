<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
// database/migrations/2025_04_30_000000_create_notifications_table.php

public function up()
{
    Schema::create('notifications', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('message');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // ارتباط با جدول users
        $table->enum('type', ['warning', 'info', 'license_expiry']);
        $table->boolean('is_read')->default(false);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
