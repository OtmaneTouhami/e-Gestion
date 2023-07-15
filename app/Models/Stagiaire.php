<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stagiaire extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'year', 'group_id'];
    protected $hidden = ['created_at', 'updated_at'];

    static function getStagiaire(self $stagiaire)
    {
        return self::where('id', $stagiaire->id)
            ->with('info','group.filiere')
            ->get()[0];
    }

    public function info()
    {
        return $this->belongsTo(User::class, 'id')->select(
            'id',
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

    public function absences()
    {
        return $this
            ->hasMany(Absence::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
