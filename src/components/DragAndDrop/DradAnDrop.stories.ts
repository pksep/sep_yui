import { StoryFn } from '@storybook/vue3';
import DragAndDrop from './DragAndDrop.vue';

const meta = {
  title: 'DragAndDrop/DragAndDrop',
  component: DragAndDrop,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: '#E3E3E3' }
  }
};

export default meta;

const Template: StoryFn<typeof DragAndDrop> = args => ({
  components: { DragAndDrop },
  setup() {
    return { args };
  },
  template: `
        <div :style="{height: '50px', width: '30rem' }">
            <DragAndDrop v-bind="args" />
        </div>
     `
});

export const Default = Template.bind({});
