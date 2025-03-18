import { Meta, StoryFn } from '@storybook/vue3';
import BaseFilter from './BaseFilter.vue';
import { IOptionsObjectWithHint, OptionsObject } from './interface/interface';
import { ref } from 'vue';

const options: OptionsObject[] = [
  {
    key: '1',
    value: 'Прямая'
  },
  {
    key: '2',
    value: 'Косвенная'
  },
  {
    key: '3',
    value: 'Очень ответственная '
  }
];

const optionsWithHint: IOptionsObjectWithHint[] = [
  {
    key: '1',
    value: 'Петров Д.А',
    hint: 'Петров Давид Алексеевич'
  },
  {
    key: '2',
    value: 'Евгений Н.Н',
    hint: 'Евгений Невский Николаевич'
  },
  {
    key: '3',
    value: 'Ольга С.А',
    hint: 'Ольга Сергеевна Александровна'
  },
  {
    key: '4',
    value: 'Ольга Сергеевна Александровна',
    hint: 'Ольга Сергеевна Александровна'
  }
];
const meta: Meta<typeof BaseFilter> = {
  title: 'Select/BaseFilter',
  component: BaseFilter,
  tags: ['autodocs'],
  args: {
    title: 'Операция',
    options
  }
};

export default meta;

const Template: StoryFn<typeof BaseFilter> = args => ({
  components: { BaseFilter },
  setup() {
    const model = ref(null);

    return { args, model };
  },
  template: `
    <BaseFilter v-model="model" v-bind="args" />
  `
});

const MultipleTemplate: StoryFn<typeof BaseFilter> = args => ({
  components: { BaseFilter },
  setup() {
    const model = ref([]);

    return { args, model };
  },
  template: `
    <BaseFilter v-model="model" v-bind="args" />
  `
});

export const Default = Template.bind({});

export const WithHints = Template.bind({});
WithHints.args = {
  options: optionsWithHint,
  isSearch: true,
  isPosibleToClear: true
};

export const Multiple = MultipleTemplate.bind({});

Multiple.args = {
  options,
  isSearch: true,
  isPosibleToClear: true
};
