<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\LogistiqueController;

use Illuminate\Support\Facades\Route;

// Routes publiques
Route::get('/formations', [FormationController::class, 'index']);   // Liste des formations
Route::get('/formations/{id}', [FormationController::class, 'show']); // Détails d'une formation

Route::post('/formations', [FormationController::class, 'store']); // Créer une formation
Route::put('/formations/{id}', [FormationController::class, 'update']); // Mettre à jour une formation
Route::delete('/formations/{id}', [FormationController::class, 'destroy']); // Supprimer une formation
Route::get('/user', [UserController::class, 'profile']); // Profil de l'utilisateur connecté

// Routes d'authentification
Route::post('login', [AuthController::class, 'login']);  // Authentification
Route::post('register', [AuthController::class, 'register']); // Inscription

Route::get('/formateurs', [FormateurController::class, 'index']);
Route::post('/affecter-formateurs', [FormateurController::class, 'affecterFormateurs']);

// Route pour obtenir les informations logistiques d'une formation
Route::get('/logistique/{id}', [LogistiqueController::class, 'show']);

// Route pour ajouter ou modifier les informations logistiques d'une formation
Route::post('/logistique', [LogistiqueController::class, 'store']);  // POST si création ou modification générale
Route::put('/logistique/{id}', [LogistiqueController::class, 'update']); // PUT pour mise à jour spécifique

// Route pour récupérer les options d'hébergement depuis la base de données
Route::get('/hebergement-options', function() {
    $hebergements = DB::table('logistique')
        ->distinct()
        ->pluck('hebergement');  // Récupère les valeurs distinctes d'hébergement
    return response()->json($hebergements);
});

// Route pour récupérer les options de transport depuis la base de données
Route::get('/transport-options', function() {
    $transports = DB::table('logistique')
        ->distinct()
        ->pluck('transport');  // Récupère les valeurs distinctes de transport
    return response()->json($transports);
});

Route::get('/export-logistique/{id}', [LogistiqueController::class, 'exportLogistique']);
