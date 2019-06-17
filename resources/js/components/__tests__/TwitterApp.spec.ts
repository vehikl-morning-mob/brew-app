import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";
import TwitterApp from "../TwitterApp.vue";
import TweetFeed from "../TweetFeed.vue";

describe('Twitter App - Unit', () => {
    it('has an input box', () => {
        const wrapper: Wrapper<TwitterApp> = mount(TwitterApp);

        expect(wrapper.find(TweetInputBox).exists()).toBe(true);
    });

    it('has a tweet feed', () => {
        const wrapper: Wrapper<TwitterApp> = mount(TwitterApp);

        expect(wrapper.find(TweetFeed).exists()).toBe(true);

    });
});
