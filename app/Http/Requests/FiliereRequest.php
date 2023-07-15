<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FiliereRequest extends FormRequest
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
    public function rules(): array
    {
        $filiere = $this->route('filiere');
        $unique_libelle = $filiere ? 'unique:filieres,libelle,' . $filiere->libelle . ',libelle' : 'unique:filieres,libelle';
        $unique_code = $filiere ? 'unique:filieres,code,' . $filiere->code . ',code' : 'unique:filieres,code';

        return [
            'libelle' => ["bail", "required", $unique_libelle, "string", "max:100"],
            'code' => ["bail", "required", $unique_code, "string", "max:8"],
            'year' => ["required"]
        ];
    }

    function messages()
    {
        return [
            'libelle.required' => "Le champ libellé est obligatoire.",
            'libelle.unique' => "Le libellé existe déjà.",
            'libelle.string' => "Le champ libellé doit être une chaîne de caractères.",
            'libelle.max' => "Le libellé ne doit pas dépasser :max caractères.",

            'code.required' => "Le champ code est obligatoire.",
            'code.unique' => "Le code existe déjà.",
            'code.string' => "Le champ code doit être une chaîne de caractères.",
            'code.max' => "Le code ne doit pas dépasser :max caractères.",

            "year.required" => "L'année est obligatoire."
        ];
    }
}
