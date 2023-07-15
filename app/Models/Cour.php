<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cour extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'module_id', 'formateur_id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function info()
    {
        return $this->belongsTo(Ressource::class, 'id');
    }

    public function module()
    {
        return $this->belongsTo(Module::class)->select(['id', 'name', 'nb_hours', 'type', 'coef']);
    }
}
