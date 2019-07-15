<?php

namespace App\Http\Controllers;

use App\Tweet;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTweetRequest;
use Illuminate\Http\Response;

class TweetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allTweets = Tweet::orderBy('id', 'DESC')->get()->map(function ($tweetItem) {
            return [
                'userName' => $tweetItem->user->name,
                'avatar' => '',
                'message' => $tweetItem->message,
            ];
        });

        return response($allTweets, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTweetRequest $request)
    {
        $newTweet = $request->user()->tweets()->create($request->validated());
        return response([
            'message' => $newTweet->message,
            'avatar' => '',
            'userName' => $newTweet->user->name,
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
