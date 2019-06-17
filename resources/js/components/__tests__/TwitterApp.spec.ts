import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";
import TwitterApp from "../TwitterApp.vue";
import TweetFeed from "../TweetFeed.vue";
import TweetCard from "../TweetCard.vue";

describe('Twitter App', () => {
    it('has an input box', () => {
        const wrapper: Wrapper<TwitterApp> = mount(TwitterApp);

        expect(wrapper.find(TweetInputBox).exists()).toBe(true);
    });

    it('has a tweet feed', () => {
        const wrapper: Wrapper<TwitterApp> = mount(TwitterApp);

        expect(wrapper.find(TweetFeed).exists()).toBe(true);
    });

    it('renders new tweet', () => {
        const wrapper: Wrapper<TwitterApp> = mount(TwitterApp);

        const givenText: string = 'Hi';
        wrapper.find('.input-box').setValue(givenText);
        wrapper.find('.submit-button').trigger('click');

        expect(wrapper.find(TweetCard).text()).toContain(givenText);
    });
});

