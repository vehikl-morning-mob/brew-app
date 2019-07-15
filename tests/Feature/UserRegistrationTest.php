<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRegistrationTest extends TestCase
{

    use RefreshDatabase;

    public function testAUserCanBeRegisteredWithAnAvatar()
    {
        $this->postJson('/register', [
            'name' => 'Foobar',
            'email' => 'foo@bar.com',
            'avatar' => 'foobarvatar',
            'password' => 'f00b4r1234',
            'password_confirmation' => 'f00b4r1234',
        ]);

        $newUser = User::where('email', 'foo@bar.com')->first();

        $this->assertEquals('Foobar', $newUser->name);
        $this->assertEquals('foobarvatar', $newUser->avatar);
    }
}
