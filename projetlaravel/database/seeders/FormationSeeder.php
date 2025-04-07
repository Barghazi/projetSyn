<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formation;

class FormationSeeder extends Seeder
{
    public function run()
    {
        // Remplir la table avec 10 formations
        Formation::factory()->count(10)->create();
    }
}
