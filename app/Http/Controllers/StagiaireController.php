<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use App\Models\Stagiaire;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\MyClasses\EmailManager;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StagiaireRequest;
use App\Models\Absence;
use App\Models\Note;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\RedirectResponse;

class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $stagiaires = Stagiaire::with('info','group.filiere')->paginate(9);
        if ($request->has('search')) {
            $search = $request->search;
            $stagiaires = Stagiaire::join("users as u", "u.id", "stagiaires.id")
                ->with('info','group.filiere')
                ->where('firstname', 'LIKE', "%$search%")
                ->orWhere('lastname', 'LIKE', "%$search%")
                ->paginate(9);
        }
        return inertia(
            'App/Admin/Stagiaires/ListStagiaires',
            compact('stagiaires')
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $groupes = Group::getGroups();
        return inertia('App/Admin/Stagiaires/Ajouter', compact('groupes'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StagiaireRequest $request)
    {
        try {
            $avatar_path = "UsersAvatars/stagiaire.png";
            if ($request->hasFile('avatar')) {
                $avatar_path = $request->avatar->store('UsersAvatars');
            }

            $firstname = trim(strtoupper($request->firstname));
            $lastname = trim(strtoupper($request->lastname));
            $password = Str::password(8, true, true, false);


            $user = User::create([
                'firstname' => $firstname,
                'lastname' => $lastname,
                'adresse' => trim($request->adresse),
                'gender' => $request->gender,
                'presonal_email' => strtoupper(trim($request->presonal_email)),
                'telephone' => $request->telephone,
                'avatar' => $avatar_path,
                'birth_date' => $request->birth_date,
                'start_date' => $request->start_date,
                'email' => "$lastname.$firstname@OFPPT-EDU.MA",
                'password' => Hash::make($password),
                'recovery_password' => $password,
            ]);

            Stagiaire::create([
                'id' => $user->id,
                'year' => $request->year,
                'group_id' => $request->group_id
            ]);

            $user->assignRole('stagiaire');


            EmailManager::send(
                name: "$user->lastname $user->firstname",
                to: $user->presonal_email,
                email: $user->email,
                password: $user->recovery_password
            );

            Session::put('message', [
                'success' => true,
                'text' => "Le stagiaire a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {

            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de l'ajout du stagiaire. Veuillez réessayer plus tard.",
            ]);
        }

        return redirect()->route('stagiaires.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Stagiaire $stagiaire)
    {
        $stagiaire = Stagiaire::getStagiaire($stagiaire);
        $groupes = Group::getGroups();
        return inertia(
            'App/Admin/Stagiaires/Stagiaire',
            compact('stagiaire', 'groupes')
        );
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(StagiaireRequest $request, Stagiaire $stagiaire)
    {
        try {

            $user = User::find($stagiaire->id);

            $firstname = trim(strtoupper($request->firstname));
            $lastname = trim(strtoupper($request->lastname));

            $user->update([
                'firstname' => $firstname,
                'lastname' => $lastname,
                'adresse' => trim($request->adresse),
                'gender' => $request->gender,
                'presonal_email' => strtoupper(trim($request->presonal_email)),
                'telephone' => $request->telephone,
                'birth_date' => $request->birth_date,
                'start_date' => $request->start_date,
                'end_date' => $request->end ? $request->end_date : null,
                'email' => "$lastname.$firstname@OFPPT-EDU.MA",
            ]);

            $stagiaire->update([
                'year' => $request->end ? 'graduated' : $request->year,
                'group_id' => $request->group_id,
            ]);

            Session::put('message', [
                'success' => true,
                'text' => "Le stagiaire a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la modification du stagiaire. Veuillez réessayer plus tard.",
            ]);
        }

        return redirect()->route('stagiaires.show', $stagiaire);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $stagiaire)
    {
        try {
            if ($stagiaire->avatar !== "UsersAvatars/stagiaire.png") {
                Storage::delete($stagiaire->avatar);
            }
            Note::where('stagiaire_id', $stagiaire->id)->delete();
            Absence::where('stagiaire_id', $stagiaire->id)->delete();
            $stagiaire->delete();
            Session::put('message', [
                'success' => true,
                'text' => "Le stagiaire a été supprimer avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression du stagiaire. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('stagiaires.index');
    }

    /**
     * Update the image of the student
     *
     * @param Request $request
     * @param Stagiaire $stagiaire
     * @return RedirectResponse
     */
    public function updateAvatar(Request $request, Stagiaire $stagiaire): RedirectResponse
    {
        $request->validate([
            'avatar' => ['bail', 'required', 'file', 'mimes:jpg,png', 'max:10000'],
        ], [
            'avatar.required' => "L'avatar est obligatoire.",
            'avatar.file' => "L'avatar doit être un fichier.",
            'avatar.mimes' => "L'avatar doit être une image png ou jpg.",
            'avatar.max' => "L'avatar ne doit pas dépasser :max kilo-octets.",
        ]);
        try {
            if ($stagiaire->info->avatar !== "UsersAvatars/stagiaire.png") {
                Storage::delete($stagiaire->info->avatar);
            }
            $avatar_path = $request->avatar->store('UsersAvatars');
            $user = User::find($stagiaire->id);
            $user->update(['avatar' => $avatar_path]);

            Session::put('message', [
                'success' => true,
                'text' => "L'image a été modifier avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la modification d'image. Veuillez réessayer plus tard!",
            ]);
        }
        return redirect()->route('stagiaires.show', $stagiaire);
    }

    /**
     * Send autontication data to the student
     *
     * @param User $stagiaire
     * @return void
     */
    public function send_login_data(User $stagiaire)
    {
        try {
            EmailManager::send(
                name: "$stagiaire->lastname $stagiaire->firstname",
                to: $stagiaire->presonal_email,
                email: $stagiaire->email,
                password: $stagiaire->recovery_password
            );
            Session::put('message', [
                'success' => true,
                'text' => "Les données ont été envoyer avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de l'envoi d'email. Veuillez réessayer plus tard!",
            ]);
        }
        return redirect()->route('stagiaires.show', $stagiaire);
    }
}
