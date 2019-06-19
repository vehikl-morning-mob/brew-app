<template>
    <form class="tweet-input-box" @submit.prevent>
            <textarea class="input-box"
                      v-model="message"></textarea>


        <button type="submit"
                @click="submitTweet"
                class="submit-button">
            Send tweet
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
        background-color: $pooBrown;
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    .input-box {
        background-color: $lightBrown;
        border: none;
        padding: 0.875rem;
        border-radius: 1.25rem;
        flex: 1;
        resize: none;
        height: 100%;
        outline: transparent;
        color: $tweetGrey;
    }

</style>
