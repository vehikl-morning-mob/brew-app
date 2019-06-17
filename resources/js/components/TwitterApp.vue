<template>
    <div class="twitter-app">
        <tweet-input-box></tweet-input-box>
        <tweet-feed></tweet-feed>
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

    }
</script>
