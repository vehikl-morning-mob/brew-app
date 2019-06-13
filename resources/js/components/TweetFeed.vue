<template>
    <div>
        <tweet-card v-for="(message, index) in messages"
                    :key="index"
                    :message="message"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import TweetCard from "./TweetCard.vue";

    @Component({
        components: {TweetCard}
    })
    export default class TweetFeed extends Vue {
        @Prop() protected messages!: string[];

    }

</script>
