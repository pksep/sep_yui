import { StoryFn } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import Accordion from './Accordion.vue';
import ExampleTable from './ExampleTable.vue';

const meta = {
  title: 'Accordion/Accordion',
  component: Accordion,
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
  components: { Accordion, ExampleTable },
  setup() {
    return { args };
  },
  template: `
    <Accordion>
    <template #summary>
        Откройте для детальной информации
    </template>
            <ExampleTable />
    </Accordion>
  `
});

export const Default = Template.bind({});
Default.args = {};
