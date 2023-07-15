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
        Schema::create('formateur_group', function (Blueprint $table) {
            $table->foreignId('formateur_id')->constrained();
            $table->foreignId('group_id')->constrained();
            $table->foreignId('module_id')->constrained();
            $table->timestamps();
            $table->primary(["group_id", "formateur_id", "module_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formateur_group');
    }
};
