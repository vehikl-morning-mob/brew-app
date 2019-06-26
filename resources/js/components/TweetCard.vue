<template>
    <div class="tweet-card">
        <div class="border-look-alike"/>
        <img class="user-avatar" :src="tweetPayload.avatarUrl">
        <div class="name-and-message">
            <div class="user-name" v-text="tweetPayload.userName"></div>
            <div class="message-container" v-text="tweetPayload.message"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from 'vue-property-decorator';
    import {TweetPayload} from '../types';

    @Component
    export default class TweetCard extends Vue {
        @Prop() protected tweetPayload!: TweetPayload;
    }
</script>

<style scope lang="scss">
    @import '../../sass/variables';

    $_cupHandleDistance: $size-lg;
    $_cupHandleBorderThickness: $size-md/2;
    $_avatarSize: $size-7xl;

    .tweet-card {
        display: flex;
        align-items: center;
        position: relative;
    }

    .name-and-message {
        background-color: $tweetGrey;
        border-radius: $size-lg $size-lg $size-5xl $size-5xl;
        box-shadow: 0 4px 10px 0 hsla(0, 0, 0, 0.1);
        min-height: $size-8xl;
        width: 100%;
        z-index: 2;
        padding: $size-2xl $size-5xl;
    }

    .tweet-card {
        display: flex;
    }

    .card-body {
        height: 100%;
        word-break: break-word;
    }

    img {
        background-color: $tweetGrey;
        height: $_avatarSize;
        clip-path: circle(50%);
        position: absolute;
        top: $_cupHandleDistance + $_cupHandleBorderThickness;
        left: -$_avatarSize/2;
        z-index: 3;
    }

    .border-look-alike {
        background-color: $tweetGrey;
        box-shadow: 0 4px 10px 0 hsla(0, 0, 0, 0.1);
        height: $_avatarSize + $_cupHandleBorderThickness * 2;
        width: $_avatarSize + $_cupHandleBorderThickness * 2;
        border-radius: 50%;
        position: absolute;
        top: $_cupHandleDistance;
        left: -($_avatarSize + $size-md)/2;
        z-index: 1;
    }
</style>
