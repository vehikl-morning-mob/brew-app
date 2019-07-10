import './bootstrap';
import Vue from 'vue';
import TwitterApp from './components/TwitterApp.vue';
import RegistrationForm from "./components/RegistrationForm.vue";

const app = new Vue({
    el: '#app',
    components: {TwitterApp, RegistrationForm}
});
