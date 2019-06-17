import TweetFeed from "../TweetFeed.vue";
import {mount, Wrapper} from "@vue/test-utils";
import TweetCard from "../TweetCard.vue";

describe('TweetFeed - Unit', () => {
    describe('Renders a tweet card for each message', () => {
        let tweetMessages: string[];
        let wrapper: Wrapper<TweetFeed>;

        beforeEach(() => {
            tweetMessages = ['Hello', 'World', 'Robots', 'Whip', 'Nae-nae', 'Geralt of Rivia'];
            wrapper = mount(TweetFeed, {
                propsData: {
                    messages: tweetMessages
                }
            });
        });

        it('Renders right amount of cards', () => {
            expect(wrapper.findAll(TweetCard)).toHaveLength(tweetMessages.length);
        });

        it('Renders a correct message', () => {
            wrapper.findAll(TweetCard).wrappers.forEach((tweetCard: Wrapper<TweetCard>, index: number) => {
                expect(tweetCard.text()).toContain(tweetMessages[index]);
            })
        });
    });
});
