<?php

namespace App\Http\Requests;

use App\Rules\GroupNumber;
use Illuminate\Foundation\Http\FormRequest;

class GroupRequest extends FormRequest
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
        return [
            'number' => ["bail", "required", new GroupNumber, "numeric", "min:100"],
            'nb_stagiaires' => ['bail', 'nullable', 'sometimes', 'numeric', 'min:20', "max:300"],
            'max_nb' => ['bail', 'nullable', 'sometimes', 'numeric', 'min:20', "max:25"],
            'year' => ['bail', 'required'],
            'filiere_id' => ['bail', 'required'],
        ];
    }
    public function messages()
    {
        return [
            'number.required' => 'Le numéro du groupe est requis.',
            'number.numeric' => 'Le numéro du groupe doit être numérique.',
            'number.min' => 'Le numéro de groupe doit être d\'au moins :min.',
            'nb_stagiaires.numeric' => 'Le nombre de stagiaires doit être numérique.',
            'nb_stagiaires.min' => 'Le nombre de stagiaires doit être d\'au moins :min.',
            'nb_stagiaires.max' => 'Le nombre de stagiaires ne doit pas dépasser :max.',
            'max_nb.numeric' => 'Le nombre maximum ne doit être numérique.',
            'max_nb.min' => 'Le nombre maximum doit être d\'au moins :min.',
            'max_nb.max' => 'Le nombre maximum ne doit pas dépasser :max.',
            'year.required' => 'Le année est requis.',
            'filiere_id.required' => 'La filière est requis.',
        ];
    }
}
