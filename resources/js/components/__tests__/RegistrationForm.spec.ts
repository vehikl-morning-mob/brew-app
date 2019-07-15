import RegistrationForm from "../RegistrationForm.vue";
import {mount, Wrapper} from "@vue/test-utils";
import * as flushPromises from 'flush-promises';
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import ImageUploader from "../ImageUploader.vue";

const user = {
    name: 'foobar',
    email: 'foo@bar.com',
    password: 'foofoobarb4r',
    avatar: 'whateverbar'
};

describe('RegistrationForm', () => {
    let wrapper: Wrapper<RegistrationForm>;
    let mockServer: MockAdapter;

    beforeEach(() => {
        mockServer = new MockAdapter(axios);

        mockServer.onPost('/register').reply(201);
        wrapper = mount(RegistrationForm, {
            propsData: {
                routeRegister: '/register',
            },
            stubs: ['image-uploader'],
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

        fillFormFields();

        wrapper.find('#submit').trigger('click');
        await flushPromises();

        expect(wrapper.text()).toContain(emailErrorMessage);
    });

    it('Sets uploaded image as avatar', async () => {
        fillFormFields();

        wrapper.find('#submit').trigger('click');
        await flushPromises();
        const registrationPayload = JSON.parse(mockServer.history.post[0].data);

        expect(registrationPayload.avatar).toBe(user.avatar)
    });

    function fillFormFields() {
        wrapper.find('#email').setValue(user.email);
        wrapper.find('#name').setValue(user.name);
        wrapper.find('#password').setValue(user.password);
        wrapper.find('#password-confirm').setValue(user.password);
        wrapper.find(ImageUploader).vm.$emit('image-uploaded', user.avatar);
    }

});
