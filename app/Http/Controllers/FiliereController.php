<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Filiere;
use Illuminate\Http\Request;
use App\Http\Requests\FiliereRequest;
use App\Models\Group;
use App\Models\Module;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class FiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filieres = Filiere::paginate(10);

        if ($request->has('search')) {
            $search = $request->search;
            $filter = $request->filter;
            if ($filter) {
                $filieres = Filiere::where($filter, 'LIKE', "%$search%");
            } else {
                $filieres = Filiere::where('libelle', 'LIKE', "%$search%")->orWhere('code', 'LIKE', "%$search%");
            }
            $filieres = $filieres->paginate(10);
        }

        return Inertia::render('App/Admin/Filieres/ListFilieres', compact('filieres'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FiliereRequest $request)
    {
        try {
            Filiere::create([
                "libelle" => trim(ucwords($request->libelle)),
                "code" => trim(strtoupper($request->code)),
                "year" => $request->year
            ]);

            Session::put('message', [
                'success' => true,
                'text' => "La filière a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de l'ajout du filière. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('filieres.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Filiere $filiere)
    {
        $filiere = $filiere->with('groups', 'modules')->where('id', $filiere->id)->first();
        $modules = Module::whereIn('year', [$filiere->year, 'both'])
            ->whereNotIn('id', function ($query) use ($filiere) {
                $query->select('module_id')->from('module_filiere')->where('filiere_id', $filiere->id);
            })
            ->get();
        return Inertia::render('App/Admin/Filieres/Show', compact('filiere', 'modules'));
    }

    public function add_module(Request $request)
    {
        $request->validate([
            'module_id' => ['required']
        ], [
            'module_id.required' => "Le module est requis!"
        ]);

        try {
            DB::table('module_filiere')->insert(
                $request->all()
            );
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de l'ajout du moddule au filière. Veuillez réessayer plus tard.",
            ]);
        }
    }

    public function del_module($filiere_id, $module_id)
    {
        try {
            DB::table('module_filiere')
                ->where('filiere_id', $filiere_id)
                ->where('module_id', $module_id)
                ->delete();
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de la suppresion du module. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('filieres.show', $filiere_id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FiliereRequest $request, Filiere $filiere)
    {
        try {
            $filiere->update([
                "libelle" => trim(ucwords($request->libelle)),
                "code" => trim(strtoupper($request->code)),
                "year" => $request->year
            ]);

            Session::put('message', [
                'success' => true,
                'text' => "La filière a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de la modification du filière. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('filieres.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filiere $filiere)
    {
        try {
            if (Group::where('filiere_id', $filiere->id)->exists()) {
                Session::put('message', [
                    'success' => false,
                    'text' => "La filière que vous voulez supprimer appartient à un groupe existant.",
                ]);
            } else {
                DB::table('module_filiere')->where('filiere_id', $filiere->id)->delete();
                $filiere->delete();
                Session::put('message', [
                    'success' => true,
                    'text' => "La filière a été supprimer avec succès!",
                ]);
            }
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression du filière. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('filieres.index');
    }
}
