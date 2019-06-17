import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";
import TwitterApp from "../TwitterApp.vue";
import TweetFeed from "../TweetFeed.vue";
import TweetCard from "../TweetCard.vue";

describe('Twitter App', () => {
    let wrapper: Wrapper<TwitterApp>;
    beforeEach(() => {
        wrapper = mount(TwitterApp);
    });

    it('has an input box', () => {
        expect(wrapper.find(TweetInputBox).exists()).toBe(true);
    });

    it('has a tweet feed', () => {
        expect(wrapper.find(TweetFeed).exists()).toBe(true);
    });

    it('renders new tweet', () => {
        const givenText: string = 'Hi';
        wrapper.find('.input-box').setValue(givenText);
        wrapper.find('.submit-button').trigger('click');

        expect(wrapper.find(TweetCard).text()).toContain(givenText);
    });
});

