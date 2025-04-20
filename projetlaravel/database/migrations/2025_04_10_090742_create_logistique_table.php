<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logistique', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('formation_id');
            $table->string('hebergement')->nullable();
            $table->string('transport')->nullable();
            $table->text('autres_details')->nullable();
            $table->timestamps();
    
            // Clé étrangère vers la table formations
            $table->foreign('formation_id')->references('id')->on('formations')->onDelete('cascade');
        });
        Schema::rename('logistique', 'logistiques');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logistique');
    }
};
