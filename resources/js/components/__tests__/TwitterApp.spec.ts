import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";
import TwitterApp from "../TwitterApp.vue";
import TweetFeed from "../TweetFeed.vue";
import TweetCard from "../TweetCard.vue";
import * as flushPromises from "flush-promises";
import axios from "axios"
import MockAdapter from "axios-mock-adapter";
import {TweetPayload} from "../../types";

describe('Twitter App', () => {
    let wrapper: Wrapper<TwitterApp>;
    let testApi: MockAdapter;
    const preExistingTweets: TweetPayload[] = [
        {
            userName: 'Person A',
            avatarUrl: 'AsAvatar.jpg',
            message: 'Person A message'
        },
        {
            userName: 'Person B',
            avatarUrl: 'BsAvatar.jpg',
            message: 'Person B message'
        },
    ];
    beforeEach(() => {

        testApi = new MockAdapter(axios);

        testApi.onPost('/tweet').reply(({data}) => {
            return [201, {
                userName: 'Faker UserName',
                message: JSON.parse(data).message,
                avatarUrl: 'url.jpg'
            }];
        });
        testApi.onGet('/tweet').reply(200, preExistingTweets);
        wrapper = mount(TwitterApp, {
            propsData: {
                maxTweetLength: 120,
                minTweetLength: 1
            }
        });
    });

    afterEach(() => {
        testApi.restore();
    });

    it('has an input box', () => {
        expect(wrapper.find(TweetInputBox).exists()).toBe(true);
    });

    it('has a tweet feed', () => {
        expect(wrapper.find(TweetFeed).exists()).toBe(true);
    });

    it('renders new tweet', async () => {
        const givenText: string = 'Hi';
        wrapper.find('.input-box').setValue(givenText);
        wrapper.find('.submit-button').trigger('click');

        await flushPromises();

        expect(testApi.history.post.length).toBe(1);
        expect(wrapper.find(TweetCard).text()).toContain(givenText);
    });

    it('Renders newer tweets first', async () => {
        wrapper.find('.input-box').setValue('first message');
        wrapper.find('.submit-button').trigger('click');

        wrapper.find('.input-box').setValue('second message');
        wrapper.find('.submit-button').trigger('click');

        await flushPromises();

        expect(wrapper.findAll(TweetCard).at(0).text()).toContain('second message');
    });

    describe('prevents tweet with invalid sizes from being submitted', () => {
        const maxTweetLength = 15;
        const minTweetLength = 10;
        beforeEach(() => {
            wrapper = mount(TwitterApp, {
                propsData: {
                    maxTweetLength,
                    minTweetLength
                }
            });
        });

        it('prevents tweet below minimum size from being submitted', () => {
            let message = 'k'.repeat(minTweetLength - 1);
            wrapper.find('.input-box').setValue(message);
            expect((wrapper.find('.submit-button').element as HTMLButtonElement).disabled).toBe(true);
        });

        it('prevents tweet above maximum size from being submitted', () => {
            let message = 'k'.repeat(maxTweetLength + 1);
            wrapper.find('.input-box').setValue(message);
            expect((wrapper.find('.submit-button').element as HTMLButtonElement).disabled).toBe(true);
        });

    });

    it('Shows existing tweets', async () => {
        await flushPromises();

        expect(wrapper.findAll(TweetCard).wrappers).toHaveLength(preExistingTweets.length);
    });
});

