<?php

namespace App\Http\Controllers;

use App\Models\Logistique;
use App\Models\Formation;
use Illuminate\Http\Request;

class LogistiqueController extends Controller
{
    // Méthode pour obtenir les informations logistiques d'une formation
    public function show($id)
    {
        $logistique = Logistique::where('formation_id', $id)->first();
        
        if ($logistique) {
            return response()->json($logistique);
        }

        return response()->json(['message' => 'Logistique non trouvée pour cette formation.'], 404);
    }

    // Méthode pour ajouter ou modifier les informations logistiques d'une formation
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'hebergement' => 'nullable|string',
            'transport' => 'nullable|string',
            'autres_details' => 'nullable|string',
        ]);
        try {
            // Si validation réussie, créer ou mettre à jour la logistique
            $logistique = Logistique::updateOrCreate(
                ['formation_id' => $request->formation_id],
                [
                    'hebergement' => $request->hebergement,
                    'transport' => $request->transport,
                    'autres_details' => $request->autres_details
                ]
            );
    
            return response()->json(['message' => 'Logistique mise à jour avec succès'], 200);
    
        } catch (\Exception $e) {
            // Retourne l'erreur détaillée si une exception se produit
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Recherche ou création des informations logistiques
        $logistique = Logistique::updateOrCreate(
            ['formation_id' => $request->formation_id],
            [
                'hebergement' => $request->hebergement,
                'transport' => $request->transport,
                'autres_details' => $request->autres_details,
            ]
        );

        return response()->json(['message' => 'Logistique mise à jour avec succès.', 'logistique' => $logistique]);
    }
    public function exportLogistique($id)
{
    // Récupérer la formation
    $formation = Formation::findOrFail($id);

    // Récupérer les formateurs liés à cette formation
    $formateurs = $formation->formateurs; // assure-toi que la relation est définie dans le modèle Formation

    // Récupérer les infos logistiques
    $logistique = Logistique::where('formation_id', $id)->first();

    return response()->json([
        'formation' => [
            'id' => $formation->id,
            'nom' => $formation->titre, // ou name selon ta BDD
        ],
        'formateurs' => $formateurs->map(function ($f) {
            return [
                'nom' => $f->nom,
                'email' => $f->email
            ];
        }),
        'logistique' => [
            'hebergement' => $logistique->hebergement ?? '',
            'transport' => $logistique->transport ?? '',
            'autres_details' => $logistique->autres_details ?? '',
        ],
    ]);
}
public function update(Request $request, $formation_id)
{
    // Validation des autres données envoyées dans la requête
    $validated = $request->validate([
        'hebergement' => 'required|string',
        'transport' => 'required|string',
        'autres_details' => 'nullable|string',
    ]);

    // Recherche la logistique existante ou crée-la si elle n'existe pas
    $logistique = Logistique::updateOrCreate(
        ['formation_id' => $formation_id], // Recherche par formation_id dans l'URL
        [
            'hebergement' => $validated['hebergement'],
            'transport' => $validated['transport'],
            'autres_details' => $validated['autres_details'],
        ]
    );

    // Retourner une réponse JSON
    return response()->json([
        'message' => 'Logistique mise à jour avec succès !',
        'data' => $logistique
    ], 200);
}



    
}


