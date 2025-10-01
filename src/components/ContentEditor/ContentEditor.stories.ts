import { StoryFn } from '@storybook/vue3';
import ContentEditor from './ContentEditor.vue';

const meta = {
  components: { ContentEditor },
  title: 'Input/ContentEditor',
  component: ContentEditor,
  tags: ['autodocs']
};

export default meta;

export const Default: StoryFn<typeof ContentEditor> = args => ({
  components: { ContentEditor },
  setup() {
    return { args };
  },
  template: '<ContentEditor v-bind="args"/>'
});
