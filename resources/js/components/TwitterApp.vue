<template>
    <div class="twitter-app">
        <tweet-input-box></tweet-input-box>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TweetInputBox from "./TweetInputBox.vue";

    @Component({
        components: {TweetInputBox}
    })
    export default class TwitterApp extends Vue {
        protected message: string = '';
    }
</script>
