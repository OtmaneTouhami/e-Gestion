<?php

namespace App\Rules;

use App\Models\Ressource;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\DataAwareRule;

class FileName implements ValidationRule, DataAwareRule
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

        $type = $this->data['type'];
        $name = $this->data['name'];

        $exists = Ressource::join('emplois as e', "e.id", "ressources.id")
            ->where('type', $type)
            ->where('name', $name)
            ->exists();

        if (in_array('id', array_keys($this->data))) {
            $id = $this->data['id'];
            $exists = Ressource::join('emplois as e', "e.id", "ressources.id")
                ->where('type', $type)
                ->where('name', $name)
                ->where('e.id', "<>", $id)
                ->exists();
        }

        if ($exists) {
            $fail('Ce nom est déjà utilisée.');
        }
    }
}
