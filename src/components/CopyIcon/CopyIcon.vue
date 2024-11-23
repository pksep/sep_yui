<template>
  <Icon
    class="copy-icon-yui-kit"
    :name="IconNameEnum.copy"
    @click="copyContent"
  />
</template>

<script lang="ts" setup>
import { ICopyIconProps } from './interface/interface';
import { Icon } from '@/components';
import { IconNameEnum } from '@/components/Icon/enum/enum.ts';

const props = withDefaults(defineProps<ICopyIconProps>(), {
  content: ''
});

const copyContent = (): void => {
  navigator.clipboard.writeText(props.content);
};
</script>

<style lang="scss">
.copy-icon-yui-kit {
  cursor: pointer;
  &:hover path {
    fill: $BLUE-77A6FF;
  }
}

.small-yui-kit {
  padding: 13px 11.5px;
  font-size: 14px;
  line-height: 16px;
  min-height: 40px;
}

.medium-yui-kit {
  min-height: 50px;
  padding: 16px 13px;
}

.large-yui-kit {
  min-height: 70px;
  padding: 5px 13px;
  font-size: 18px;
  line-height: 22px;
}

.primary-yui-kit {
  background-color: $BLUE-77A6FF;

  &:active,
  &.active {
    background-color: $BLUE-548CF6;
  }
  &.disabled-yui-kit {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

.secondary-yui-kit {
  background-color: $WHITE-F8F9FD;
  color: $BLUE-77A6FF;

  &:active,
  &.active {
    background-color: $WHITE-ECF3FF;
  }
  &.disabled-yui-kit {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

.outline-yui-kit {
  background-color: $TRANSPARENT;
  border: 1px solid $BLUE-9CBEFF;
  color: $GREY-282828;

  &:active,
  &.active {
    color: $WHITE;
    background-color: $BLUE-548CF6;
  }

  &.disabled-yui-kit {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
    border: 1px solid $WHITE-E7E7E7;
  }
}

.ghost-yui-kit {
  background-color: $TRANSPARENT;
  color: $GREY-282828;

  &:hover {
    background-color: $WHITE-F8F9FD;
  }

  &:active,
  &.active {
    color: $BLUE-77A6FF;
    background-color: $WHITE-ECF3FF;
  }
  &.disabled-yui-kit {
    background-color: $WHITE-E6E6E6;
  }
}
.disabled-yui-kit {
  cursor: auto;
}
.pill-yui-kit {
  border-radius: 10px;
}
</style>
