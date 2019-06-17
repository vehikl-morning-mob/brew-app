import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";

describe('TweetInputBox', () => {
    it('Accepts an input message', () => {
        const wrapper: Wrapper<TweetInputBox> = mount(TweetInputBox);

        expect(wrapper.find('.input-box').exists()).toBe(true);
    });
});
