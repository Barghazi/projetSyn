<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formation;

class FormationController extends Controller
{
    // Afficher toutes les formations
    public function index()
    {
        return Formation::all();
        return response()->json($formations);
    }

    // Afficher une formation spécifique
    public function show($id)
    {
        // Recherche d'une formation avec gestion des erreurs si elle n'existe pas
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        return response()->json($formation);
    }

    // Créer une nouvelle formation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'formateur_animateur' => 'required|string',
            'site_de_formation' => 'required|string',
            'mode_de_formation' => 'required|in:présentiel,distanciel,hybride',
            'statut' => 'required|in:draft,redige,valide',
        ]);

        $formation = Formation::create($validated);

        return response()->json($formation, 201);
    }

    // Mettre à jour une formation existante
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'titre' => 'required|string',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'formateur_animateur' => 'required|string',
            'site_de_formation' => 'required|string',
            'mode_de_formation' => 'required|in:présentiel,distanciel,hybride',
            'statut' => 'required|in:draft,redige,valide',
        ]);
        // Recherche et mise à jour de la formation
        $formation = Formation::findOrFail($id);
        $formation->update($validated);

        return response()->json($formation);
    }

    // Supprimer une formation
    public function destroy($id)
    {
        // Vérifier si la formation existe avant de supprimer
        $formation = Formation::find($id);

        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        $formation->delete();

        return response()->json(null, 204);
    }
}
