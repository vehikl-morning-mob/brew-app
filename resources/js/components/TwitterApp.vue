<template>
    <div class="twitter-app">
        <div class="brown">
            <h1>Brew.</h1>
            <tweet-input-box @new-tweet="onNewTweetCreated"/>
        </div>
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

    .twitter-app {
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
