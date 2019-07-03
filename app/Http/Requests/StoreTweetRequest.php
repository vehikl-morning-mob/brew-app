<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTweetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $maxChars = config('tweetRules.maxCharCount');
        $minChars = config('tweetRules.minCharCount');

        return [
            'user_id' => 'exists:users,id',
            'message' => "min:$minChars|max:$maxChars",
        ];
    }
}
