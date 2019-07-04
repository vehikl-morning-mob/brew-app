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
    protected $user;

    public function testATweetCanBeCreated()
    {
        $startAmountOfTweets = Tweet::count();
        $response = $this->actingAs($this->user)->postJson('/tweet', ['message' => 'hello world']);

        $response->assertSuccessful();
        $this->assertEquals($startAmountOfTweets + 1, Tweet::count());
    }

    public function testItRejectsEmptyTweets()
    {
        $response = $this->postJson('/tweet', $this->generateTweetParams(['message' => '']));

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function testItRejectsTweetsGreaterThanMaxLength()
    {
        $maxChars = config('tweetRules.maxCharCount');

        $response = $this->postJson('/tweet',
            $this->generateTweetParams(['message' => Str::random($maxChars + 1)]));

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function testItRejectsTweetFromInvalidUserId()
    {
        $response = $this->postJson('/tweet', $this->generateTweetParams(['user_id' => 1234]));

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function generateTweetParams($override = [])
    {
        $validTweetParams = [
            'user_id' => $this->user->id,
            'message' => 'Tacos Tacos Tacos',
        ];

        return array_merge($validTweetParams, $override);
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = factory(User::class)->create();
    }
}
