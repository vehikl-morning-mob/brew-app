<?php

namespace Tests\Feature;

use App\Tweet;
use App\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TweetApiTest extends TestCase
{
    use RefreshDatabase;

    public function testATweetCanBeCreated()
    {
        $user = factory(User::class)->create();

        $startAmountOfTweets = Tweet::count();
        $response = $this->postJson('/api/tweet', [
            'user_id' => $user->id,
            'message' => 'Hello World',
        ]);

        $response->assertSuccessful();
        $this->assertEquals($startAmountOfTweets + 1, Tweet::count());
    }

    public function testItRejectsEmptyTweets()
    {
        $user = factory(User::class)->create();

        $response = $this->postJson('/api/tweet', [
            'user_id' => $user->id,
            'message' => '',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function testItRejectsTweetsGreaterThanMaxLength()
    {
        $user = factory(User::class)->create();

        $response = $this->postJson('/api/tweet', [
            'user_id' => $user->id,
            'message' => Str::random(121),
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
