import { StoryFn } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import Details from './Details.vue';

const meta = {
  title: 'Details/Details',
  component: Details,
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
  components: { Details },
  setup() {
    return { args };
  },
  template: `
    <Details>
    <template #summary>
        Откройте для детальной информации
    </template>
        Детальная информация
    </Details>
  `
});

export const Default = Template.bind({});
Default.args = {};
