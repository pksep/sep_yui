import { StoryFn } from '@storybook/vue3';
import Card from './Card.vue';

const meta = {
  title: 'Card/Card',
  component: Card,
  argTypes: {},
  tags: ['autodocs'],
  args: { }
};

export default meta;

const Template: StoryFn = args => ({
  components: { Card },
  setup() {
    return { args };
  },
  template: `
        <Card>
            Simple text
        </Card>
  `
});

export const Default = Template.bind({});
Default.args = {};
