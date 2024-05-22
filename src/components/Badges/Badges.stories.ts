import { StoryFn, Meta } from '@storybook/vue3';
import Badges from '@/components/Badges/Badges';
import BadgesIcon from '@/components/Badges/BadgesIcon';

export default {
  title: 'Badges',
  component: Badges,
  subcomponents: { BadgesIcon },
  argTypes: {
    text: {
      control: { type: 'text' },
      defaultValue: 'Badges'
    },
    type: {
      control: { type: 'select' },
      options: ['default', 'removed', 'shipped', 'ordered', 'overdue'],
      defaultValue: 'default'
    },
    choosed: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    bgColor: {
      control: { type: 'color' },
      defaultValue: 'ffffff',
      description: 'type: string'
    },
    bgColorText: {
      control: { type: 'color' },
      defaultValue: 'ffffff',
      description: 'type: string'
    },
    color: {
      control: { type: 'color' },
      defaultValue: 'ffffff',
      description: 'type: string'
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'SVG markup for left icon',
      defaultValue: ''
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'SVG markup for right icon',
      defaultValue: ''
    },
    fontSize: {
      control: { type: 'number' },
      description: 'font-size, type: number'
    }
  }
} as Meta<typeof Badges>;

const Template: StoryFn<typeof Badges> = args => ({
  components: { Badges, BadgesIcon },
  setup() {
    return { args };
  },
  template: `
  <ul style="list-style:none; margin: 0; padding: 0; display: grid; gap: 15px;">
  <li v-if="args.type === 'default'">
    <div class="base default" :style="{backgroundColor: args.bgColor}" :class="{'choosed' : args.choosed}">
      <span v-bind="args"  :style="{backgroundColor: args.bgColorText, color: args.color}">
      <BadgesIcon v-if="!args.leftIcon  == ''" :src="args.leftIcon"/>
      {{args.text}}
      <BadgesIcon v-if="!args.rightIcon == ''" :src="args.rightIcon"/>
      </span>
    </div>
  </li>
  <li v-if="args.type === 'removed' ">
    <div  class="base removed" :style="{backgroundColor: args.bgColor}" :class="{'choosed' : args.choosed}">
      <span v-bind="args" :style="{backgroundColor: args.bgColorText, color: args.color}">{{args.text }}</span>
    </div>
  </li>
  <li v-if="args.type === 'shipped' || args.type === 'all'">
    <div  class="base shipped" :style="{backgroundColor: args.bgColor}" :class="{'choosed' : args.choosed}">
      <span v-bind="args"  :style="{backgroundColor: args.bgColorText, color: args.color}">{{args.text }}</span>
    </div>
  </li>
  <li v-if="args.type === 'ordered' || args.type === 'all'">
    <div class="base ordered" :style="{backgroundColor: args.bgColor}" :class="{'choosed' : args.choosed}">
      <span v-bind="args"  :style="{backgroundColor: args.bgColorText, color: args.color}">{{args.text}}</span>
    </div>
  </li>
  <li v-if="args.type === 'overdue' || args.type === 'all'">
    <div class="base overdue" :style="{backgroundColor: args.bgColor}" :class="{'choosed' : args.choosed}">
      <span  v-bind="args"  :style="{backgroundColor: args.bgColorText, color: args.color}">{{args.text }}</span>
    </div>
  </li>
  </ul>
  `
});

export const DefaultBadges = Template.bind({});
DefaultBadges.args = { type: 'default', text: 'Все' };

export const RemovedBadges = Template.bind({});
RemovedBadges.args = { type: 'removed', text: 'Удалено' };

export const ShippedBadges = Template.bind({});
ShippedBadges.args = { type: 'shipped', text: 'Отгружено' };

export const OrderedBadges = Template.bind({});
OrderedBadges.args = { type: 'ordered', text: 'Заказано' };

export const OverdueBadges = Template.bind({});
OverdueBadges.args = { type: 'overdue', text: 'Просрочено' };
