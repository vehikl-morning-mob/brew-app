<template>
    <div class="tweet-card">
        <img class="user-avatar" :src="`https://robohash.org/${ message }?set=set4`">
        <div class="card-body" v-text="message"></div>
    </div>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from 'vue-property-decorator';

    @Component
    export default class TweetCard extends Vue {
        @Prop() protected message!: string;
    }
</script>

<style scope lang="scss">
    @import '../../sass/variables';

    .tweet-card {
        background-color: $tweetGrey;
        border-radius: $size-lg $size-lg $size-5xl $size-5xl;
        box-shadow: 0 4px 10px 0 hsla(0, 0, 0, 0.1);
        min-height: $size-8xl;
        width: 100%;

        &:hover {
            background-color: var(--my-color);
        }
    }

    .card-body {
        height: 100%;
        word-break: break-word;
    }

    img {
        height: $size-7xl;
        clip-path: circle(50%);
    }
</style>
