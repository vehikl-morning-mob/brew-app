<?php

namespace Tests\Feature;

use App\Tweet;
use App\User;
use Illuminate\Foundation\Testing\TestResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
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

        $response->assertJson([
            'message' => 'hello world',
            'avatar' => $this->user->avatar,
            'userName' => $this->user->name,
        ]);
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
        $numberOfTweets = 5;
        factory(Tweet::class, $numberOfTweets)->create(['user_id' => $this->user->id]);

        $response = $this->get('/tweet');

        $response->assertJsonCount($numberOfTweets);
    }

    public function testItOrdersTweetsByNewerFirst()
    {
        $messagesInDescendingOrder = factory(Tweet::class, 5)
            ->create(['user_id' => $this->user->id])
            ->sortByDesc('id')
            ->pluck('message')
            ->toArray();

        $response = $this->get('/tweet');
        $givenMessages = Arr::pluck($response->json(), 'message');

        $this->assertEquals($messagesInDescendingOrder, $givenMessages);
    }

    public function testItPaginatesTweets()
    {
        $tweetCountPerPage = 12;
        factory(Tweet::class, $tweetCountPerPage * 5)->create();

        $response = $this->get('/tweet');
        $this->assertCount($tweetCountPerPage, $response->json());
    }

    private function postNewTweet($message): TestResponse
    {
        return $this->actingAs($this->user)->postJson('/tweet', ['message' => $message]);
    }

}
