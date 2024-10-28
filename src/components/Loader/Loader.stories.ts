import { StoryFn, Meta } from '@storybook/vue3';
import Loader from './Loader.vue';

const meta = {
  title: 'Loader/Loader',
  component: Loader,
  tags: ['autodocs']
} as Meta<typeof Loader>;

export default meta;

const Template: StoryFn<typeof Loader> = args => ({
  components: { Loader },
  setup() {
    return { args };
  },
  template: `
    <Loader />
  `
});

export const Default = Template.bind({});
