<?php

namespace Database\Factories;

use App\Models\Formation;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormationFactory extends Factory
{
    protected $model = Formation::class;

    public function definition()
    {
        return [
            'titre' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'date_debut' => $this->faker->date(),
            'date_fin' => $this->faker->date(),
            'formateur_animateur' => $this->faker->name,
            'site_de_formation' => $this->faker->city,
            'mode_de_formation' => $this->faker->randomElement(['présentiel', 'distance', 'hybride']),
            'statut' => $this->faker->randomElement(['draft', 'redige', 'valide']),
        ];
    }
}
