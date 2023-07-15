<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emploi extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'type', 'date'];
    protected $hidden = ['created_at', 'updated_at'];

    public function info()
    {
        return $this->belongsTo(Ressource::class, 'id');
    }

    static function getEmplois()
    {
        return self::with('info')->latest()->get();
    }
}
