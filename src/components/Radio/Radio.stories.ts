import { Meta, StoryObj } from '@storybook/vue3';
import Radio from './Radio.vue';

const meta: Meta<typeof Radio> = {
  title: 'Radio/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    name: 'test'
  }
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    value: 'one'
  }
};
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'two'
  }
};
