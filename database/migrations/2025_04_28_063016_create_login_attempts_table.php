<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoginAttemptsTable extends Migration
{
    public function up()
    {
        Schema::create('login_attempts', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address');
            $table->timestamp('attempted_at');
            $table->boolean('successful')->default(false);
            $table->text('error_message')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('login_attempts');
    }
}
