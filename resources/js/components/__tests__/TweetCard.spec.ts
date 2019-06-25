import {mount, Wrapper} from "@vue/test-utils";
import TweetCard from "../TweetCard.vue";

describe('TweetCard', () => {
    it('renders a given message', () => {
        const givenMessage: string = 'Hello World!';

        const wrapper: Wrapper<TweetCard> = mount(TweetCard, {
            propsData: {
                message: givenMessage,
            }
        });

        expect(wrapper.find('.tweet-card').text()).toContain(givenMessage);
    });

    it('renders an avatar', () => {
        const wrapper: Wrapper<TweetCard> = mount(TweetCard);

        expect(wrapper.find('.user-avatar').exists()).toBe(true);
    });
});
