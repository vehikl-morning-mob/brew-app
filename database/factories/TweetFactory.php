<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Tweet;
use App\User;
use Faker\Generator as Faker;

$factory->define(Tweet::class, function (Faker $faker) {
    return [
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'message' => $faker->sentence(11),
    ];
});
