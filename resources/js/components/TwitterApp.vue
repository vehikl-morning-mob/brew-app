<template>
    <div class="twitter-app">
        <div class="brown">
            <h1>Brew.</h1>
            <tweet-input-box :min-tweet-length="minTweetLength"
                             :max-tweet-length="maxTweetLength"
                             @new-tweet="onNewTweetCreated"/>
        </div>
        <tweet-feed :tweet-payloads="tweetPayloads"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import TweetInputBox from "./TweetInputBox.vue";
    import TweetFeed from "./TweetFeed.vue";
    import {TweetPayload} from "../types";
    import axios, {AxiosResponse} from "axios";

    @Component({
        components: {TweetFeed, TweetInputBox}
    })
    export default class TwitterApp extends Vue {
        @Prop() protected maxTweetLength!: number;
        @Prop() protected minTweetLength!: number;

        protected tweetPayloads: TweetPayload[] = [];

        protected async onNewTweetCreated(message: string): Promise<void> {
            try {
                const createdTweet: AxiosResponse<TweetPayload> = await axios.post<TweetPayload>(
                    '/tweet', {
                        message
                    });

                this.tweetPayloads.unshift(createdTweet.data);
            } catch ({response}) {
            }
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
