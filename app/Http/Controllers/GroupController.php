<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Group;
use App\Models\Filiere;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\GroupRequest;
use Illuminate\Support\Facades\Session;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $groupes = Group::with('filiere')->paginate(10);
        $filieres = Filiere::getFilieres();

        if ($request->has('search')) {
            if ($request->filter) {
                $groupes = Group::where('number', $request->search)
                    ->where('filiere_id', $request->filter)
                    ->with('filiere')
                    ->paginate(10);
            } else {
                $groupes = Group::where('number', $request->search)
                    ->with('filiere')
                    ->paginate(10);
            }
        }

        return Inertia::render('App/Admin/Groupe/ListGroupes', compact('groupes', 'filieres'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(GroupRequest $request)
    {
        try {
            Group::create([
                "number" => $request->number,
                "nb_stagiaires" => $request->nb_stagiaires ? $request->nb_stagiaires : 0,
                "max_nb" => $request->max_nb ? $request->max_nb : 25,
                "year" => $request->year,
                "filiere_id" => $request->filiere_id,
            ]);

            Session::put('message', [
                'success' => true,
                'text' => "Le groupe a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de l'ajout du groupe. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('groupes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $groupe)
    {
        $groupe = Group::with('filiere.modules.formateurs.info', 'formateurs.info')->where('id', $groupe->id)->first();
        return inertia('App/Admin/Groupe/Show', compact('groupe'));
    }

    public function add_formateur(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'formateur_id' => ['required']
        ], [
            'formateur_id.required' => "Le formateur est requis!"
        ]);

        try {
            $formateur_group = DB::table('formateur_group');
            $formateur_group->where([
                ['module_id', $request->module_id],
                ['group_id', $request->group_id],
            ])->delete();
            $formateur_group->insert(
                $request->all()
            );
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de l'affectation du formateur au groupe. Veuillez réessayer plus tard.",
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GroupRequest $request, Group $groupe)
    {
        try {
            $groupe->update([
                "number" => $request->number,
                "nb_stagiaires" => $request->nb_stagiaires ? $request->nb_stagiaires : 0,
                "max_nb" => $request->max_nb ? $request->max_nb : 25,
                "year" => $request->year,
                "filiere_id" => $request->filiere_id,
            ]);

            Session::put('message', [
                'success' => true,
                'text' => "Le groupe a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de la modification du groupe. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('groupes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $groupe)
    {
        try {
            if (Stagiaire::where('group_id', $groupe->id)->exists()) {
                Session::put('message', [
                    'success' => false,
                    'text' => "Impossible de supprimer le groupe car il contient des stagiaires!",
                ]);
            } else {
                $groupe->delete();
                Session::put('message', [
                    'success' => true,
                    'text' => "Le groupe a été supprimer avec succès!",
                ]);
            }
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression du groupe. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('groupes.index');
    }
}
