<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logistique extends Model
{
    use HasFactory;
    protected $table = 'logistique'; 
    public $timestamps = true;

    protected $fillable = ['formation_id', 'hebergement', 'transport', 'autres_details'];

    // Relation avec la formation
    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
