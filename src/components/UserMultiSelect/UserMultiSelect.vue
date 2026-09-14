<template>
  <div
    ref="wrapperRef"
    class="board-user-filter"
    :class="{
      'board-user-filter--task-card': isTaskCardVariant
    }"
  >
    <YBaseFilter
      v-if="!isTaskCardVariant"
      v-model="model"
      class="board-user-filter__base"
      :data-testid="props.dataTestid"
      :default-option="props.defaultOption"
      :is-posible-to-clear="props.isPosibleToClear"
      :options="props.options"
      :title="props.title"
      @unmount-open="handleOpenChange"
    />

    <button
      v-else
      ref="triggerRef"
      class="board-user-filter__avatar-trigger"
      type="button"
      :aria-controls="optionsId"
      :aria-describedby="state.isSummaryOpened ? summaryId : undefined"
      :aria-expanded="state.isOpened"
      :aria-label="`Исполнители задачи: ${selectedUsers.length}`"
      :data-testid="`${props.dataTestid}-AvatarTrigger`"
      @blur="scheduleSummaryClose"
      @click.stop="toggleTaskCardFilter"
      @focus="showSummary"
      @keydown.esc.stop.prevent="closeTaskCardOverlays(true)"
      @mouseenter="scheduleSummaryOpen"
      @mouseleave="scheduleSummaryClose"
    >
      <UserOptionAvatar
        v-for="user in visibleUsers"
        :key="user.key"
        border-radius="5px"
        :image="user.image"
        :name="user.value"
        :size="20"
      />
      <span
        v-if="hiddenUsersCount"
        aria-hidden="true"
        class="board-user-filter__avatar-count"
      >
        +{{ hiddenUsersCount }}
      </span>
    </button>

    <Teleport to="body" :disabled="!usesFixedOptions">
      <ul
        v-if="state.isOpened"
        :id="optionsId"
        ref="optionsRef"
        class="board-user-filter__options"
        :class="{
          'board-user-filter__options--fixed': usesFixedOptions
        }"
        :data-testid="`${props.dataTestid}-AvatarOptions`"
        :style="usesFixedOptions ? overlayStyle : undefined"
        @click.stop
      >
        <li class="board-user-filter__search">
          <YSearch
            v-model="state.search"
            placeholder="Поиск по ФИО, логину или табельному номеру"
            :data-testid="`${props.dataTestid}-Search`"
            :show-history="false"
          />
        </li>

        <li
          v-for="user in filteredUsers"
          :key="user.key"
          class="board-user-filter__option"
        >
          <button
            class="board-user-filter__option-button"
            type="button"
            :aria-pressed="isSelected(user.key)"
            @click.stop="toggleUser(user.key)"
          >
            <UserOptionAvatar
              :image="user.image"
              :name="user.value"
              :size="28"
            />
            <span class="board-user-filter__option-text">
              <span class="board-user-filter__option-name">
                {{ user.value }}
              </span>
              <span
                v-if="user.serviceNumber"
                class="board-user-filter__option-hint"
              >
                {{ user.serviceNumber }}
              </span>
            </span>
            <span aria-hidden="true" class="board-user-filter__option-check">
              <svg
                v-if="isSelected(user.key)"
                height="18"
                viewBox="0 0 18 18"
                width="18"
              >
                <path d="M3.75 9.25 7.25 12.75 14.25 5.75" />
              </svg>
            </span>
          </button>
        </li>

        <li v-if="!filteredUsers.length" class="board-user-filter__empty">
          Пользователи не найдены
        </li>
      </ul>
    </Teleport>

    <Teleport v-if="isTaskCardVariant" to="body">
      <div
        v-if="state.isSummaryOpened && selectedUsers.length"
        :id="summaryId"
        ref="summaryRef"
        class="board-user-filter__summary"
        data-testid="TaskCard-Assignees-Summary"
        role="tooltip"
        :style="overlayStyle"
        @click.stop
        @mouseenter="cancelSummaryClose"
        @mouseleave="scheduleSummaryClose"
      >
        <div
          v-for="user in selectedUsers"
          :key="user.key"
          class="board-user-filter__summary-option"
        >
          <YBadges :type="BadgesTypeEnum.blue" disabled :text="user.value" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  reactive,
  ref,
  useId,
  watch
} from 'vue';
import UserOptionAvatar from './UserOptionAvatar.vue';
import YBaseFilter from '../Select/BaseFilter.vue';
import YSearch from '../Search/Search.vue';
import YBadges from '../Badges/Badges.vue';
import { BadgesTypeEnum } from '../Badges/enum/enum';
import type { IUserMultiSelectProps, IUserSelectOption } from './types';

defineOptions({ name: 'UserMultiSelect' });

const props = withDefaults(defineProps<IUserMultiSelectProps>(), {
  dataTestid: 'UserMultiSelect',
  defaultOption: 'Не выбран',
  options: () => [],
  title: '',
  variant: 'default',
  isPosibleToClear: true,
  fixedOptions: false
});

const model = defineModel<string[]>({ required: true });
const wrapperRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const optionsRef = ref<HTMLElement | null>(null);
const summaryRef = ref<HTMLElement | null>(null);
const componentId = useId();
const optionsId = `board-user-filter-options-${componentId}`;
const summaryId = `board-user-filter-summary-${componentId}`;
const state = reactive({
  isOpened: false,
  isSummaryOpened: false,
  search: '',
  overlayTop: 0,
  overlayLeft: 0
});

const isTaskCardVariant = computed(() => props.variant === 'task-card');
const usesFixedOptions = computed(
  () => isTaskCardVariant.value || props.fixedOptions
);
const selectedUsers = computed(() => {
  const usersById = new Map(props.options.map(user => [user.key, user]));

  return model.value
    .map(userId => usersById.get(userId))
    .filter((user): user is IUserSelectOption => Boolean(user));
});
const visibleUsers = computed(() => selectedUsers.value.slice(0, 3));
const hiddenUsersCount = computed(() =>
  Math.max(0, selectedUsers.value.length - 3)
);
const overlayStyle = computed(() => ({
  top: `${state.overlayTop}px`,
  left: `${state.overlayLeft}px`
}));

const SUMMARY_OPEN_DELAY_MS = 2000;
const SUMMARY_CLOSE_DELAY_MS = 120;

let summaryOpenTimer: ReturnType<typeof setTimeout> | null = null;
let summaryCloseTimer: ReturnType<typeof setTimeout> | null = null;
let hasGlobalListeners = false;
let hasFixedOptionsViewportListeners = false;

const normalizeSearchValue = (value: string): string =>
  value.toLocaleLowerCase('ru-RU').replace(/\s+/g, ' ').trim();

const filteredUsers = computed(() => {
  const search = normalizeSearchValue(state.search);

  if (!search) {
    return props.options;
  }

  return props.options.filter(user => {
    const searchIndex = normalizeSearchValue(
      `${user.fullName} ${user.value} ${user.serviceNumber}`
    );
    return searchIndex.includes(search);
  });
});

const isSelected = (userId: string): boolean => model.value.includes(userId);

const toggleUser = (userId: string): void => {
  model.value = isSelected(userId)
    ? model.value.filter(id => id !== userId)
    : [...model.value, userId];
};

const cancelSummaryOpen = (): void => {
  if (summaryOpenTimer) {
    clearTimeout(summaryOpenTimer);
    summaryOpenTimer = null;
  }
};

const cancelSummaryClose = (): void => {
  if (summaryCloseTimer) {
    clearTimeout(summaryCloseTimer);
    summaryCloseTimer = null;
  }
};

const updateOverlayPosition = (overlay: HTMLElement | null): void => {
  const anchor =
    triggerRef.value ??
    wrapperRef.value?.querySelector<HTMLElement>('.filter__header') ??
    wrapperRef.value;

  if (!anchor || !overlay) {
    return;
  }

  const viewportGap = 10;
  const overlayGap = 5;
  const triggerRect = anchor.getBoundingClientRect();
  const overlayRect = overlay.getBoundingClientRect();
  const preferredLeft = isTaskCardVariant.value
    ? triggerRect.right - overlayRect.width
    : triggerRect.left;

  state.overlayLeft = Math.min(
    Math.max(viewportGap, preferredLeft),
    window.innerWidth - overlayRect.width - viewportGap
  );

  const preferredTop = triggerRect.bottom + overlayGap;
  state.overlayTop =
    preferredTop + overlayRect.height <= window.innerHeight - viewportGap
      ? preferredTop
      : Math.max(
          viewportGap,
          triggerRect.top - overlayRect.height - overlayGap
        );
};

const showSummary = (): void => {
  cancelSummaryOpen();
  cancelSummaryClose();

  if (!state.isOpened && selectedUsers.value.length) {
    state.isSummaryOpened = true;
    nextTick(() => updateOverlayPosition(summaryRef.value));
  }
};

const scheduleSummaryOpen = (): void => {
  cancelSummaryClose();

  if (state.isOpened || state.isSummaryOpened || !selectedUsers.value.length) {
    return;
  }

  cancelSummaryOpen();
  summaryOpenTimer = setTimeout(showSummary, SUMMARY_OPEN_DELAY_MS);
};

const hideSummary = (): void => {
  cancelSummaryOpen();
  cancelSummaryClose();
  state.isSummaryOpened = false;
};

const scheduleSummaryClose = (): void => {
  cancelSummaryOpen();
  cancelSummaryClose();
  summaryCloseTimer = setTimeout(hideSummary, SUMMARY_CLOSE_DELAY_MS);
};

const handleDocumentClick = (event: MouseEvent): void => {
  const target = event.target as Node;

  if (
    !wrapperRef.value?.contains(target) &&
    !optionsRef.value?.contains(target)
  ) {
    closeTaskCardFilter();
  }
};

const handleViewportChange = (): void => {
  if (state.isOpened) {
    updateOverlayPosition(optionsRef.value);
  }
};

const addGlobalListeners = (): void => {
  if (hasGlobalListeners) {
    return;
  }

  document.addEventListener('click', handleDocumentClick);
  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('scroll', handleViewportChange, true);
  hasGlobalListeners = true;
};

const removeGlobalListeners = (): void => {
  if (!hasGlobalListeners) {
    return;
  }

  document.removeEventListener('click', handleDocumentClick);
  window.removeEventListener('resize', handleViewportChange);
  window.removeEventListener('scroll', handleViewportChange, true);
  hasGlobalListeners = false;
};

/**
 * Подписывает фиксированный список пользователей на изменения viewport.
 */
const addFixedOptionsViewportListeners = (): void => {
  if (hasFixedOptionsViewportListeners) {
    return;
  }

  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('scroll', handleViewportChange, true);
  hasFixedOptionsViewportListeners = true;
};

/**
 * Удаляет подписки фиксированного списка пользователей с viewport.
 */
const removeFixedOptionsViewportListeners = (): void => {
  if (!hasFixedOptionsViewportListeners) {
    return;
  }

  window.removeEventListener('resize', handleViewportChange);
  window.removeEventListener('scroll', handleViewportChange, true);
  hasFixedOptionsViewportListeners = false;
};

const openTaskCardFilter = (): void => {
  hideSummary();
  state.isOpened = true;
  addGlobalListeners();
  nextTick(() => updateOverlayPosition(optionsRef.value));
};

const closeTaskCardFilter = (): void => {
  state.isOpened = false;
  state.search = '';
  removeGlobalListeners();
};

const toggleTaskCardFilter = (): void => {
  if (state.isOpened) {
    closeTaskCardFilter();
  } else {
    openTaskCardFilter();
  }
};

const closeTaskCardOverlays = (restoreFocus = false): void => {
  hideSummary();
  closeTaskCardFilter();

  if (restoreFocus) {
    triggerRef.value?.blur();
  }
};

const handleOpenChange = (isOpened: boolean): void => {
  state.isOpened = isOpened;

  if (!props.fixedOptions) {
    return;
  }

  if (isOpened) {
    addFixedOptionsViewportListeners();
    nextTick(() => updateOverlayPosition(optionsRef.value));
  } else {
    removeFixedOptionsViewportListeners();
  }
};

watch(
  () => state.isOpened,
  isOpened => {
    if (!isOpened) {
      state.search = '';
    }
  }
);

onUnmounted(() => {
  cancelSummaryOpen();
  cancelSummaryClose();
  removeGlobalListeners();
  removeFixedOptionsViewportListeners();
});
</script>

<style scoped>
.board-user-filter {
  position: relative;
  width: fit-content;
}

.board-user-filter__base :deep(.filter__options) {
  display: none !important;
}

.board-user-filter__avatar-trigger {
  display: flex;
  min-width: 0;
  padding: 0;
  align-items: center;
  gap: 2.5px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.board-user-filter__avatar-trigger:focus-visible {
  outline: 2px solid var(--border-hover, var(--border-hover));
  outline-offset: 2px;
  border-radius: 5px;
}

.board-user-filter__avatar-count {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: var(--background-light-color, #f0f0f5);
  color: var(--text-secondary, var(--text-secondary));
  font-size: 8px;
  font-weight: 700;
  line-height: 1;
}

.board-user-filter__options {
  position: absolute;
  z-index: 300;
  inset-block-start: calc(100% + 5px);
  inset-inline-start: var(--board-user-filter-options-left, 0);
  inset-inline-end: var(--board-user-filter-options-right, auto);
  display: flex;
  width: min(334px, calc(100dvw - 20px));
  max-height: min(var(--options-max-height, 390px), calc(100dvh - 20px));
  margin: 0;
  padding: 10px;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  border: 0;
  border-radius: 5px;
  background: var(--surface-overlay, #fff);
  box-shadow: 0 4px 9.8px 0 #0000000d;
  font-family: 'Inter Variable', Avenir, Helvetica, Arial, sans-serif;
  list-style: none;
}

.board-user-filter__options--fixed {
  position: fixed;
  z-index: 9999;
  inset: auto;
}

.board-user-filter__search {
  flex: 0 0 auto;
}

.board-user-filter__search :deep(.search-yui-kit) {
  width: 100%;
}

.board-user-filter__option {
  margin: 0;
  padding: 0;
}

.board-user-filter__option-button {
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: 38px;
  padding: 5px 10px;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--text-primary, var(--text-primary));
  font: inherit;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.board-user-filter__option-button:hover,
.board-user-filter__option-button:focus-visible {
  background: var(--action-secondary-hover-bg, #eef4ff);
}

.board-user-filter__option-button:focus-visible {
  outline: 2px solid var(--border-hover, var(--border-hover));
  outline-offset: -2px;
}

.board-user-filter__option-text {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.board-user-filter__option-name,
.board-user-filter__option-hint {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.board-user-filter__option-name {
  color: var(--text-primary, var(--text-primary));
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
}

.board-user-filter__option-hint {
  color: var(--text-secondary, var(--text-secondary));
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.board-user-filter__option-check {
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  align-items: center;
  justify-content: center;
}

.board-user-filter__option-check svg {
  color: var(--text-blue, #407bff);
}

.board-user-filter__option-check path {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.board-user-filter__empty {
  padding: 12px 10px;
  color: var(--text-grey, var(--text-secondary));
  font-size: 14px;
  text-align: center;
}

.board-user-filter__summary {
  position: fixed;
  z-index: 9999;
  display: flex;
  max-width: min(230px, calc(100vw - 20px));
  max-height: min(180px, calc(100vh - 20px));
  padding: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  overflow: auto;
  border-radius: 5px;
  background: var(--white, #fff);
  box-shadow: 0 4px 9.8px #0000001c;
  font-family: 'Inter Variable', Avenir, Helvetica, Arial, sans-serif;
}

.board-user-filter__summary-option {
  display: flex;
  max-width: 100%;
  padding: 3px;
  align-items: center;
  border-radius: 5px;
  background: var(--primary-hover-light-color, #eef4ff);
}

.board-user-filter__summary-option :deep(.base-yui-kit),
.board-user-filter__summary-option :deep(.badges-text) {
  max-width: 100%;
}

.board-user-filter__summary-option :deep(.badges-text) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
