<?php

namespace App\Http\Controllers;

use App\Models\Emploi;
use Illuminate\Http\Request;

class ShowEmploiController extends Controller
{
    public function emploi_formateur()
    {
        $emplois = Emploi::with('info')->where('type', 'formateurs')->latest()->get();
        return inertia("App/Formateur/Emplois", compact("emplois"));
    }
}
