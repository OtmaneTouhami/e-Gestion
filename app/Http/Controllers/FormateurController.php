<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Module;
use App\Models\Formateur;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\MyClasses\EmailManager;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\FormateurRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class FormateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $formateurs = Formateur::with('info')->select('id')->paginate(9);
        if ($request->has('search')) {
            $search = $request->search;
            $query = Formateur::join("users as u", "u.id", "formateurs.id")
                ->with('info')
                ->select('formateurs.id')
                ->where('firstname', 'LIKE', "%$search%")
                ->orWhere('lastname', 'LIKE', "%$search%");
            $formateurs = match ($request->filter) {
                "male" => $query->where('gender', 'male')->paginate(9),
                "female" => $query->where('gender', 'female')->paginate(9),
                "in" => $query->whereNull('end_date')->paginate(9),
                "out" => $query->whereNotNull('end_date')->paginate(9),
                default => $query->paginate(9)
            };
        }
        return inertia(
            'App/Admin/Formateurs/ListFormateurs',
            [
                'formateurs' => $formateurs
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('App/Admin/Formateurs/Ajouter');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormateurRequest $request): RedirectResponse
    {
        try {
            $avatar_path = "UsersAvatars/formateur.png";
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

            Formateur::create([
                'id' => $user->id,
            ]);

            $user->assignRole('formateur');


            EmailManager::send(
                name: "$user->lastname $user->firstname",
                to: $user->presonal_email,
                email: $user->email,
                password: $user->recovery_password
            );

            Session::put('message', [
                'success' => true,
                'text' => "Le formateur a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {

            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de l'ajout du formateur. Veuillez réessayer plus tard.",
            ]);
        }

        return redirect()->route('formateurs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Formateur $formateur)
    {

        return inertia(
            'App/Admin/Formateurs/Formateur',
            [
                'formateur' => $formateur->with('modules','info')->where('id', $formateur->id)->first(),
                'modules' =>  Module::whereNotIn('id', function ($query) use ($formateur) {
                    $query->select('module_id')->from('formateur_module')->where('formateur_id', $formateur->id);
                })
                    ->get()
            ]
        );
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(FormateurRequest $request, Formateur $formateur): RedirectResponse
    {
        try {

            $user = User::find($formateur->id);

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

            Session::put('message', [
                'success' => true,
                'text' => "Le formateur a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la modification du formateur. Veuillez réessayer plus tard.",
            ]);
        }

        return redirect()->route('formateurs.show', $formateur);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $formateur): RedirectResponse
    {
        try {
            if ($formateur->avatar !== "UsersAvatars/formateur.png") {
                Storage::delete($formateur->avatar);
            }
            DB::table('formateur_group')->where('formateur_id', $formateur->id)->delete();
            DB::table('formateur_module')->where('formateur_id', $formateur->id)->delete();
            $formateur->delete();
            Session::put('message', [
                'success' => true,
                'text' => "Le formateur a été supprimer avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression du formateur. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('formateurs.index');
    }

    /**
     * Update the image of the teacher
     *
     * @param Request $request
     * @param Formateur $formateur
     * @return RedirectResponse
     */
    public function updateAvatar(Request $request, Formateur $formateur): RedirectResponse
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
            if ($formateur->info->avatar !== "UsersAvatars/formateur.png") {
                Storage::delete($formateur->info->avatar);
            }
            $avatar_path = $request->avatar->store('UsersAvatars');
            $user = User::find($formateur->id);
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
        return redirect()->route('formateurs.show', $formateur);
    }

    public function send_login_data(User $formateur)
    {
        try {
            EmailManager::send(
                name: "$formateur->lastname $formateur->firstname",
                to: $formateur->presonal_email,
                email: $formateur->email,
                password: $formateur->recovery_password
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
        return redirect()->route('formateurs.show', $formateur);
    }

    public function add_module(Request $request)
    {
        $request->validate([
            'module_id' => ['required']
        ], [
            'module_id.required' => "Le module est requis!"
        ]);

        try {
            DB::table('formateur_module')->insert(
                $request->all()
            );
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de l'affectation du moddule au formateur. Veuillez réessayer plus tard.",
            ]);
        }
    }

    public function del_module($formateur_id, $module_id)
    {
        try {
            DB::table('formateur_module')
                ->where('formateur_id', $formateur_id)
                ->where('module_id', $module_id)
                ->delete();
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur a été survenue lors de la suppresion du module. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('formateurs.show', $formateur_id);
    }
}
