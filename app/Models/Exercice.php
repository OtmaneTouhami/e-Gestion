<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'due_date', 'formateur_id', 'module_id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function info()
    {
        return $this->belongsTo(Ressource::class,'id');
    }
    

    public function module()
    {
        return $this->belongsTo(Module::class)->select(['id', 'name', 'nb_hours', 'type', 'coef']);
    }

}
