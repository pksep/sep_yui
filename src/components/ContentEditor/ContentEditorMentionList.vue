<template>
  <div
    class="editor-component__mentions"
    :class="{
      'editor-component__mentions--slash': props.variant === 'slash',
      'editor-component__mentions--modal': props.isModal,
      'editor-component__mentions--fixed': props.isFixed
    }"
    :style="props.positionStyle"
  >
    <button
      v-for="(item, index) in props.items"
      :key="props.getKey(item, index)"
      type="button"
      class="editor-component__mention-item"
      :class="{
        'editor-component__mention-item--active': index === props.selectedIndex
      }"
      :data-mention-active="index === props.selectedIndex"
      @click="emit('select', item)"
    >
      <Avatar
        class="editor-component__mention-avatar"
        :url="props.getAvatarUrl(item)"
        :default-image="props.getAvatarDefaultImage(item)"
        :initials="props.getAvatarInitials(item)"
        :is-online="props.getIsOnline(item)"
      />
      <span class="editor-component__mention-content">
        <span class="editor-component__mention-label">
          {{ props.getLabel(item) }}
        </span>
        <span
          v-if="props.getSubtitle(item)"
          class="editor-component__mention-subtitle"
        >
          {{ props.getSubtitle(item) }}
        </span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import Avatar from '../Avatar/Avatar.vue';

interface Props {
  items: unknown[];
  selectedIndex: number;
  variant?: 'mention' | 'slash';
  isModal?: boolean;
  isFixed?: boolean;
  positionStyle?: Record<string, string>;
  getKey: (item: unknown, index: number) => string | number;
  getLabel: (item: unknown) => string;
  getSubtitle: (item: unknown) => string;
  getAvatarUrl: (item: unknown) => string;
  getAvatarDefaultImage: (item: unknown) => string;
  getAvatarInitials: (item: unknown) => string;
  getIsOnline: (item: unknown) => boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'select', item: unknown): void;
}>();
</script>

<style scoped>
.editor-component__mentions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: var(--white);
  border: 0.5px solid var(--border-color);
  padding: 10px;
  border-radius: 10px;
  min-height: 65px;
  max-height: 220px;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% - 3px);
  z-index: 5;
  box-shadow: 0 4px 9.8px 0 #0000000d;
}

.editor-component__mentions--modal {
  width: 100%;
  bottom: calc(100% - 10px);
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: none;
}

.editor-component__mentions--fixed {
  position: fixed;
  right: auto;
  bottom: auto;
}

.editor-component__mention-item {
  display: flex;
  align-items: center;
  padding: 4px 5px;
  gap: 5px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: var(--text-color);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
}

.editor-component__mention-item:hover,
.editor-component__mention-item--active {
  background-color: var(--primary-hover-light-color);
}

.editor-component__mention-item + .editor-component__mention-item {
  position: relative;
}

.editor-component__mention-item + .editor-component__mention-item::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -5px;
  right: -5px;
  height: 0.5px;
  background-color: var(--border-color);
}

.editor-component__mention-avatar {
  --size-avatar: 13.5px;
  flex-shrink: 0;
}

.editor-component__mention-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.editor-component__mention-label,
.editor-component__mention-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.editor-component__mention-label {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  height: 14px;
}

.editor-component__mention-subtitle {
  display: none;
}

.editor-component__mentions--slash .editor-component__mention-content {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.editor-component__mentions--slash .editor-component__mention-label {
  color: var(--text-color);
}

.editor-component__mentions--slash .editor-component__mention-subtitle {
  display: block;
  color: var(--text-neutral-color);
}

@media screen and (width <= 480px) {
  .editor-component__mentions {
    width: 100%;
  }
}
</style>
