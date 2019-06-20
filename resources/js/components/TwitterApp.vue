<template>
    <div class="twitter-app">
        <h1>Brew.</h1>
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
            this.messages.unshift(message);
        }
    }
</script>

<style scoped lang="scss">
    @import "../../sass/variables";

    h1 {
        text-transform: uppercase;
        font-weight: 900;
        -webkit-text-stroke: 1px white;
        letter-spacing: 0.2rem;
        margin: 0;
        padding: 1rem;
        text-align: center;
        color: transparent;
        background: $coffeeBrown;
    }
</style>
