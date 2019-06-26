import TweetFeed from "../TweetFeed.vue";
import {mount, Wrapper} from "@vue/test-utils";
import TweetCard from "../TweetCard.vue";
import {TweetPayload} from "../../types";

describe('TweetFeed - Unit', () => {
    describe('Renders a tweet card for each message', () => {
        let tweetMessages: string[];
        let wrapper: Wrapper<TweetFeed>;

        beforeEach(() => {
            tweetMessages = ['Hello', 'World', 'Robots', 'Whip', 'Nae-nae', 'Geralt of Rivia'];
            const tweetPayloads: TweetPayload[] = tweetMessages.map((message: string): TweetPayload => ({
                message,
                userName: 'whateverUsernameThatWeDontCareAbout',
                avatarUrl: 'avatar.jpg'
            }));
            wrapper = mount(TweetFeed, {
                propsData: {
                    tweetPayloads,
                }
            });
        });

        it('Renders right amount of cards', () => {
            expect(wrapper.findAll(TweetCard)).toHaveLength(tweetMessages.length);
        });

        it('Renders a correct message', () => {
            wrapper.findAll(TweetCard).wrappers.forEach((tweetCard: Wrapper<TweetCard>, index: number) => {
                expect(tweetCard.find('.message-container').text()).toBe(tweetMessages[index]);
            })
        });
    });
});
