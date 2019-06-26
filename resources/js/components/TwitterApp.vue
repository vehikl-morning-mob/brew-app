<template>
    <div class="twitter-app">
        <div class="brown">
            <h1>Brew.</h1>
            <tweet-input-box @new-tweet="onNewTweetCreated"/>
        </div>
        <tweet-feed :tweet-payloads="tweetPayloads"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TweetInputBox from "./TweetInputBox.vue";
    import TweetFeed from "./TweetFeed.vue";
    import {TweetPayload} from '../types';

    @Component({
        components: {TweetFeed, TweetInputBox}
    })
    export default class TwitterApp extends Vue {
        protected tweetPayloads: TweetPayload[] = [];

        protected onNewTweetCreated(message: string): void {
            const tweetPayload: TweetPayload = {
                message,
                avatarUrl: `https://robohash.org/${message}?set=set4`,
                userName: 'You'
            };

            this.tweetPayloads.unshift(tweetPayload);
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/variables";

    .twitter-app {
        max-width: 600px;
        margin: 0 auto;
        background-color: $grey;
        height: 100vh;
    }

    .brown {
        background: $coffeeBrown;
        padding: $size-md;
    }

    h1 {
        text-transform: uppercase;
        font-weight: 900;
        -webkit-text-stroke: 1px white;
        letter-spacing: 0.2rem;
        margin: 0;
        padding: $size-md;
        text-align: center;
        color: transparent;
    }
</style>
