<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'from', 'to', 'is_justify', 'hours', 'stagiaire_id'];
    protected $hidden = ['created_at', 'updated_at'];
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class)->select(['id', 'year']);
    }
}
