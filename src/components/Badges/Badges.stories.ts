import { StoryFn } from '@storybook/vue3';
import Badges from './Badges.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { BadgesTypeEnum } from './enum/enum';
import { fn } from '@storybook/test';

const meta = {
  title: 'Badges/Badges',
  component: Badges,
  argTypes: {
    text: {
      control: { type: StorybookControlEnum.text }
    },
    type: {
      control: { type: StorybookControlEnum.select },
      options: BadgesTypeEnum,
      defaultValue: BadgesTypeEnum.default
    },
    choosed: {
      control: { type: StorybookControlEnum.boolean },
      defaultValue: false
    },
    leftIcon: {
      control: { type: StorybookControlEnum.text },
      description: 'SVG markup for left icon',
      defaultValue: ''
    },
    rightIcon: {
      control: { type: StorybookControlEnum.text },
      description: 'SVG markup for right icon',
      defaultValue: ''
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
};

export default meta;

const Template: StoryFn<typeof Badges> = args => ({
  components: { Badges },
  setup() {
    return { args };
  },
  template: `
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Badges v-bind="args" :text="'Все'" />
</div>
  `
});

export const Default: StoryFn<typeof Badges> = args => ({
  components: { Badges },
  setup() {
    return { args };
  },
  template: `<Badges v-bind="args" :text="args.text || 'Все'" />`
});

export const BlueBadges = Template.bind({});
BlueBadges.args = {
  type: BadgesTypeEnum.blue,
  text: 'Удалено'
};

export const GreenBadges = Template.bind({});
GreenBadges.args = {
  type: BadgesTypeEnum.green,
  text: 'Отгружено'
};

export const OrangeBadges = Template.bind({});
OrangeBadges.args = {
  type: BadgesTypeEnum.orange,
  text: 'Заказано'
};

export const RedBadges = Template.bind({});
RedBadges.args = {
  type: BadgesTypeEnum.red,
  text: 'Просрочено'
};

export const ContrastBlueBadges = Template.bind({});
ContrastBlueBadges.args = {
  type: BadgesTypeEnum.contrastBlue,
  text: 'Просрочено'
};
