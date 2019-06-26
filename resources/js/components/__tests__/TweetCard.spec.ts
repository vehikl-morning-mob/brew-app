import {mount, Wrapper} from "@vue/test-utils";
import TweetCard from "../TweetCard.vue";
import {TweetPayload} from "../../types";

describe('TweetCard', () => {
    let tweetPayload: TweetPayload;
    let wrapper: Wrapper<TweetCard>;
    beforeEach(() => {
        tweetPayload = {
            message: 'blah',
            userName: 'asdf',
            avatarUrl: 'asdfasd.com'
        };

        wrapper = mount(TweetCard, {
            propsData: {
                tweetPayload,
            }
        });
    });

    it('renders a given message', () => {
        expect(wrapper.find('.tweet-card').text()).toContain(tweetPayload.message);
    });

    it('renders an avatar', () => {
        expect(wrapper.find('.user-avatar').exists()).toBe(true);
    });
});
