<template>
    <div class="tweet-feed">
        <tweet-card class="card-unit"
                    v-for="(tweetPayload, index) in tweetPayloads"
                    :key="index"
                    :tweet-payload="tweetPayload"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import TweetCard from "./TweetCard.vue";
    import {TweetPayload} from '../types';

    @Component({
        components: {TweetCard}
    })
    export default class TweetFeed extends Vue {
        @Prop() protected tweetPayloads!: TweetPayload[];

    }
</script>

<style scoped lang="scss">
    @import "../../sass/variables";

    .tweet-feed {
        max-width: 25rem;
        margin: 0 auto;
    }

    .card-unit {
        margin: $size-xl 0;
    }
</style>
