<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->string('formateur_animateur');
            $table->string('site_de_formation');
            $table->enum('mode_de_formation', ['présentiel', 'distance', 'hybride']);
            $table->enum('statut', ['draft', 'redige', 'valide'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formations');
    }
}
