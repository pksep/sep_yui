import { StoryFn, Meta } from '@storybook/vue3';
import Badges from '@/components/Badges/Badges';
import { StorybookControl } from '../../common/storybook';
import { BadgesType } from './enum';

export default {
  title: 'Badges',
  component: Badges,
  argTypes: {
    text: {
      control: { type: StorybookControl.text },
      defaultValue: BadgesType.text
    },
    type: {
      control: { type: StorybookControl.select },
      options: BadgesType,
      defaultValue: BadgesType.default
    },
    choosed: {
      control: { type: StorybookControl.boolean },
      defaultValue: BadgesType.choosed
    },
    leftIcon: {
      control: { type: StorybookControl.text },
      description: 'SVG markup for left icon',
      defaultValue: ''
    },
    rightIcon: {
      control: { type: StorybookControl.text },
      description: 'SVG markup for right icon',
      defaultValue: ''
    }
  }
} as Meta<typeof Badges>;

const Template: StoryFn<typeof Badges> = args => ({
  components: { Badges },
  setup() {
    return { args };
  },
  template: `
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args">{{args.text || 'Все'}}</Badges>
</div>
  `
});

export const DefaultBadges = Template.bind({});
DefaultBadges.args = { type: 'default', text: 'Все' };

export const RemovedBadges = Template.bind({});
RemovedBadges.args = { type: 'blue', text: 'Удалено' };

export const ShippedBadges = Template.bind({});
ShippedBadges.args = { type: 'green', text: 'Отгружено' };

export const OrderedBadges = Template.bind({});
OrderedBadges.args = { type: 'orange', text: 'Заказано' };

export const OverdueBadges = Template.bind({});
OverdueBadges.args = { type: 'red', text: 'Просрочено' };
