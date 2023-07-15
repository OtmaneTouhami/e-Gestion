<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\MyClasses\EmailManager;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::getUsers()->paginate(9);
        if ($request->has('search')) {
            $search = $request->search;
            $users = User::with('roles')
                ->where(function ($query) use ($search) {
                    $query->where('firstname', 'like', "%$search%")
                        ->orWhere('lastname', 'like', "%$search%");
                })
                ->whereNotIn('id', function ($query) {
                    $query->from('stagiaires')->select('id');
                })
                ->whereNotIn('id', function ($query) {
                    $query->from('formateurs')->select('id');
                })->paginate(9);
        }
        return inertia(
            'App/Admin/Users/ListUsers',
            compact('users')
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('App/Admin/Users/Ajouter');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
            $avatar_path = "UsersAvatars/user.png";
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

            Session::put('message', [
                'success' => true,
                'text' => "L'utilisateur a été ajoutée avec succès !",
            ]);
        } catch (\Throwable $th) {

            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de l'ajout d'utilisateur. Veuillez réessayer plus tard.",
            ]);
        }

        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return inertia(
            'App/Admin/Users/User',
            [
                'user' => User::getUser($user)
            ]
        );
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        try {

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
                'text' => "L'utilisateur a été modifier avec succès !",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Une erreur est survenue lors de la modification d'utilisateur. Veuillez réessayer plus tard.",
            ]);
        }

        return redirect()->route('users.show', $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            if ($user->avatar !== "UsersAvatars/user.png") {
                Storage::delete($user->avatar);
            }

            $user->delete();
            Session::put('message', [
                'success' => true,
                'text' => "L'utilisateur a été supprimer avec succès!",
            ]);
        } catch (\Throwable $th) {
            Session::put('message', [
                'success' => false,
                'text' => "Un erreur a été survenue lors de la suppression d'utilisateur. Veuillez réessayer plus tard.",
            ]);
        }
        return redirect()->route('users.index');
    }

    /**
     *  Update the image of the user
     *
     * @param Request $request
     * @param User $user
     * @return RedirectResponse
     */
    public function updateAvatar(Request $request, User $user): RedirectResponse
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
            if ($user->avatar !== "UsersAvatars/user.png") {
                Storage::delete($user->avatar);
            }
            $avatar_path = $request->avatar->store('UsersAvatars');
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
        return redirect()->route('users.show', $user);
    }

    public function send_login_data(User $user)
    {
        try {
            EmailManager::send(
                name: "$user->lastname $user->firstname",
                to: $user->presonal_email,
                email: $user->email,
                password: $user->recovery_password
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
        return redirect()->route('users.show', $user);
    }

    public function toggle_admin(User $user)
    {
        if ($user->hasRole('administrateur')) {
            $user->removeRole('administrateur');
        } else {
            $user->assignRole('administrateur');
        }
    }
}
