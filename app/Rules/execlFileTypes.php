<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class execlFileTypes implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $types = ["xlsx", "xls", "xlsm", "xlsb", "csv"];
        $file_extention = $value->getClientOriginalExtension();
        if (!in_array($file_extention, $types)) {
            $fail("Le champ :attribute doit être au format xlsx, xls, xlsm, xlsb ou csv.");
        }
    }
}
