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

        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertEquals($startAmountOfTweets + 1, Tweet::count());
    }

    public function testItReturnsNewlyCreatedTweetDataOnSuccess()
    {
        $response = $this->postNewTweet('hello world');

        $response->assertJson(['message' => 'hello world', 'avatarUrl' => '', 'userName' => $this->user->name]);
    }

    public function testAGuestCannotCreateATweet()
    {
        $response = $this->postJson('/tweet', ['message' => 'Hello world']);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
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

    public function testItGetsAllTweets()
    {
        $tweetA = $this->postNewTweet('hello world A');
        $tweetB = $this->postNewTweet('hello world B');

        $response = $this->get('/tweet');

        $response->assertJsonCount(2);
    }

    private function postNewTweet($message): TestResponse
    {
        return $this->actingAs($this->user)->postJson('/tweet', ['message' => $message]);
    }

}
