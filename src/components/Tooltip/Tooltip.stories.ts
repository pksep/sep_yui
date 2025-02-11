import { StoryFn, Meta } from '@storybook/vue3';
import Tooltip from './Tooltip.vue';

const meta = {
  title: 'Tooltip/Tooltip',
  component: Tooltip,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Tooltip>;

export default meta;

const Template: StoryFn<typeof Tooltip> = args => ({
  components: { Tooltip },
  setup() {
    return { args };
  },
  template: `<Tooltip />`
});

export const Default = Template.bind({});
