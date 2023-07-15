<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $user = Auth::user();
        if ($user->hasRole('administrateur')) {
            return redirect()->route('home.admin');
        } elseif ($user->hasRole('formateur')) {
            return redirect()->route('home.formateur');
        } else {
            return redirect()->route('home.stagiaire');
        }
    }
}
