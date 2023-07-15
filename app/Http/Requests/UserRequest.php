<?php

namespace App\Http\Requests;

use App\Rules\letters_and_space;
use App\Rules\Phone;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        $user = $this->route('user');
        $unique = $user ? 'unique:users,presonal_email,' . $user->presonal_email . ',presonal_email' : 'unique:users,presonal_email';
        return [
            'firstname' => ['bail', 'required', new letters_and_space, 'max:50'],
            'lastname' => ['bail', 'required', new letters_and_space, 'max:50'],
            'telephone' => ['bail', 'required', new Phone, 'max:13'],
            'presonal_email' => ['bail', 'required', 'email', 'max:100', $unique],
            'adresse' => ['bail', 'required', 'max:255'],
            'birth_date' => ['bail', 'required'],
            'start_date' => ['bail', 'required'],
            'avatar' => ['bail', 'nullable', 'sometimes', 'file', 'mimes:jpg,png', 'max:10000'],
            'gender' => ['bail', 'required'],
        ];
    }
    public function messages()
    {
        return [
            'firstname.required' => 'Le prenom est obligatoire.',
            'firstname.max' => 'Le prenom ne doit pas dépasser :max caractères.',
            'lastname.required' => 'Le nom est obligatoire.',
            'lastname.max' => 'Le nom ne doit pas dépasser :max caractères.',
            'telephone.required' => 'Le numéro de téléphone est obligatoire.',
            'telephone.max' => 'Le numéro de téléphone ne doit pas dépasser :max chiffres.',
            'presonal_email.required' => "L'adresse e-mail est obligatoire.",
            'presonal_email.email' => "L'adresse e-mail doit être au format valide.",
            'presonal_email.max' => "L'adresse e-mail ne doit pas dépasser :max caractères.",
            'presonal_email.unique' => "L'adresse e-mail est déjà utilisée.",
            'adresse.required' => "L'adresse est obligatoire.",
            'adresse.max' => "L'adresse ne doit pas dépasser :max caractères.",
            'avatar.file' => "L'avatar doit être un fichier.",
            'avatar.mimes' => "L'avatar doit être une image png ou jpg.",
            'avatar.max' => "L'avatar ne doit pas dépasser :max kilo-octets.",
            'gender.required' => 'Le genre est obligatoire.',
            'birth_date.required' => 'Le champ de date de naissance est requis.',
            'start_date.required' => 'Le champ de date de debut est requis.',
        ];
    }
}
