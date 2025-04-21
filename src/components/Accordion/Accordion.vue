<template>
  <details class="accordion-yui-kit" :data-testid="props.dataTestid">
    <summary
      class="accordion-yui-kit__summary"
      :data-testid="`${props.dataTestid}-Summary`"
    >
      <slot name="summary" />
      <Icon
        :name="IconNameEnum.chevronUp"
        class="chevron-up"
        stroke-width="2"
        :data-testid="`${props.dataTestid}-ChevronUp`"
      />
      <Icon
        :name="IconNameEnum.chevronDown"
        class="chevron-down"
        stroke-width="2"
        :data-testid="`${props.dataTestid}-ChevronDown`"
      />
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import type { IAccordionProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<IAccordionProps>(), {
  dataTestid: 'Accordion'
});
</script>

<style scoped>
.accordion-yui-kit {
  --padding-left: 15px;
  --padding-right: 15px;
  --padding-bottom: 15px;
  --padding: 15px 16px;
  --background: var(--blue18);
}

summary.accordion-yui-kit__summary {
  padding: var(--padding);
  list-style: none;
  border-radius: 5px;
  font-size: 16px;
  color: var(--blue1);
  background: var(--background);
  &:hover {
    cursor: pointer;
    background: var(--blue9);
    opacity: 0.9;
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
  background: var(--background);
  border-radius: 5px;
  padding-bottom: var(--padding-bottom);
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
