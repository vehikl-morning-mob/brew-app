import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";
import {TweetPayload} from "../../types";

describe('TweetInputBox', () => {
    let message: string;
    let wrapper: Wrapper<TweetInputBox>;

    beforeEach(() => {
        wrapper = mount(TweetInputBox, {
            propsData: {
                minTweetLength: 1,
                maxTweetLength: 120,
            }
        });
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
        const maxTweetLength: number = 55;
        const minTweetLength: number = 50;

        it.each`
        currentTweetLength | isSubmitDisabled
        ${minTweetLength - 1} | ${true}
        ${minTweetLength}     | ${false}
        ${maxTweetLength - 1} | ${false}
        ${maxTweetLength}     | ${false}
        ${maxTweetLength + 1} | ${true}
        `('for $characterCount characters submit disabled is $isSubmitDisabled', ({currentTweetLength, isSubmitDisabled}) => {
            wrapper = mount(TweetInputBox, {
                propsData: {
                    maxTweetLength,
                    minTweetLength
                }
            });

            message = 'k'.repeat(currentTweetLength);
            wrapper.find('.input-box').setValue(message);
            expect((wrapper.find('.submit-button').element as HTMLButtonElement).disabled).toBe(isSubmitDisabled);
        });

    });

});
