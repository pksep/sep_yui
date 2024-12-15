import { StoryFn, Meta } from '@storybook/vue3';
import SelectList from './SelectList.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { fn } from '@storybook/test';

const optionsItems = [
  'MainOptionMainOptionMainOption',
  'Option1MainOptionMainOption',
  'Option2MainOptionMainOption',
  'Option3',
  'Option4'
];

const meta = {
  title: 'SelectList/SelectList',
  component: SelectList,
  argTypes: {
    optionsItems: {
      type: StorybookControlEnum.object,
      defaultValue: optionsItems,
      onClick: { action: 'clicked' }
    }
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    width: '200px'
  }
} as Meta<typeof SelectList>;

export default meta;

const Template: StoryFn<typeof SelectList> = args => ({
  components: { SelectList },
  setup() {
    return { args };
  },
  template: `
  <SelectList v-bind="args" />
  `
});

export const Default = Template.bind({});

Default.args = {
  options: optionsItems
};
