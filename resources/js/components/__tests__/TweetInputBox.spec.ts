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

    describe('Disable submit button for messages with invalid character count', () => {
        const maxCharacterCount: number = 120;
        const minCharacterCount: number = 1;

        it.each`
        characterCount | isSubmitDisabled
        ${minCharacterCount - 1} | ${true}
        ${minCharacterCount}     | ${false}
        ${maxCharacterCount - 1} | ${false}
        ${maxCharacterCount}     | ${false}
        ${maxCharacterCount + 1} | ${true}
        `('for $characterCount characters submit disabled is $isSubmitDisabled', ({characterCount, isSubmitDisabled}) => {
            message = 'k'.repeat(characterCount);
            wrapper.find('.input-box').setValue(message);
            expect((wrapper.find('.submit-button').element as HTMLButtonElement).disabled).toBe(isSubmitDisabled);
        });

    });

});
