<template>
  <div
    :class="`notification-yui-kit notification-yui-kit_${props.messageType}`"
  >
    <Icon :name="IconNameEnum.crossSmall" class="notification-yui-kit__exit" />
    <div class="notification-yui-kit__block">
      <Icon
        :name="state.messageMap[props.messageType].icon"
        class="notification-yui-kit__block-icon"
      />
      <h4 class="notification-yui-kit__block-title">
        {{ state.messageMap[props.messageType].title }}
      </h4>
      <span class="notification-yui-kit__block-text">
        {{ state.messageMap[props.messageType].description }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { reactive } from 'vue';
import { MessageTypes } from './enum/enum';
import type { IPushNotificationProps } from './interface/interface';

const props = withDefaults(defineProps<IPushNotificationProps>(), {
  messageType: 'info',
  messageField: {
    description: 'Уведомляем о операции'
  }
});

const state = reactive({
  messageMap: {
    [MessageTypes.info]: {
      icon: IconNameEnum.info,
      title: props.messageField.title || 'Уведомление',
      description: props.messageField.description
    },
    [MessageTypes.error]: {
      icon: IconNameEnum.exitCircle,
      title: props.messageField.title || 'Ошибка',
      description: props.messageField.description
    },
    [MessageTypes.warning]: {
      icon: IconNameEnum.alertTriangle,
      title: props.messageField.title || 'Предупреждение',
      description: props.messageField.description
    },
    [MessageTypes.success]: {
      icon: IconNameEnum.checkbox,
      title: props.messageField.title || 'Успешно',
      description: props.messageField.description
    }
  }
});
</script>

<style lang="scss" scoped>
.notification-yui-kit_success {
  --primary-color: var(--green2);
}

.notification-yui-kit_warning {
  --primary-color: var(--orange4);
}

.notification-yui-kit_error {
  --primary-color: var(--red4);
}

.notification-yui-kit_info {
  --primary-color: var(--blue1);
}

.notification-yui-kit {
  display: grid;
  background-color: var(--white);
  border-bottom: 2px solid;
  border-color: var(--primary-color);
  border-radius: 8px;
  box-shadow: 0px 0px 11.2px 0px #8888880f;
  padding-left: 15px;
  padding-right: 5px;
  padding-top: 5px;
  & .notification-yui-kit__exit {
    justify-self: end;
  }
}

.notification-yui-kit .notification-yui-kit__block {
  display: grid;
  grid-template-areas:
    'a b'
    'a c';
  row-gap: 5px;
  column-gap: 15px;
  align-items: center;
  justify-content: start;
  margin-bottom: 20px;
  & .notification-yui-kit__block-icon {
    grid-area: a;
    color: var(--primary-color);
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
