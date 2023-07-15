<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\Group;
use App\Models\Module;
use App\Models\Filiere;
use Inertia\Middleware;
use App\Models\Formateur;
use App\Models\Stagiaire;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'message' => fn () => session()->get('message')
            ],
            'counts' => [
                'nbFormateurs' => Formateur::count(),
                'nbFilieres' => Filiere::count(),
                'nbModules' => Module::count(),
                'nbGroups' => Group::count(),
                'nbStagiaires' => Stagiaire::count(),
                'nbUsers' => User::getUsers()->count(),
            ]
        ]);
    }
}
