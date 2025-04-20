<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formateur extends Model
{
    use HasFactory;

    protected $table = 'formateurs'; // nom de la table dans la BDD

    protected $fillable = [
        'nom',
        'prenom',
        'matricule',
        'etablissement',
        'site_hebergement',
    ];

    // Si tu n’utilises pas les colonnes created_at / updated_at :
    public $timestamps = false;
}
