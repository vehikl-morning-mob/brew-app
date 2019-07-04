<?php

namespace Tests\Feature;

use App\Tweet;
use App\User;
use Illuminate\Foundation\Testing\TestResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TweetApiTest extends TestCase
{
    use RefreshDatabase;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = factory(User::class)->create();
    }

    public function testATweetCanBeCreated()
    {
        $startAmountOfTweets = Tweet::count();
        $response = $this->postNewTweet('hello world');

        $response->assertSuccessful();
        $this->assertEquals($startAmountOfTweets + 1, Tweet::count());
    }

    public function testItRejectsEmptyTweets()
    {
        $response = $this->postNewTweet('');

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function testItRejectsTweetsGreaterThanMaxLength()
    {
        $maxChars = config('tweetRules.maxCharCount');

        $response = $this->postNewTweet(Str::random($maxChars + 1));

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function postNewTweet($message): TestResponse
    {
        return $this->actingAs($this->user)->postJson('/tweet', ['message' => $message]);
    }
}
