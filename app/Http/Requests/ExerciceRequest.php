<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;

class ExerciceRequest extends FormRequest
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
        $exercice = $this->route('exercice');
        $unique = $exercice ? 'unique:ressources,name,' . $exercice->info->name . ',name' : 'unique:ressources,name';
        $file_exists = $request->hasFile("exercice");
        return [
            "name" => ["bail", "required", $unique, "regex:/^\w+$/", "max:70"],
            "exercice" => $file_exists ? ["bail", "required", "file", "mimes:docx,pdf"] : ["bail", "required"],
            "due_date" => ["bail", "required", "date", "after_or_equal:" . Carbon::today()],
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

            "exercice.required" => "Le champ exercice est obligatoire.",
            "exercice.file" => "Le champ exercice doit être un fichier.",
            "exercice.mimes" => "Le exercice doit être un fichier de types pdf ou word.",

            "module_id.required" => "Le module est obligatoire.",

            'due_date.required' => 'La date d\'échéance est obligatoire.',
            'due_date.date' => 'La date d\'échéance doit être une date valide.',
            'due_date.after_or_equal' => 'La date d\'échéance doit être égale ou postérieure à aujourd\'hui.',

        ];
    }
}
