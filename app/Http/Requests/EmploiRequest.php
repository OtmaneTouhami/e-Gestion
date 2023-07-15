<?php

namespace App\Http\Requests;

use App\Rules\execlFileTypes;
use App\Rules\FileName;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class EmploiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(Request $request): array
    {
        $file_exists = $request->hasFile("emploi");
        return [
            "name" => ["bail", "required", "string", "regex:/^Semaine_\d+$/", new FileName, "max:70"],
            "emploi" => $file_exists ? ["bail", "required", "file", new execlFileTypes] : ["bail", "required"],
            "date" => ["bail", "required", "date"],
            "type" => ["required"]
        ];
    }
    public function messages()
    {
        return [
            "name.required" => "Le champ nom est obligatoire.",
            "name.string" => "Le champ nom doit être une chaîne de caractères.",
            "name.max" => "Le champ nom ne doit pas dépasser :max caractères.",
            'name.regex' => "Le nom doit être à la forme suivante : Semaine_1.",

            "emploi.required" => "Le champ emploi est obligatoire.",
            "emploi.file" => "Le champ emploi doit être un fichier.",

            "date.required" => "Le champ date est obligatoire.",
            "date.date" => "Le champ date doit être une date valide.",

            "type.required" => "Le champ type est obligatoire.",
        ];
    }
}
