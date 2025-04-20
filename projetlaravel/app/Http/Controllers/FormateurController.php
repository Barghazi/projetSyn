<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use Illuminate\Http\Request;

class FormateurController extends Controller
{
    public function index()
    {
        return response()->json(Formateur::all());
    }
}
