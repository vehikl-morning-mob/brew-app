<template>
    <form class="tweet-input-box" @submit.prevent>
        <div class="text-area-with-fill">
            <div class="coffee-fill"></div>
            <textarea class="input-box"
                      v-model="message">
            </textarea>
        </div>

        <button type="submit"
                :disabled="!canSubmitBrew"
                @click="submitTweet"
                class="submit-button">
            Brew
        </button>
    </form>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';

    const maxCharacterCount: number = 120;
    @Component
    export default class TweetInputBox extends Vue {
        protected message: string = '';

        protected submitTweet(): void {
            this.$emit('new-tweet', this.message);
            this.message = '';
        }

        protected get canSubmitBrew(): boolean {
            return this.message.length <= maxCharacterCount && this.message.length > 0;
        }

        protected get fillPercentage(): number {
            return this.message.length / maxCharacterCount;
        }

        @Watch('message')
        protected updateCoffeeFill(): void {
            document.documentElement.style.setProperty('--fill-percentage', `${this.fillPercentage * 100}%`);
        }
    }
</script>

<style lang="scss">
    @import '../../sass/variables';

    .text-area-with-fill {
        position: relative;
        border-radius: $size-xl;
        overflow: hidden;

        .coffee-fill {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: var(--fill-percentage);
            background-color: black;
            z-index: 1;
        }
    }

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
        width: 100%;
        outline: transparent;
        color: $tweetGrey;
        position: relative;
        z-index: 2;
        display: block;
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

        &:disabled {
            filter: saturate(50%);
        }
    }

</style>
