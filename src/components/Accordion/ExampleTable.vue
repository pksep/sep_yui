<template>
  <div class="table-yui-kit__border">
    <table class="table-yui-kit">
      <thead>
        <tr class="table-yui-kit__tr">
          <th class="table-yui-kit__th">№</th>
          <th class="table-yui-kit__th">Lorem ipsum</th>
          <th class="table-yui-kit__th">Lorem ipsum</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-yui-kit__tr">
          <td class="table-yui-kit__td">1</td>
          <td class="table-yui-kit__td">Lorem ipsum</td>
          <td class="table-yui-kit__td">Lorem ipsum</td>
        </tr>
        <tr class="table-yui-kit__tr">
          <td class="table-yui-kit__td">2</td>
          <td class="table-yui-kit__td">Lorem ipsum</td>
          <td class="table-yui-kit__td">Lorem ipsum</td>
        </tr>
        <tr class="table-yui-kit__tr">
          <td class="table-yui-kit__td">3</td>
          <td class="table-yui-kit__td">Lorem ipsum</td>
          <td class="table-yui-kit__td">Lorem ipsum</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import '@/assets/scss/blocks/table/_table.scss';

div.table-yui-kit__border {
  margin: 15px;
  margin-bottom: 0;
  margin-top: 5px;
}

table.table-yui-kit {
  width: 100%;
}

tr.table-yui-kit__tr {
  --background: var(--white);
}
</style>
