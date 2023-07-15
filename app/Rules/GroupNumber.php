<?php

namespace App\Rules;

use App\Models\Group;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\DataAwareRule;

class GroupNumber implements ValidationRule, DataAwareRule
{

    protected $data = [];

    /**
     * Set the data under validation.
     *
     * @param  array  $data
     * @return $this
     */

    public function setData(array $data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        $filiere_id = $this->data['filiere_id'];
        $exists = Group::where('number', $value)->where('filiere_id', $filiere_id)->exists();
        
        if (in_array('id', array_keys($this->data))) {
            $id = $this->data['id'];
            $exists = Group::where('number', $value)
                ->where('filiere_id', $filiere_id)
                ->where('id', "<>", $id)->exists();
        }

        if ($exists) {
            $fail('Il y a déjà un autre groupe avec ce nombre dans cette filière.');
        }
    }
}
