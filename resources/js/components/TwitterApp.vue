<template>
    <div class="twitter-app">
        <tweet-input-box @new-tweet="onNewTweetCreated"/>
        <tweet-feed :messages="messages"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TweetInputBox from "./TweetInputBox.vue";
    import TweetFeed from "./TweetFeed.vue";

    @Component({
        components: {TweetFeed, TweetInputBox}
    })
    export default class TwitterApp extends Vue {
        protected messages: string[] = [];

        protected onNewTweetCreated(message: string): void {
            this.messages.push(message);
        }
    }
</script>
