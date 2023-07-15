<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "firstname",
        "lastname",
        "gender",
        "birth_date",
        "adresse",
        "presonal_email",
        "email",
        "telephone",
        "password",
        "recovery_password",
        "start_date",
        "end_date",
        "avatar"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        "recovery_password",
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function stagiaires()
    {
        $this->hasMany(Stagiaire::class, 'id');
    }
    public function formateurs()
    {
        $this->hasMany(Formateur::class, 'id');
    }

    static function getUsers()
    {
        return self::with('roles')
            ->whereNotIn('id', function ($query) {
                $query->select('id')->from('stagiaires');
            })
            ->whereNotIn('id', function ($query) {
                $query->select('id')->from('formateurs');
            });
    }

    static function getUser(self $user)
    {
        return self::where('id', $user->id)
            ->with('roles')
            ->get()[0];
    }
}
