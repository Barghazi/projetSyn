<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formateur;
use Illuminate\Support\Str;

class FormateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Vider la table (supprimer tout)
        Formateur::truncate();

        // 2. Insérer 10 formateurs
        $formateurs = [
            [
                'nom' => 'Benali',
                'prenom' => 'Mohamed',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Casablanca',
                'site_hebergement' => 'Casablanca Centre',
            ],
            [
                'nom' => 'Alaoui',
                'prenom' => 'Fatima',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Rabat',
                'site_hebergement' => 'Rabat Agdal',
            ],
            [
                'nom' => 'El Idrissi',
                'prenom' => 'Omar',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Marrakech',
                'site_hebergement' => null,
            ],
            [
                'nom' => 'Bouazizi',
                'prenom' => 'Khalid',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Fès',
                'site_hebergement' => 'Fès Ville Nouvelle',
            ],
            [
                'nom' => 'Lamrani',
                'prenom' => 'Samira',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Agadir',
                'site_hebergement' => 'Agadir Centre',
            ],
            [
                'nom' => 'Zahidi',
                'prenom' => 'Youssef',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Tanger',
                'site_hebergement' => 'Tanger Centre',
            ],
            [
                'nom' => 'Nassiri',
                'prenom' => 'Leila',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Meknès',
                'site_hebergement' => null,
            ],
            [
                'nom' => 'Chafai',
                'prenom' => 'Said',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Oujda',
                'site_hebergement' => 'Oujda Angad',
            ],
            [
                'nom' => 'Rhani',
                'prenom' => 'Hind',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Kénitra',
                'site_hebergement' => null,
            ],
            [
                'nom' => 'Abbassi',
                'prenom' => 'Hamza',
                'matricule' => Str::upper(Str::random(8)),
                'etablissement' => 'OFPPT Beni Mellal',
                'site_hebergement' => 'Beni Mellal Centre',
            ],
        ];

        foreach ($formateurs as $formateur) {
            Formateur::create($formateur);
        }
    }
}
