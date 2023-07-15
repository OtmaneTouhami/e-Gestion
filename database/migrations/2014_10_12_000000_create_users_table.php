<?php

use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname', 50);
            $table->string('lastname', 50);
            $table->enum('gender', ["male", "female"]);
            $table->date("birth_date");
            $table->string('adresse', 255);
            $table->string('email')->unique();
            $table->string('presonal_email')->unique();
            $table->string('telephone', 13);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('recovery_password');
            $table->date("start_date");
            $table->date("end_date")->nullable();
            $table->string('avatar')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
