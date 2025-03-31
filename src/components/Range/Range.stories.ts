import { Meta, StoryFn } from '@storybook/vue3';
import Range from './Range.vue';
import { ref } from 'vue';

const meta: Meta<typeof Range> = {
  title: 'Range/Range',
  component: Range,
  tags: ['autodocs']
};

export default meta;

const Template: StoryFn<typeof Range> = args => ({
  components: { Range },
  setup() {
    const model = ref(null);

    return { args, model };
  },
  template: `
    <Range  />
  `
});

export const Default = Template.bind({});
