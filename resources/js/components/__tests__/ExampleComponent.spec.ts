import {mount, Wrapper} from "@vue/test-utils";
import ExampleComponent from "../ExampleComponent.vue";

describe('ExampleComponent', () => {
    it('renders', () => {
        const wrapper: Wrapper<ExampleComponent> = mount(ExampleComponent);
        expect(wrapper.text()).toContain("I'm an example component.");
    });
});
