<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Filiere;
use Illuminate\Http\Request;
use App\Http\Requests\FiliereRequest;
use App\Http\Requests\ModuleRequest;
use App\Models\Module;
use App\Models\Note;
use App\Models\Ressource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $modules = Module::paginate(10);

        if ($request->has('search')) {
            $modules = Module::where('name', 'LIKE', "%$request->search%")->paginate(10);
        }

        return Inertia::render('App/Admin/Modules/ListModules', compact('modules'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ModuleRequest $request)
    {
        try {
            Module::create([
                "name" => trim(ucwords($request->name)),
                "nb_hours" => $request->nb_hours,
                "coef" => $request->coef,
                "year" => $request->year,
                "type" => $request->type,
            ]);

            Session::put('message', [
                'success' => true,
                'text' => "Le module a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de l'ajout du module. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('modules.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Filiere $module)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ModuleRequest $request, Module $module)
    {
        try {
            $module->update([
                "name" => trim(ucwords($request->name)),
                "nb_hours" => $request->nb_hours,
                "coef" => $request->coef,
                "year" => $request->year,
                "type" => $request->type,
            ]);

            Session::put('message', [
                'success' => true,
                'text' => "Le module a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de la modification du module. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('modules.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        try {

            DB::table('module_filiere')->where('module_id', $module->id)->delete();
            DB::table('formateur_module')->where('module_id', $module->id)->delete();
            Note::where('module_id', $module->id)->delete();
            Ressource::join('cours as c', "c.id", "ressources.id")
                ->join('exercices as e', "e.id", "ressources.id")
                ->where("c.module_id", $module->id)
                ->orWhere("e.module_id", $module->id)
                ->delete();
            $module->delete();
            Session::put('message', [
                'success' => true,
                'text' => "Le module a été supprimer avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression du module. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('modules.index');
    }
}
