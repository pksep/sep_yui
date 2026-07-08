<template>
  <tr
    ref="row"
    class="table-row"
    :class="classRow"
    :data-testid="props.dataTestid"
  >
    <template v-if="state.isShow">
      <slot />
    </template>

    <template v-else>
      <slot v-if="$slots['skeleton']" name="skeleton" />

      <TableTd
        v-else
        class="table-row__td table-row__td_stub"
        :colspan="props.colspan"
        :rowspan="props.rowspan"
      >
        <Skeleton class="table-row__skeleton" />
      </TableTd>
    </template>
  </tr>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import type { ITableRow } from '@/components/Table/interface/interface';
import TableTd from '@/components/Table/TableTd.vue';
import Skeleton from '@/components/Skeleton/Skeleton.vue';

defineOptions({
  name: 'TableRow'
});

const props = withDefaults(defineProps<ITableRow>(), {
  type: 'default',
  colspan: 1,
  rowspan: 1,
  isObserved: false
});

const state = reactive<{
  isShow: boolean;
  observer: IntersectionObserver | null;
}>({
  isShow: !props.isObserved,
  observer: null
});

const row = ref<HTMLTableRowElement | null>(null);

const classRow = computed(() => [
  {
    'table-row_active': props.type === 'selected',
    'table-row_is-stub': props.isObserved
  }
]);

const getObserver = (): IntersectionObserver => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          state.isShow = true;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: props.scrolledElement,
      rootMargin: '600px'
    }
  );

  return observer;
};

const setObserver = (): void => {
  if (props.isObserved && row.value) {
    state.observer = getObserver();
    state.observer.observe(row.value);
  }
};

watch(
  () => props.scrolledElement,
  () => {
    state.observer?.disconnect();

    setObserver();
  }
);

onMounted(() => {
  setObserver();
});

onUnmounted(() => {
  state.observer?.disconnect();
});
</script>

<style scoped>
.table-row {
  width: 100%;
  transition: all 0.2s ease;
  cursor: var(--cursor, pointer);
}

.table-row:first-child > * {
  border-top: 0.5px solid transparent;
}

.table-row:last-child > * {
  border-bottom: 0.5px solid var(--border-table);
}

.table-row:hover,
.table-row_active {
  background-color: var(--table-surface-hover);
}

.table-row.ava {
  background-color: var(--table-surface-ava);
}
.table-row.ava:hover,
.table-row.ava_active {
  background-color: var(--table-surface-avaActive);
}
.table-row.ban {
  background-color: var(--table-surface-ban);
}
.table-row.ban:hover,
.table-row.ban_active {
  background-color: var(--table-surface-banActive);
}
.table-row.passive {
  background-color: var(--table-surface);
}

.table-row_is-stub {
}

.table-row__td_stub {
  position: relative;
  height: 100%;
  width: 100%;
}

.table-row__skeleton {
  height: 1lh;
  width: 100%;
}
</style>
