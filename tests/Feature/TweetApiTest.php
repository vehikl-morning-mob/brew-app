<?php

namespace Tests\Feature;

use App\Tweet;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TweetApiTest extends TestCase
{
    use RefreshDatabase;

    public function testATweetCanBeCreated()
    {
        $user = factory(User::class)->create();

        $startAmountOfTweets = Tweet::count();
        $response = $this->post('/api/tweet', [
            'user_id' => $user->id,
            'message' => 'Hello World',
        ]);

        $response->assertSuccessful();
        $this->assertEquals($startAmountOfTweets + 1, Tweet::count());
    }
}
