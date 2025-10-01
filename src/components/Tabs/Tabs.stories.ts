import { StoryFn } from '@storybook/vue3';
import Tabs from './Tabs.vue';
import Card from '../Card/Card.vue';

const meta = {
  title: 'Tabs/Tabs',
  component: Tabs,
  argTypes: {},
  tags: ['autodocs']
};

export default meta;

const Template: StoryFn = args => ({
  components: { Tabs, Card },
  setup() {
    return { args };
  },
  template: `
  <Tabs v-bind="args">
  <template #header1>
   Tab 1
  </template>
  <template #header2>
     Tab 2
  </template>
  <template #tab1>
    <Card>
      Tab 1 test content
    </Card>
    </template>
    <template #tab2>
      <Card>
        Tab 2 test content
      </Card>
      </template>
  </Tabs>
  `
});

export const Default = Template.bind({});
Default.args = {
  tabCount: 2
};
