import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";

describe('TweetInputBox', () => {
    it('Accepts an input message', () => {
        const wrapper: Wrapper<TweetInputBox> = mount(TweetInputBox);

        expect(wrapper.find('.input-box').exists()).toBe(true);
    });

    it('Emits an event on submit', () => {
        const wrapper: Wrapper<TweetInputBox> = mount(TweetInputBox);
        wrapper.find('.input-box').setValue('Hi');
        wrapper.find('.submit-button').trigger('click');

        expect(wrapper.emitted('new-tweet')).toBeTruthy();
    });

    it('Emits an event on submit with the message that was provided', () => {
        const wrapper: Wrapper<TweetInputBox> = mount(TweetInputBox);
        wrapper.find('.input-box').setValue('Hi');
        wrapper.find('.submit-button').trigger('click');

        expect(wrapper.emitted('new-tweet')[0][0]).toBe('Hi');
    });

    it('clears message after submission', () => {
        const wrapper: Wrapper<TweetInputBox> = mount(TweetInputBox);
        wrapper.find('.input-box').setValue('Hi');
        wrapper.find('.submit-button').trigger('click');

        const inputBox: HTMLTextAreaElement = wrapper.find('.input-box').element as HTMLTextAreaElement;
        expect(inputBox.value).toBe('');
    });
});
