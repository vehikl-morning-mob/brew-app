import RegistrationForm from "../RegistrationForm.vue";
import {mount, Wrapper} from "@vue/test-utils";
import * as flushPromises from 'flush-promises';
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

describe('RegistrationForm', () => {
    let wrapper: Wrapper<RegistrationForm>;
    let mockServer: MockAdapter;

    beforeEach(() => {
        mockServer = new MockAdapter(axios);

        mockServer.onPost('/register').reply(201);
        wrapper = mount(RegistrationForm, {
            propsData: {
                routeRegister: '/register',
            }
        });
    });

    afterEach(() => {
        mockServer.restore();
    });

    it('Displays error if backend validation fails', async () => {

        const emailErrorMessage = 'Email already taken!';
        mockServer.onPost('/register').reply(422, {
            errors: {
                email: [emailErrorMessage]
            }
        });
        wrapper.find('#email').setValue('t@s.alad');
        wrapper.find('#name').setValue('tacos');
        wrapper.find('#password').setValue('localTaco');
        wrapper.find('#password-confirm').setValue('localTaco');

        wrapper.find('#submit').trigger('click');

        await flushPromises();

        expect(wrapper.text()).toContain(emailErrorMessage);
    });

});
