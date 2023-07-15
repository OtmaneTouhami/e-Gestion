<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrateur extends Model
{
    use HasFactory;
    protected $fillable = ['id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function info()
    {
        return $this->belongsTo(User::class, 'id')->select(
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

    public function emplois()
    {
        return $this->hasMany(Emploi::class)->select(['id', 'type', 'date']);
    }
}
