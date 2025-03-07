import { StoryFn, Meta } from '@storybook/vue3';
import Table from './Table.vue';
import { fn } from '@storybook/test';
import HeadTableRow from './HeadTableRow.vue';
import TableTh from './TableTh.vue';
import TableTd from './TableTd.vue';
import TableRow from './TableRow.vue';
import SectionTableRow from './SectionTableRow.vue';

const meta = {
  title: 'Table/Table',
  component: Table,
  args: { onClick: fn() },
  tags: ['autodocs']
} as Meta<typeof Table>;

export default meta;

const Template: StoryFn<typeof Table> = args => ({
  components: {
    Table,
    HeadTableRow,
    TableTh,
    TableTd,
    TableRow,
    SectionTableRow
  },
  setup() {
    return { args };
  },
  template: `<Table>
    <template #colgroup>
      <col style="width:50%;"/>
    </template>

    <template #head>
      <HeadTableRow>
        <TableTh colspan="2">Заголовок</TableTh>
      
      </HeadTableRow>

      <HeadTableRow>
        <TableTh>Подзаголовок</TableTh>
        <TableTh>Подзаголовок 2</TableTh>
      </HeadTableRow>
    </template>
    
    <template #body>
      <TableRow>
        <TableTd>Значние 1</TableTd>
        <TableTd>Подзначение 1</TableTd>
      </TableRow>

      <SectionTableRow colspan="2">Разделительный заголовок</SectionTableRow>

      <TableRow>
        <TableTd colspan="2">Значние 2</TableTd>
      </TableRow>

      <TableRow type="selected">
        <TableTd>Выбранное значние 3</TableTd>
        <TableTd>Выбранное подзначение 3</TableTd>
      </TableRow>
    </template>
  </Table>`
});

export const Default = Template.bind({});
