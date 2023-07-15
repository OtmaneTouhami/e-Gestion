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
        Schema::create('formateur_module', function (Blueprint $table) {
            $table->foreignId('formateur_id')->constrained();
            $table->foreignId('module_id')->constrained();
            $table->integer("nb_heure_etudier")->default(0);
            $table->enum('status', ['en cour', 'terminer', 'non commencé'])->default('non commencé');
            $table->timestamps();
            $table->primary(["module_id", "formateur_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formateur_module');
    }
};
