import { StoryFn, Meta } from '@storybook/vue3';
import CircularProgress from './CircularProgress.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { fn } from '@storybook/test';

const meta = {
  title: 'CircularProgress/CircularProgress',
  component: CircularProgress,
  argTypes: {
    percent: {
      control: { type: StorybookControlEnum.number },
      defaultValue: 0
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
} as Meta<typeof CircularProgress>;

export default meta;

const Template: StoryFn<typeof CircularProgress> = args => ({
  components: { CircularProgress },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <CircularProgress v-bind="args"/>
    </div>
  `
});

export const Default = Template.bind({});
