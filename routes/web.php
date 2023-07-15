<?php

use App\Http\Controllers\CoursController;
use App\Http\Controllers\EmploiController;
use App\Http\Controllers\ExercicesController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\ModuleController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\ShowEmploiController;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', RedirectController::class)->name('redirect');

Route::get('/clear-session', function () {
    Session::put('message', null);
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', fn () => inertia('App/Admin/Home', [
        'user' => Auth::user(),
    ]))->name('home.admin');

    Route::post('formateurs/add-module', [FormateurController::class, 'add_module'])->name('formateurs.module');
    Route::resource('formateurs', FormateurController::class);
    Route::post('formateurs/{formateur}', [FormateurController::class, "updateAvatar"])
        ->name('formateurs.avatar');
    Route::post('formateurs/send/{formateur}', [FormateurController::class, "send_login_data"])
        ->name('formateurs.send');
    Route::delete('formateurs/module/{formateur_id}/{module_id}', [FormateurController::class, 'del_module'])->name('formateurs.delModule');

    Route::resource('filieres', FiliereController::class);
    Route::post('filieres/add-module', [FiliereController::class, 'add_module'])->name('filieres.module');
    Route::delete('filieres/module/{filier_id}/{module_id}', [FiliereController::class, 'del_module'])->name('filieres.delModule');

    Route::resource('modules', ModuleController::class);

    Route::post('groupes/add_formateur', [GroupController::class, 'add_formateur'])->name('groupes.formateur');
    Route::resource('groupes', GroupController::class);

    Route::resource('emplois', EmploiController::class);
    Route::post('emplois/change/{emploi}', [EmploiController::class, 'change'])->name('change');

    Route::resource('stagiaires', StagiaireController::class);
    Route::post('stagiaires/{stagiaire}', [StagiaireController::class, "updateAvatar"])
        ->name('stagiaires.avatar');
    Route::post('stagiaires/send/{stagiaire}', [StagiaireController::class, "send_login_data"])
        ->name('stagiaires.send');

    Route::resource('users', UserController::class);
    Route::post('users/{user}', [UserController::class, "updateAvatar"])
        ->name('users.avatar');
    Route::post('users/send/{user}', [UserController::class, "send_login_data"])
        ->name('users.send');
    Route::post('users/admin/{user}', [UserController::class, "toggle_admin"])
        ->name('users.admin');
});


Route::middleware(['auth', 'formateur'])->group(function () {
    Route::get('/acceuil', fn () => inertia('App/Formateur/Home', [
        'user' => Auth::user(),
    ]))->name('home.formateur');

    Route::get('/show-emplois-formateurs', [ShowEmploiController::class, 'emploi_formateur'])
        ->name('emplois.formateur');

    Route::resource('cours', CoursController::class);
    Route::post('cours/change/{cour}', [CoursController::class, 'change'])->name('change.cour');

    Route::resource('exercices', ExercicesController::class);
    Route::post('exercices/change/{exercice}', [ExercicesController::class, 'change'])->name('change.exercice');
});


Route::middleware(['auth', 'stagiaire'])->group(function () {
    Route::get('/home', fn () => inertia('App/Stagiaire/Home', [
        'user' => Auth::user(),
    ]))->name('home.stagiaire');
});

Route::get('emplois/download/{emploi}', [EmploiController::class, 'download_emploi'])
    ->name("emplois.download")->middleware('auth');

Route::get('cours/download/{cour}', [CoursController::class, 'download_cour'])
    ->name("cour.download")->middleware('auth');

Route::get('exercices/download/{exercice}', [ExercicesController::class, 'download_exercice'])
    ->name("exercice.download")->middleware('auth');

require __DIR__ . '/auth.php';
