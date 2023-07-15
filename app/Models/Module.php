<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'nb_hours', 'type', 'coef', 'year'];
    protected $hidden = ['created_at', 'updated_at'];
    public function cour()
    {
        return $this->hasOne(Cour::class)->select(['id']);
    }

    public function exercices()
    {
        return $this->hasMany(Exercice::class)->select(['id', 'due_date']);
    }

    public function filieres()
    {
        return $this->belongsToMany(Filiere::class, 'module_filiere', 'module_id', 'filiere_id');
    }

    public function formateurs()
    {
        return $this->belongsToMany(Formateur::class, 'formateur_module', 'module_id', 'formateur_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class)->select(['id', 'note', 'controle_type']);
    }
}
