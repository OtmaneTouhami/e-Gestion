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
        Schema::disableForeignKeyConstraints();
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->integer('number', false, true);
            $table->integer('nb_stagiaires', false, true)->default(0);
            $table->integer('max_nb', false, true)->default(25);
            $table->enum('year', ['first', 'second']);
            $table->foreignId('filiere_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
