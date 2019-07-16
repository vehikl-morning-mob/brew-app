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
    let tweetsOnPageTwo: TweetPayload[];
    let tweetsOnPageOne: TweetPayload[];

    beforeEach(() => {
        testApi = new MockAdapter(axios);

        tweetsOnPageOne = Array.from({length: 12}, (_, index: number) => {
            return {
                userName: 'UserA',
                avatar: 'AsAvatar.jpg',
                message: `Page One tweet #${index}`
            };
        });

        tweetsOnPageTwo = Array.from({length: 12}, (_, index: number) => {
            return {
                userName: 'UserB',
                avatar: 'BsAvatar.jpg',
                message: `Page Two tweet #${index}`
            };
        });

        testApi.onPost('/tweet').reply(({data}) => {
            return [201, {
                userName: 'Faker UserName',
                message: JSON.parse(data).message,
                avatar: 'url.jpg'
            }];
        });
        testApi.onGet('/tweet').reply(200, tweetsOnPageOne);
        testApi.onGet('/tweet?page=1').reply(200, tweetsOnPageOne);
        testApi.onGet('/tweet?page=2').reply(200, tweetsOnPageTwo);
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

        expect(wrapper.findAll(TweetCard).wrappers).toHaveLength(tweetsOnPageOne.length);
    });

    describe('Pagination', () => {
        it('Starts with tweets from page one', async () => {
            await flushPromises();
            const expectedMessages: string[] = tweetsOnPageOne.map((tweet: TweetPayload) => tweet.message);
            const existingMessages: string[] = wrapper.findAll('.message-container').wrappers.map(
                (wrapper) => wrapper.text()
            );

            expect(existingMessages).toEqual(expectedMessages);
        });
    });
});

