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
        Schema::create('module_filiere', function (Blueprint $table) {
            $table->foreignId('module_id')->constrained();
            $table->foreignId('filiere_id')->constrained();
            $table->timestamps();
            $table->primary(["filiere_id", "module_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module_filiere');
    }
};
