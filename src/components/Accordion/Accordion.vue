<template>
  <details class="accordion-yui-kit">
    <summary class="accordion-yui-kit__summary">
      <slot name="summary" />
      <Icon
        :name="IconNameEnum.chevronUp"
        class="chevron-up"
        stroke-width="2"
      />
      <Icon
        :name="IconNameEnum.chevronDown"
        class="chevron-down"
        stroke-width="2"
      />
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
</script>

<style scoped>
.accordion-yui-kit {
  --padding-left: 15px;
  --padding-right: 15px;
  --padding-bottom: 15px;
  --padding: 15px 16px;
}

summary.accordion-yui-kit__summary {
  padding: var(--padding);
  list-style: none;
  background: #f9fbff;
  border-radius: 5px;
  font-size: 16px;
  color: #6498ec;
  &:hover {
    cursor: pointer;
    background: #f4f8ff;
  }
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 0.1fr;
  & svg.chevron-up {
    pointer-events: none;
    display: none;
  }
  & svg.chevron-down {
    pointer-events: none;
    justify-self: end;
  }
}

details.accordion-yui-kit[open] {
  background: #f9fbff;
  border-radius: 5px;
  padding-bottom: var(--padding-bottom);
  & > * {
    padding-left: var(--padding-left);
    padding-right: var(--padding-right);
  }
  & summary.accordion-yui-kit__summary {
    & svg.chevron-up {
      display: block;
      justify-self: end;
    }
    & svg.chevron-down {
      display: none;
    }
  }
}

summary::-webkit-accordion-marker {
  display: none;
}
</style>
