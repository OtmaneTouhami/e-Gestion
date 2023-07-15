<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;
    protected $fillable = ["libelle", "code", "year"];
    protected $hidden = ['created_at', 'updated_at'];

    public function groups()
    {
        return $this->hasMany(Group::class);
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class,'module_filiere','filiere_id','module_id');
    }

    static function getFilieres()
    {
        return self::all();
    }
}
