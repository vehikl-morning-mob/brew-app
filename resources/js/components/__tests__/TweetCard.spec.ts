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

    it('renders the user avatar', () => {
        const image: HTMLImageElement = wrapper.find('.user-avatar').element as HTMLImageElement;
        expect(image.src).toContain(tweetPayload.avatarUrl);
    });

    it('Renders the username', () => {
        expect(wrapper.find('.user-name').text()).toContain(tweetPayload.userName);
    });
});
