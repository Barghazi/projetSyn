<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Logistique;

class LogistiqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Supprimer toutes les anciennes données
        Logistique::truncate();

        // Données complètes sans null
        $logistiques = [
            [
                'formation_id' => 1,
                'hebergement' => 'Hôtel Ibis Casablanca',
                'transport' => 'Bus touristique',
                'autres_details' => 'Déjeuner et pause café inclus.',
            ],
            [
                'formation_id' => 2,
                'hebergement' => 'Hôtel Farah Rabat',
                'transport' => 'Train 1ère classe',
                'autres_details' => 'Transport en groupe organisé.',
            ],
            [
                'formation_id' => 3,
                'hebergement' => 'Maison d\'hôtes Marrakech',
                'transport' => 'Minibus privé',
                'autres_details' => 'Chambres doubles partagées.',
            ],
            [
                'formation_id' => 4,
                'hebergement' => 'Auberge Chefchaouen',
                'transport' => 'Autocar climatisé',
                'autres_details' => 'Excursion prévue en soirée.',
            ],
            [
                'formation_id' => 5,
                'hebergement' => 'Résidence universitaire Fès',
                'transport' => 'Bus scolaire',
                'autres_details' => 'Petit déjeuner offert.',
            ],
            [
                'formation_id' => 6,
                'hebergement' => 'Riad Essaouira',
                'transport' => 'Navette privée',
                'autres_details' => 'Visite culturelle prévue.',
            ],
            [
                'formation_id' => 7,
                'hebergement' => 'Hotel Atlas Asni Marrakech',
                'transport' => 'Train grande vitesse',
                'autres_details' => 'Ateliers pratiques inclus.',
            ],
            [
                'formation_id' => 8,
                'hebergement' => 'Hôtel Sofitel Agadir',
                'transport' => 'Véhicules de location',
                'autres_details' => 'Soirée de clôture organisée.',
            ],
        ];

        foreach ($logistiques as $logistique) {
            Logistique::create($logistique);
        }
    }
}
