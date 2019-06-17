import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";

describe('TweetInputBox', () => {
    let message: string;
    let wrapper: Wrapper<TweetInputBox>;

    beforeEach(() => {
        message = 'Hi';
        wrapper = mount(TweetInputBox);
        wrapper.find('.input-box').setValue(message);
        wrapper.find('.submit-button').trigger('click');
    });

    it('Emits an event on submit', () => {
        expect(wrapper.emitted('new-tweet')).toBeTruthy();
    });

    it('Emits an event on submit with the message that was provided', () => {
        expect(wrapper.emitted('new-tweet')[0][0]).toBe(message);
    });

    it('clears message after submission', () => {
        const inputBox: HTMLTextAreaElement = wrapper.find('.input-box').element as HTMLTextAreaElement;
        expect(inputBox.value).toBe('');
    });
});
