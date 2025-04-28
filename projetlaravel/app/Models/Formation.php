<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;

class Formation extends Model
{
    use HasFactory;
    
    protected $table = 'formations';

    protected $fillable = [
        'titre',
        'description',
        'date_debut',
        'date_fin',
        'formateur_animateur',
        'site_de_formation',
        'mode_de_formation',
        'statut',
    ];

    protected $dates = [
        'date_debut',
        'date_fin',
    ];
    protected $appends = ['date_debut_formatted', 'date_fin_formatted'];


    // Accessors personnalisés
    public function getDateDebutFormattedAttribute()
    {
        return Carbon::parse($this->date_debut)->format('d/m/Y');
    }

    public function getDateFinFormattedAttribute()
    {
        return Carbon::parse($this->date_fin)->format('d/m/Y');
    }
    // Dans le modèle Formation
public function formateurs()
{
    return $this->hasMany(Formateur::class); // ou belongsToMany si c'est une relation plusieurs-à-plusieurs
}

    
}
