import { StoryFn, Meta } from '@storybook/vue3';
import Tooltip from './Tooltip.vue';
import { ref } from 'vue';

const meta = {
  title: 'Tooltip/Tooltip',
  component: Tooltip,
  argTypes: {},
  tags: ['autodocs'],
  args: {
    hint: 'Tooltip tooltip Tooltip tooltip Tooltip tooltip'
  }
} as Meta<typeof Tooltip>;

export default meta;

const Template: StoryFn<typeof Tooltip> = args => ({
  components: { Tooltip },
  setup() {
    const model = ref<string>('Hover over to get a tooltip');
    return { args, model };
  },
  template: `
  <div  style="height: 100px; display: flex; flex-direction:column; gap: 20px; align-items:center; justify-content: center; ">
    <Tooltip v-bind="args" >
      <template #default>
        {{model}}
      </template>
    </Tooltip>

  </div>`
});

export const Default = Template.bind({});

export const Black = Template.bind({});
Black.args = {
  isShow: true
};

export const White = Template.bind({});
White.args = {
  isShow: true,
  type: 'white'
};

export const Blue = Template.bind({});
Blue.args = {
  isShow: true,
  type: 'blue'
};

export const Small = Template.bind({});
Small.args = {
  isShow: true
};

export const Medium = Template.bind({});
Medium.args = {
  isShow: true,
  size: 'medium'
};

export const Large = Template.bind({});
Large.args = {
  isShow: true,
  size: 'large'
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  position: 'bottom-right',
  isShow: true
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  position: 'bottom-left',
  isShow: true
};

export const TopCenter = Template.bind({});
TopCenter.args = {
  position: 'top-center',
  isShow: true
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  position: 'top-left',
  isShow: true
};

export const TopRight = Template.bind({});
TopRight.args = {
  position: 'top-right',
  isShow: true
};

export const LeftCenter = Template.bind({});
LeftCenter.args = {
  position: 'left-center',
  isShow: true
};

export const LeftTop = Template.bind({});
LeftTop.args = {
  position: 'left-top',
  isShow: true
};

export const LeftBottom = Template.bind({});
LeftBottom.args = {
  position: 'left-bottom',
  isShow: true
};

export const RightCenter = Template.bind({});
RightCenter.args = {
  position: 'right-center',
  isShow: true
};

export const RightTop = Template.bind({});
RightTop.args = {
  position: 'right-top',
  isShow: true
};

export const RightBottom = Template.bind({});
RightBottom.args = {
  position: 'right-bottom',
  isShow: true
};
