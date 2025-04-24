import { StoryFn, Meta } from '@storybook/vue3';
import TableNew from './TableNew.vue';
import { fn } from '@storybook/test';
import HeadTableRowNew from './HeadTableRowNew.vue';
import TableTh from './TableTh.vue';
import TableTd from './TableTd.vue';
import TableRowNew from './TableRowNew.vue';
import SectionTableRow from './SectionTableRow.vue';
import Search from '../Search/Search.vue';
import { ref } from 'vue';

const meta = {
  title: 'TableNew/TableNew',
  component: TableNew,
  args: { onClick: fn() },
  tags: ['autodocs']
} as Meta<typeof TableNew>;

export default meta;

const Template: StoryFn<typeof TableNew> = args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return { args };
  },

  template: `<TableNew >

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`
});

export const Default = Template.bind({});

const HorizontTemplate: StoryFn<typeof TableNew> = args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return { args };
  },
  template: `<TableNew >

    <template #head>
      <HeadTableRowNew>
        <TableTh style="min-width: 50vh">Заголовок 1</TableTh>
        <TableTh style="min-width: 50vh">Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`
});

export const Horizont = HorizontTemplate.bind({});

const FullScrollTemplate: StoryFn<typeof TableNew> = args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return { args };
  },
  template: `<TableNew style="height: 400px">

    <template #head>
      <HeadTableRowNew>
        <TableTh style="min-width: 50vh">Заголовок 1</TableTh>
        <TableTh style="min-width: 50vh">Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`
});

export const fullScroll = FullScrollTemplate.bind({});

const EmptyTemplate: StoryFn<typeof TableNew> = args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    return { args };
  },
  template: `<TableNew style="height: 400px">

    <template #head>
      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
      </TableRowNew>

    </template>

  </TableNew>`
});

export const EmptyItems = EmptyTemplate.bind({});

const AddedTemplate: StoryFn<typeof TableNew> = args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    const rows = ref<[string, string][]>([['Значение 1', 'Значение 2']]);

    const addRow = () => {
      rows.value.push([
        `Новое значение ${rows.value.length + 1}-1`,
        `Новое значение ${rows.value.length + 1}-2`
      ]);
    };
    return { args, rows, addRow };
  },
  template: `
  <div>
    <TableNew style="max-height: 400px">

      <template #head>
        <HeadTableRowNew>
          <TableTh>Заголовок 1</TableTh>
          <TableTh>Заголовок 2</TableTh>
        </HeadTableRowNew>
      </template>
      
      <template #body>

        <TableRowNew v-for="(row, index) in rows" :key="index">
          <TableTd>{{ row[0] }}</TableTd>
          <TableTd>{{ row[1] }}</TableTd>
        </TableRowNew>

      </template>

    </TableNew>

    <button @click="addRow">Добавить</button>
  </div>
  
  `
});

export const AddedWithMaxHeightItems = AddedTemplate.bind({});

const DifficultTemplate: StoryFn<typeof TableNew> = args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow,
    Search
  },
  setup() {
    return { args };
  },
  template: `<TableNew style="height: 400px">

    <template #head>
      <HeadTableRowNew>
        <TableTh colspan='2'>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
      </HeadTableRowNew>

      <HeadTableRowNew>
        <TableTh colspan=3>Заголовок 1</TableTh>
      </HeadTableRowNew>

      <HeadTableRowNew>
        <TableTh>Заголовок 1</TableTh>
        <TableTh>Заголовок 2</TableTh>
        <TableTh>Заголовок 3</TableTh>
      </HeadTableRowNew>
    </template>

    <template #search>
      <Search />
    </template>
    
    <template #body>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd colspan='3'>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd colspan='3'>Значение 2</TableTd>
      </TableRowNew>

      <TableRowNew>
        <TableTd>Значение 1</TableTd>
        <TableTd>Значение 2</TableTd>
        <TableTd>Значение 3</TableTd>
      </TableRowNew>
      

    </template>

  </TableNew>`
});

export const DifficultTable = DifficultTemplate.bind({});

const ScrollFunctionTemplate: StoryFn<typeof TableNew> = args => ({
  components: {
    TableNew,
    HeadTableRowNew,
    TableTh,
    TableTd,
    TableRowNew,
    SectionTableRow
  },
  setup() {
    const tableRef = ref<InstanceType<typeof TableNew> | null>();
    const rows = ref<[string, string][]>([
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2'],
      ['Значение 1', 'Значение 2']
    ]);

    const scrollTop = () => {
      if (tableRef.value) {
        tableRef.value.scrollToTop();
      }
    };
    return { args, rows, scrollTop, tableRef };
  },
  template: `
  <div>
    <TableNew ref="tableRef" style="max-height: 400px">

      <template #head>
        <HeadTableRowNew>
          <TableTh>Заголовок 1</TableTh>
          <TableTh>Заголовок 2</TableTh>
        </HeadTableRowNew>
      </template>
      
      <template #body>

        <TableRowNew v-for="(row, index) in rows" :key="index">
          <TableTd>{{ row[0] }}</TableTd>
          <TableTd>{{ row[1] }}</TableTd>
        </TableRowNew>

      </template>

    </TableNew>

    <button @click="scrollTop">Скролл наверх</button>
  </div>
  
  `
});

export const ScrollFunction = ScrollFunctionTemplate.bind({});
