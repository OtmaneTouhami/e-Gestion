<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    protected $fillable = ['note', 'controle_type', 'module_id', 'stagiaire_id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function module()
    {
        return $this->belongsTo(Module::class)
            ->select(['id', 'name', 'nb_hours', 'type', 'coef', 'year']);
    }

    public function stagiaire(){
        return $this->belongsTo(Stagiaire::class);
    }
}
