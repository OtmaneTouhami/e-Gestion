<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;

class CourRequest extends FormRequest
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
        $cour = $this->route('cour');
        $unique = $cour ? 'unique:ressources,name,' . $cour->info->name . ',name' : 'unique:ressources,name';
        $file_exists = $request->hasFile("cour");
        return [
            "name" => ["bail", "required", $unique, "regex:/^\w+$/", "max:70"],
            "cour" => $file_exists ? ["bail", "required", "file", "mimes:docx,pdf"] : ["bail", "required"],
            "module_id" => ["bail", "required"],
        ];
    }
    public function messages()
    {
        return [
            "name.required" => "Le champ nom est obligatoire.",
            "name.max" => "Le champ nom ne doit pas dépasser :max caractères.",
            'name.regex' => "Le nom doit être sans espaces.",
            'name.unique' => "Ce nom exist déja.",

            "cour.required" => "Le champ cour est obligatoire.",
            "cour.file" => "Le champ cour doit être un fichier.",
            "cour.mimes" => "Le cour doit être un fichier de types pdf ou word.",

            "module_id.required" => "Le module est obligatoire.",
        ];
    }
}
