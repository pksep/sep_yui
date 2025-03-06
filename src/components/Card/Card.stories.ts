import { StoryFn } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import Card from './Card.vue';

const meta = {
  title: 'Card/Card',
  component: Card,
  argTypes: {
    pressed: {
      control: { type: StorybookControlEnum.boolean },
      defaultValue: false
    }
  },
  tags: ['autodocs']
};

export default meta;

const Template: StoryFn = args => ({
  components: { Card },
  setup() {
    return { args };
  },
  template: `
        <Card v-bind="args" @click="args.pressed = !args.pressed" :class="{ pressed: args.pressed}" :style="{width: '162px', height: '140px'}">
            <template v-if="args['left']" #left> {{args["left"]}} </template>

            <template #default> Simple text </template>
        </Card>
  `
});

export const Default = Template.bind({});
Default.args = {};

export const Pressed = Template.bind({});
Pressed.args = {
  pressed: true
};

export const WithLeft = Template.bind({});
WithLeft.args = {
  left: '1.'
};
