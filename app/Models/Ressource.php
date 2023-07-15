<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ressource extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'post_time', 'size', 'path'];
    protected $hidden = ['created_at', 'updated_at'];
}
