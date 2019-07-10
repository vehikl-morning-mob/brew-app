<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form method="POST" @submit.prevent>
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name"
                                           type="text"
                                           class="form-control"
                                           name="name"
                                           v-model="name"
                                           required autocomplete="name" autofocus>
                                    <div v-for="error in errors.name">
                                        {{ error }}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">
                                    Email
                                </label>

                                <div class="col-md-6">
                                    <input id="email"
                                           type="email"
                                           class="form-control"
                                           name="email"
                                           v-model="email"
                                           required autocomplete="email">
                                    <div v-for="error in errors.email">
                                        {{ error }}
                                    </div>
                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="password"
                                       class="col-md-4 col-form-label text-md-right">
                                    Password
                                </label>

                                <div class="col-md-6">
                                    <input id="password" type="password"
                                           class="form-control"
                                           name="password"
                                           v-model="password"
                                           required autocomplete="new-password">
                                    <div v-for="error in errors.password">
                                        {{ error }}
                                    </div>
                                </div>

                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">
                                    Password Confirm
                                </label>

                                <div class="col-md-6">
                                    <input id="password-confirm"
                                           type="password"
                                           class="form-control"
                                           name="password_confirmation"
                                           v-model="passwordConfirmation"
                                           required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button id="submit"
                                            type="submit"
                                            @click="registerUser"
                                            class="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import axios from 'axios';

    @Component
    export default class RegistrationForm extends Vue {
        @Prop() routeRegister!: string;
        protected name: string = '';
        protected email: string = '';
        protected password: string = '';
        protected passwordConfirmation: string = '';

        protected errors: any = {};


        protected async registerUser() {
            try {
                const response = await axios.post(this.routeRegister, {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                });
            } catch ({response}) {
                this.errors = response.data.errors;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
