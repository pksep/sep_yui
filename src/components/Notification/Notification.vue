<template>
  <div class="notification-yui-kit">
    <Icon :name="IconNameEnum.crossLarge" class="notification-yui-kit__exit" />
    <div class="notification-yui-kit__block">
      <Icon
        :name="IconNameEnum.exit"
        class="notification-yui-kit__block-close"
      />
      <h4 class="notification-yui-kit__block-title">Успешно</h4>
      <span class="notification-yui-kit__block-text">
        Файл успешно добавлен в архив
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
</script>

<style lang="scss" scoped>
.notification-yui-kit {
  display: grid;
  background-color: var(--white);
  border-bottom: 2px solid var(--green2);
  border-radius: 8px;
  box-shadow: 0px 0px 11.2px 0px #8888880f;
  padding-left: 15px;
  padding-right: 5px;
  padding-top: 5px;
  & .notification-yui-kit__exit {
    justify-self: end;
    width: 16px;
    height: 16px;
  }
}

.notification-yui-kit .notification-yui-kit__block {
  display: grid;
  grid-template-areas:
    'a b'
    'a c';
  gap: 5px;
  align-items: center;
  margin-right: 28px;
  margin-bottom: 20px;
  & .notification-yui-kit__block-close {
    grid-area: a;
    margin-right: 10px;
  }
  & .notification-yui-kit__block-text {
    grid-area: c;
    font-size: 12px;
  }
  & .notification-yui-kit__block-title {
    margin: 0;
    font-weight: bold;
    font-size: 14px;
    grid-area: b;
  }
}
</style>
