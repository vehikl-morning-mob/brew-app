<template>
    <div class="tweet-card">
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

    .tweet-card {
        background-color: blue;
        --my-color: #000;

        &:hover {
            background-color: var(--my-color);
        }
    }
</style>
