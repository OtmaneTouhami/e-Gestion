<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formateur extends Model
{
    use HasFactory;

    protected $fillable = ['id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function info()
    {
        return $this->belongsTo(User::class, 'id')->select(
            "id",
            "firstname",
            "lastname",
            "gender",
            "birth_date",
            "adresse",
            "presonal_email",
            "telephone",
            "email",
            "start_date",
            "end_date",
            "avatar"
        );
    }

    static function getFormateur(self $formateur)
    {
        return self::where('id', $formateur->id)
            ->with('info')
            ->get('id')[0];
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class, 'formateur_module', 'formateur_id', 'module_id');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class)
            ->select(['id', 'nb_stagiaires', 'max_nb']);
    }
    public function cours()
    {
        return $this->hasMany(Cour::class)->with('info');
    }
    public function exercices()
    {
        return $this->hasMany(Exercice::class)->with('info');
    }
}
