<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourRequest;
use App\Models\Cour;
use App\Models\Formateur;
use App\Models\Ressource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class CoursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $formateur = Formateur::find($user->id);
        return inertia("App/Formateur/Cours/ListCours", [
            "modules" => $formateur->modules,
            "cours" => $formateur->cours
        ]);
    }

    public function insert_file($file, $name)
    {
        $extention = $file->getClientOriginalExtension();
        $filename = "$name.$extention";
        $path = $file->storeAs("Cours", $filename);
        return $path;
    }

    public function deleteFile($path)
    {
        Storage::delete($path);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CourRequest $request)
    {
        try {
            $ressource = Ressource::create([
                "name" => trim($request->name),
                "size" => $request->cour->getSize(),
                "path" => $this->insert_file($request->cour, $request->name),
            ]);
            Cour::create([
                "id" => $ressource->id,
                "formateur_id" => auth()->user()->getAuthIdentifier(),
                "module_id" => $request->module_id
            ]);
            Session::put('message', [
                'success' => true,
                'text' => "Le cour a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de l'ajout du cours. Veuillez réessayer plus tard.",
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function change(CourRequest $request, Cour $cour)
    {
        try {
            $path = $request->cour;
            if ($request->hasFile('cour')) {
                $this->deleteFile($cour->info->path);
                $path = $this->insert_file($request->cour, $request->name);
            }
            $ressource = Ressource::find($cour->id);
            $ressource->update([
                "name" => trim($request->name),
                "post_time" => $ressource->post_time,
                "size" => $request->hasFile('cour') ? $request->cour->getSize() : $ressource->size,
                "path" => $path
            ]);
            $cour->update([
                "module_id" => $request->module_id
            ]);
            Session::put('message', [
                'success' => true,
                'text' => "Le cour a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la modification de cour! Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('cours.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ressource $cour)
    {
        try {
            $this->deleteFile($cour->path);
            $cour->delete();
            Session::put('message', [
                'success' => true,
                'text' => "Le cour a été supprimer avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression du cour. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('cours.index');
    }
    public function download_cour(Ressource $cour)
    {
        try {
            return response()
                ->download(storage_path("app/public/$cour->path"));
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la telechargement du cour. Veuillez réessayer plus tard.",
            ]);
        }
    }
}
