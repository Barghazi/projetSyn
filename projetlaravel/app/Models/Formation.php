<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory;

    // Si le nom de la table n'est pas le pluriel du nom de la classe, il faut le spécifier
    protected $table = 'formations'; // Par exemple, 'formations' pour la table dans la base de données

    // Définir les champs qui peuvent être remplis (en masse)
    protected $fillable = [
        'titre',
        'description',
        'date_debut',
        'date_fin',
    ];

    // Si les dates sont utilisées dans le modèle, spécifie le format de la date
    protected $dates = ['date_debut', 'date_fin'];
}

