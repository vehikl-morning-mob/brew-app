<template>
    <form class="tweet-input-box" @submit.prevent>
        <textarea class="input-box"
                  v-model="message">
        </textarea>

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
    }
</style>
