<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExerciceRequest;
use App\Models\Exercice;
use App\Models\Formateur;
use App\Models\Ressource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class ExercicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $formateur = Formateur::find($user->id);
        return inertia("App/Formateur/Exercices/ListExercices", [
            "modules" => $formateur->modules,
            "exercices" => $formateur->exercices
        ]);
    }

    public function insert_file($file, $name)
    {
        $extention = $file->getClientOriginalExtension();
        $filename = "$name.$extention";
        $path = $file->storeAs("Exercices", $filename);
        return $path;
    }

    public function deleteFile($path)
    {
        Storage::delete($path);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(ExerciceRequest $request)
    {
        try {
            $ressource = Ressource::create([
                "name" => trim($request->name),
                "size" => $request->exercice->getSize(),
                "path" => $this->insert_file($request->exercice, $request->name),
            ]);
            Exercice::create([
                "id" => $ressource->id,
                "due_date" => $request->due_date,
                "formateur_id" => auth()->user()->getAuthIdentifier(),
                "module_id" => $request->module_id
            ]);
            Session::put('message', [
                'success' => true,
                'text' => "L'exercice a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de l'ajout d'exercice. Veuillez réessayer plus tard.",
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function change(ExerciceRequest $request, Exercice $exercice)
    {
        try {
            $path = $request->exercice;
            if ($request->hasFile('exercice')) {
                $this->deleteFile($exercice->info->path);
                $path = $this->insert_file($request->exercice, $request->name);
            }
            $ressource = Ressource::find($exercice->id);
            $ressource->update([
                "name" => trim($request->name),
                "post_time" => $ressource->post_time,
                "size" => $request->hasFile('exercice') ? $request->exercice->getSize() : $ressource->size,
                "path" => $path
            ]);
            $exercice->update([
                "due_date" => $request->due_date,
                "module_id" => $request->module_id
            ]);
            Session::put('message', [
                'success' => true,
                'text' => "L'exercice a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la modification d'exercice! Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('exercices.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ressource $exercice)
    {
        try {
            $this->deleteFile($exercice->path);
            $exercice->delete();
            Session::put('message', [
                'success' => true,
                'text' => "L'exercice a été supprimer avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression d'exercice. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('exercices.index');
    }
    public function download_exercice(Ressource $exercice)
    {
        try {
            return response()
                ->download(storage_path("app/public/$exercice->path"));
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la telechargement d'exercice. Veuillez réessayer plus tard.",
            ]);
        }
    }
}
