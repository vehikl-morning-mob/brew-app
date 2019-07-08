@extends('layouts.app')
@section('content')
    <twitter-app :min-tweet-length="{{ $minTweetLength }}"
                 :max-tweet-length="{{ $maxTweetLength }}"
    ></twitter-app>
@endsection
