<?php

namespace App\Http\Controllers;

use App\Models\Emploi;
use App\Models\Ressource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\EmploiRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class EmploiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $emplois = Emploi::getEmplois();
        return inertia("App/Admin/Emplois/ListEmplois", compact("emplois"));
    }

    public function insert_file($file, $name, $type)
    {
        $path = "";
        $extention = $file->getClientOriginalExtension();
        $filename = $name . "_$type.$extention";
        if ($type === "formateurs") {
            $path = $file->storeAs("EmploisFormateur", $filename);
        } else {
            $path = $file->storeAs("EmploisStagiaire", $filename);
        }
        return $path;
    }

    public function deleteFile($path)
    {
        Storage::delete($path);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(EmploiRequest $request)
    {
        try {
            $ressource = Ressource::create([
                "name" => trim($request->name),
                "size" => $request->emploi->getSize(),
                "path" => $this->insert_file($request->emploi, $request->name, $request->type),
            ]);
            Emploi::create([
                "id" => $ressource->id,
                "date" => $request->date,
                "type" => $request->type
            ]);
            Session::put('message', [
                'success' => true,
                'text' => "L'emploi a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de l'ajout d'emploi. Veuillez réessayer plus tard.",
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function change(EmploiRequest $request, Emploi $emploi)
    {
        try {
            $path = $request->emploi;
            if ($request->hasFile('emploi')) {
                $this->deleteFile($emploi->info->path);
                $path = $this->insert_file($request->emploi, $request->name, $request->type);
            }
            $ressource = Ressource::find($emploi->id);
            $ressource->update([
                "name" => trim($request->name),
                "post_time" => $ressource->post_time,
                "size" => $request->hasFile('emploi') ? $request->emploi->getSize() : $ressource->size,
                "path" => $path
            ]);
            $emploi->update([
                "date" => $request->date,
                "type" => $request->type
            ]);
            Session::put('message', [
                'success' => true,
                'text' => "L'emploi a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la modification d'emploi! Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('emplois.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ressource $emploi)
    {
        try {
            $this->deleteFile($emploi->path);
            $emploi->delete();
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
        return redirect()->route('emplois.index');
    }

    public function download_emploi(Ressource $emploi)
    {
        try {
            return response()
                ->download(storage_path("app/public/$emploi->path"));
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la telechargement d'emploi. Veuillez réessayer plus tard.",
            ]);
        }
    }
}
