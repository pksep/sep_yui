import { StoryFn } from '@storybook/vue3';
import Icon from './Icon.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { IconNameEnum } from './enum/enum';

const meta = {
  title: 'Icon/Icon',
  component: Icon,
  argTypes: {
    height: {
      control: { type: StorybookControlEnum.number },
      defaultValue: 24
    },
    width: {
      control: { type: StorybookControlEnum.number },
      defaultValue: 24
    },
    name: {
      control: { type: StorybookControlEnum.select },
      options: IconNameEnum
    },
    color: {
      control: { type: StorybookControlEnum.color }
    }
  },
  tags: ['autodocs']
};

export default meta;

export const Default: StoryFn<typeof Icon> = args => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `
  <div :style="{color: args.color}">
  <Icon v-bind="args" />
  </div>
  `
});

Default.args = {
  name: IconNameEnum.notification
};

export const TaskStates: StoryFn<typeof Icon> = () => ({
  components: { Icon },
  setup() {
    return {
      states: [
        { name: IconNameEnum.play, label: 'Включено' },
        { name: IconNameEnum.pause, label: 'Остановлено' },
        { name: IconNameEnum.stop, label: 'Отменено' },
        { name: IconNameEnum.circle, label: 'Не настроено' }
      ]
    };
  },
  template: `
    <div style="display: flex; gap: 16px; align-items: center">
      <span v-for="state in states" :key="state.name" style="display: flex; gap: 8px; align-items: center">
        <Icon :name="state.name" :width="16" :height="16" />
        {{ state.label }}
      </span>
    </div>
  `
});
