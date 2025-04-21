<template>
  <div
    popover="manual"
    :id="props.pushKey.toString()"
    :class="`push-notification-yui-kit push-notification-yui-kit_${props.type}`"
    :data-testid="props.dataTestid"
    ref="popover"
  >
    <div
      class="notification-yui-kit"
      :data-testid="`${props.dataTestid}-Notification`"
    >
      <div
        class="notification-yui-kit__block"
        :data-testid="`${props.dataTestid}-Notification-Block`"
      >
        <Icon
          :name="state.message.icon"
          class="notification-yui-kit__block-icon"
          :data-testid="`${props.dataTestid}-Notification-Icon`"
        />
        <h4
          class="notification-yui-kit__block-title"
          :data-testid="`${props.dataTestid}-Notification-Title`"
        >
          {{ state.message.title }}
        </h4>
        <span
          class="notification-yui-kit__block-text"
          :data-testid="`${props.dataTestid}-Notification-Description`"
        >
          {{ state.message.description }}
        </span>
      </div>
      <YButton
        class="notification-yui-kit__exit"
        :type="ButtonTypeEnum.ghost"
        :popovertarget="props.pushKey.toString()"
        :popovertargetaction="hide"
        :data-testid="`${props.dataTestid}-Notification-Button`"
      >
        <Icon
          :name="IconNameEnum.crossSmall"
          :data-testid="`${props.dataTestid}-Notification-Icon`"
        />
      </YButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './../Icon/Icon.vue';
import YButton from '../Button/Button.vue';
import { ButtonTypeEnum } from '../Button/enum/enum';
import { ref, reactive, onMounted } from 'vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { useEventListener } from '@vueuse/core';
import {
  MessageTypeEnum,
  MessageTitleDefaultEnum,
  MessageIconEnum
} from './enum/enum';
import type { IPushNotificationProps } from './interface/interface';

const props = withDefaults(defineProps<IPushNotificationProps>(), {
  type: MessageTypeEnum.info,
  description: '',
  timeout: 3,
  showPopover: true
});

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const popover = ref<HTMLDivElement | null>(null);

useEventListener(popover, 'toggle', () => {
  if (props.timeout > 0) {
    setTimeout(() => popover.value?.hidePopover(), props.timeout * 1000);
  }
});

const hide = (): string => {
  emits('close');
  return 'hide';
};

const showPopover = (): void => {
  popover.value?.showPopover();
};

const state = reactive({
  message: {
    icon: MessageIconEnum[props.type] as unknown as IconNameEnum,
    title: props.title || MessageTitleDefaultEnum[props.type],
    description: props.description
  }
});

onMounted(() => {
  if (props.showPopover) {
    popover.value?.showPopover();
  }
});

defineExpose({
  showPopover
});
</script>

<style lang="scss" scoped>
.push-notification-yui-kit_success {
  --primary-color: var(--green2);
}

.push-notification-yui-kit_warning {
  --primary-color: var(--orange4);
}

.push-notification-yui-kit_error {
  --primary-color: var(--red4);
}

.push-notification-yui-kit_info {
  --primary-color: var(--blue1);
}

.push-notification-yui-kit {
  outline: 0;
  border: 0;
  padding: 0;
  margin: 0 auto;
  margin-right: 15px;
  border-bottom: 2px solid;
  border-color: var(--primary-color);
  background-color: var(--white);
  border-radius: 8px;
}

.button-yui-kit {
  padding: 0;
}

.notification-yui-kit {
  display: grid;
  grid-auto-flow: column;
  box-shadow: 0px 0px 11.2px 0px #8888880f;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-left: 15px;
  padding-right: 5px;
  & .notification-yui-kit__exit {
    justify-self: end;
    align-self: start;
  }
}

.notification-yui-kit .notification-yui-kit__block {
  display: grid;
  justify-self: start;
  grid-template-areas:
    'a b'
    'a c';
  row-gap: 5px;
  column-gap: 15px;
  align-items: center;
  justify-content: start;
  margin-top: 15px;
  margin-bottom: 15px;
  & .notification-yui-kit__block-icon {
    grid-area: a;
    color: var(--primary-color);
  }
  & .notification-yui-kit__block-text {
    display: inline-block;
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
