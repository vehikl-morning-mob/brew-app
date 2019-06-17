<template>
    <form class="tweet-input-box" @submit.prevent>
        <textarea class="input-box"
                  v-model="message">
        </textarea>

        <button type="submit"
                @click="$emit('new-tweet', message)"
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
    }
</script>
