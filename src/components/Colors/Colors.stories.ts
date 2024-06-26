import { StoryFn, Meta } from '@storybook/vue3';
import Colors from './Colors.vue';

const meta = {
  title: 'Colors/Colors',
  component: Colors,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Colors>;

export default meta;

const Template: StoryFn<typeof Colors> = args => ({
  components: { Colors },
  setup() {
    return { args };
  },
  template: `<Colors/>`
});

export const Default = Template.bind({});
