import './bootstrap';
import Vue from 'vue';
import TweetFeed from './components/TweetFeed.vue';

const app = new Vue({
    el: '#app',
    components: {TweetFeed}
});
