import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";
import TwitterApp from "../TwitterApp.vue";

describe('Twitter App', () => {
    it('has an input box', () => {
        const wrapper: Wrapper<TwitterApp> = mount(TwitterApp);

        expect(wrapper.find(TweetInputBox).exists()).toBe(true);
    });
});
