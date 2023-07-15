<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    protected $fillable = ['number', 'nb_stagiaires', 'max_nb', 'year', 'filiere_id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function stagiaires()
    {
        return $this->hasMany(Stagiaire::class)->select(['id', 'year']);
    }

    public function formateurs()
    {
        return $this->belongsToMany(Formateur::class, 'formateur_group', 'group_id', 'formateur_id')->withPivot('module_id');
    }

    static function getGroups()
    {
        return self::with('filiere')->get();
    }
}
