<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::get('/formations', [FormationController::class, 'index']);   // Liste des formations
Route::get('/formations/{id}', [FormationController::class, 'show']); // Détails d'une formation

// Routes protégées par auth:sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/formations', [FormationController::class, 'store']);    // Créer une formation
    Route::put('/formations/{id}', [FormationController::class, 'update']); // Mettre à jour une formation
    Route::delete('/formations/{id}', [FormationController::class, 'destroy']); // Supprimer une formation
    Route::get('/user', [UserController::class, 'profile']); // Profil de l'utilisateur connecté
});

// Routes d'authentification
Route::post('login', [AuthController::class, 'login']);  // Authentification
Route::post('register', [AuthController::class, 'register']); // Inscription
