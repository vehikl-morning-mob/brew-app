import RegistrationForm from "../RegistrationForm.vue";
import {mount, Wrapper} from "@vue/test-utils";
import * as flushPromises from 'flush-promises';
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import ImageUploader from "../ImageUploader.vue";

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
        wrapper.find('#email').setValue('t@s.alad');
        wrapper.find('#name').setValue('tacos');
        wrapper.find('#password').setValue('localTaco');
        wrapper.find('#password-confirm').setValue('localTaco');

        wrapper.find('#submit').trigger('click');

        await flushPromises();

        expect(wrapper.text()).toContain(emailErrorMessage);
    });

    it('Sets uploaded image as avatar', async () => {
        const userAvatar: string = 'hello123';
        wrapper.find(ImageUploader).vm.$emit('image-uploaded', userAvatar);
        wrapper.find('#email').setValue('t@s.alad');
        wrapper.find('#name').setValue('tacos');
        wrapper.find('#password').setValue('localTaco');
        wrapper.find('#password-confirm').setValue('localTaco');

        wrapper.find('#submit').trigger('click');
        await flushPromises();
        const registrationPayload = JSON.parse(mockServer.history.post[0].data);

        expect(registrationPayload.avatar).toBe(userAvatar)
    });

});
