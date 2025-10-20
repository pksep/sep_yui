import { StoryFn, Meta } from '@storybook/vue3';
import TimePicker from './TimePicker.vue';
import type { ITimePickerProps } from './interface/interface';
import { ref, watch } from 'vue';

const meta = {
  title: 'TimePicker/TimePicker',
  component: TimePicker,
  argTypes: {},
  args: {},
  tags: ['autodocs']
} as Meta<typeof TimePicker>;

export default meta;

const Template: StoryFn<typeof TimePicker> = (args: ITimePickerProps) => ({
  components: { TimePicker },
  setup() {
    const modelValue = ref('2022-01-14T14:48:33.392Z');

    watch(modelValue, val => {
      console.log('Selected time:', val);
    });

    return { args, modelValue };
  },
  template: `
    <TimePicker v-bind="args" v-model="modelValue" />
  `
});

export const TimePickerDefault = Template.bind({});
