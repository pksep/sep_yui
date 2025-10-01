<template>
  <div :data-testid="props.dataTestid" class="tabs">
    <nav
      class="tabs__navigation"
      :data-testid="`${props.dataTestid}-Navigation`"
    >
      <template v-for="index in generateArray(props.tabCount)" :key="index">
        <button
          @click="handleSelectTab(index)"
          :class="[
            'tabs__navigation-button',
            {
              active: state.activeTab === index
            }
          ]"
          :data-testid="`${props.dataTestid}-Navigation-Button`"
        >
          <slot :name="`header${index}`" />
        </button>
      </template>
    </nav>

    <template v-for="index in generateArray(props.tabCount)" :key="index">
      <article
        v-if="state.activeTab === index"
        :data-testid="`${props.dataTestid}-Content`"
        class="tabs__navigation-content"
      >
        <slot :name="`tab${index}`" />
      </article>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ITabsEmit, ITabsProps } from './interface/interface';

defineOptions({
  name: 'Tabs'
});

const props = withDefaults(defineProps<ITabsProps>(), {
  dataTestid: 'Tabs'
});

const emits = defineEmits<ITabsEmit>();

const state = reactive({
  activeTab: 1 as number
});

const generateArray = (n: number): number[] => {
  return Array.from({ length: n }, (_, i) => i + 1);
};

const handleSelectTab = (id: number): void => {
  state.activeTab = id;
  emits('unmount-tab', id);
};
</script>

<style scoped>
.tabs {
  display: grid;
}

.tabs__navigation {
  display: flex;
  justify-content: space-evenly;
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  border-bottom-color: var(--border-grey);
}

button.tabs__navigation-button {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
  color: var(--text-black);
  background: transparent;
  padding-bottom: 5px;
  border: 0;
  &:hover,
  &.active {
    border-bottom-style: solid;
    border-bottom-width: 0.5px;
    border-bottom-color: var(--text-black);
  }
}
</style>
