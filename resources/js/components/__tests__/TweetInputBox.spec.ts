import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";

describe('TweetInputBox', () => {
    let message: string;
    let wrapper: Wrapper<TweetInputBox>;

    beforeEach(() => {
        wrapper = mount(TweetInputBox);
    });

    describe('Submit Event', () => {
        beforeEach(() => {
            message = 'Hi';
            wrapper.find('.input-box').setValue(message);
            wrapper.find('.submit-button').trigger('click');
        });

        it('Emits an event on submit', () => {
            expect(wrapper.emitted('new-tweet')).toBeTruthy();
        });

        it('Emits an event on submit with the message that was provided', () => {
            expect(wrapper.emitted('new-tweet')[0][0]).toBe(message);
        });
    });

    it('clears message after submission', () => {
        const inputBox: HTMLTextAreaElement = wrapper.find('.input-box').element as HTMLTextAreaElement;
        expect(inputBox.value).toBe('');
    });

    describe('Does not allow more than 120 characters', () => {
        it('enables the submit button while text length <= 120 characters', () => {
            message = 'k'.repeat(120);
            wrapper.find('.input-box').setValue(message);
            expect((wrapper.find('.submit-button').element as HTMLButtonElement).disabled).toBe(false);
        });

        it('disables the submit button while text length greater than 120 characters', () => {
            message = 'k'.repeat(121);
            wrapper.find('.input-box').setValue(message);
            expect((wrapper.find('.submit-button').element as HTMLButtonElement).disabled).toBe(true);
        })
    });

});
