<template>
    <form class="tweet-input-box" @submit.prevent>
            <textarea class="input-box"
                      v-model="message"></textarea>


        <button type="submit"
                @click="submitTweet"
                class="submit-button">
            Brew
        </button>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class TweetInputBox extends Vue {
        protected message: string = '';

        protected submitTweet(): void {
            this.$emit('new-tweet', this.message);
            this.message = '';
        }
    }
</script>

<style lang="scss">
    @import '../../sass/variables';

    .tweet-input-box {
        display: flex;
        flex-direction: column;
    }

    .input-box {
        background-color: $lightBrown;
        border: 2px solid $lightBrownBorder;
        padding: $size-sm;
        border-radius: $size-xl;
        resize: none;
        height: $size-8xl;
        outline: transparent;
        color: $tweetGrey;
    }

    .submit-button {
        border-radius: $size-md;
        background-color: $green;
        color: $coffeeBrown;
        height: $size-4xl;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 1;
        border: none;
        margin-top: $size-xs;
        letter-spacing: 0.1rem;
    }

</style>
