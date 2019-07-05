import {mount, Wrapper} from "@vue/test-utils";
import TweetInputBox from "../TweetInputBox.vue";
import TwitterApp from "../TwitterApp.vue";
import TweetFeed from "../TweetFeed.vue";
import TweetCard from "../TweetCard.vue";
import * as flushPromises from "flush-promises";
import axios from "axios"
import MockAdapter from "axios-mock-adapter";

describe('Twitter App', () => {
    let wrapper: Wrapper<TwitterApp>;
    let testApi: MockAdapter;

    beforeEach(() => {
        wrapper = mount(TwitterApp, {
            propsData: {
                maxTweetLength: 120,
                minTweetLength: 1
            }
        });
        testApi = new MockAdapter(axios);
        testApi.onPost('/tweet').reply(201);
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
});

