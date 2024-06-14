<template>
  <div class="table-wrapper">
    <table class="table">
      <tr class="table__tr">
        <th class="table__th">№</th>
        <th class="table__th">Заказ</th>
        <th class="table__th">Артикул изделия</th>
        <th class="table__th">Наименование изделия</th>
        <th class="table__th">Комплектация/особенности заказа</th>
        <th class="table__th">Кол-во, шт.</th>
        <th class="table__th">Кол-во, дней</th>
        <th class="table__th">Осталось дней</th>
        <th class="table__th">Основание</th>
        <th class="table__th">Покупатель</th>
        <th class="table__th">Ур. комплектации</th>
        <th class="table__th">Комплектация по остаткам</th>
        <th class="table__th">Готовность к отгрузке в %</th>
        <th class="table__th">Статус</th>
        <th class="table__th">Дата План. отгрузки</th>
        <th class="table__th">Дата Факт. отгрузки</th>
        <th class="table__th">Примечание</th>
      </tr>
      <tr class="table__tr">
        <td class="table__td">...</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">hghfghfgh</td>
        <td class="table__td">Нет комплектации</td>
        <td class="table__td">1</td>
        <td class="table__td">12</td>
        <td class="table__td"><Icon :name="'help'" /></td>
        <td class="table__td">
          <Badges :type="'red'" :text="'text'" />
        </td>
        <td class="table__td">
          <img
            src="https://s8.hostingkartinok.com/uploads/images/2016/08/a131e3cfd554b650c83ab2f5327b8b27.jpg"
            alt=""
          />
        </td>
        <td class="table__td">f</td>
        <td class="table__td">dsfsdfsd</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">sdf</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">hghfghfgh</td>
      </tr>
      <tr class="table__tr">
        <td class="table__td">...</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">hghfghfgh</td>
        <td class="table__td">Нет комплектации</td>
        <td class="table__td">1</td>
        <td class="table__td">12</td>
        <td class="table__td">33</td>
        <td class="table__td">1</td>
        <td class="table__td">f</td>
        <td class="table__td">dsfsdfsd</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">sdf</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">sdfsdf</td>
        <td class="table__td">hghfghfgh</td>
        <td class="table__td">1212344asdfas</td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.table-wrapper {
  overflow: hidden;
  width: 500px;
}
.table {
  padding-bottom: 15px;
  overflow-x: scroll;
}
</style>
