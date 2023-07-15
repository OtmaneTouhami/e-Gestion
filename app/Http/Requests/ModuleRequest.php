<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ModuleRequest extends FormRequest
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
        $module = $this->route('module');
        $unique = $module ? 'unique:modules,name,' . $module->name . ',name' : 'unique:modules,name';

        return [
            'name' => ["bail", "required", $unique, "string", "max:100"],
            'nb_hours' => ['bail', 'required', 'numeric', 'min:20', "max:300"],
            'coef' => ['bail', 'required', 'numeric', 'min:1', "max:3"],
            'type' => ['bail', 'required'],
            'year' => ['bail', 'required'],
        ];
    }

    function messages()
    {
        return [
            'name.required' => 'Le champ nom est requis.',
            'name.unique' => 'Ce nom est déjà utilisé.',
            'name.string' => 'Le champ nom doit être une chaîne de caractères.',
            'name.max' => 'Le champ nom ne doit pas dépasser 100 caractères.',

            'nb_hours.required' => 'Le champ nombre d\'heures est requis.',
            'nb_hours.numeric' => 'Le champ nombre d\'heures doit être numérique.',
            'nb_hours.min' => 'Le champ nombre d\'heures doit être au minimum de 20.',
            'nb_hours.max' => 'Le champ nombre d\'heures ne doit pas dépasser 300.',

            'coef.required' => 'Le champ coefficient est requis.',
            'coef.numeric' => 'Le champ coefficient doit être numérique.',
            'coef.min' => 'Le champ coefficient doit être au minimum de 1.',
            'coef.max' => 'Le champ coefficient ne doit pas dépasser 3.',

            'type.required' => 'Le champ type est requis.',

            'year.required' => 'Le champ année est requis.',
        ];
    }
}
