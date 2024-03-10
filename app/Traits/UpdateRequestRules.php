<?php

namespace App\Traits;

trait UpdateRequestRules
{
    protected function applyUpdateRules(&$rules)
    {
        $rules = array_map(function ($rule) {
            return str_replace('required', 'sometimes', $rule);
        }, $rules);
        return $rules;
    }
}
