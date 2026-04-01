<template>
  <div
    :data-testid="props.dataTestid"
    class="avatar-yui-kit"
    :class="{ 'is-online': props.isOnline }"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- Real Image (always rendered if url exists) -->
    <img
      v-if="props.url"
      ref="imageRef"
      :src="props.url"
      :alt="props.alt"
      class="avatar-yui-kit__image"
      :class="{ 'is-visible': isLoaded }"
      @load="onLoad"
      @error="onError"
    />

    <!-- Fallback (always rendered under image) -->
    <div v-if="showFallback" class="avatar-yui-kit__fallback">
      <img
        v-if="props.defaultImage"
        :src="props.defaultImage"
        class="avatar-yui-kit__image is-visible"
      />
      <div v-else class="avatar-yui-kit__text">
        {{ firstSymbol }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const loadedAvatarUrls = new Set<string>();
const failedAvatarUrls = new Set<string>();
</script>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue';
import type { IAvatar } from './interfaces/interfaces';

const props = defineProps<IAvatar>();

const imageRef = ref<HTMLImageElement | null>(null);
const isLoaded = ref(false);
const hasError = ref(false);

const firstSymbol = computed(() => {
  if (!props.initials) return '';
  return props.initials.charAt(0).toUpperCase();
});

const colors = [
  'var(--error-color)',
  'var(--orange4)',
  'var(--green2)',
  'var(--blue24)',
  'var(--blue22)',
  'var(--blue4)',
  'var(--violet2)',
  'var(--pink-color)'
];

const backgroundColor = computed(() => {
  if (!firstSymbol.value) return colors[0];

  const code = firstSymbol.value.charCodeAt(0);
  return colors[code % colors.length];
});

const showFallback = computed(() => {
  return !props.url || !isLoaded.value || hasError.value;
});

const onLoad = () => {
  if (props.url) {
    loadedAvatarUrls.add(props.url);
    failedAvatarUrls.delete(props.url);
  }

  isLoaded.value = true;
  hasError.value = false;
};

const onError = () => {
  if (props.url) {
    failedAvatarUrls.add(props.url);
    loadedAvatarUrls.delete(props.url);
  }

  hasError.value = true;
  isLoaded.value = false;
};

watch(
  () => props.url,
  async newUrl => {
    isLoaded.value = false;
    hasError.value = false;

    if (!newUrl) return;

    if (loadedAvatarUrls.has(newUrl)) {
      isLoaded.value = true;
      return;
    }

    if (failedAvatarUrls.has(newUrl)) {
      hasError.value = true;
      return;
    }

    await nextTick();

    // Handle cached image case
    if (imageRef.value?.complete && imageRef.value.naturalWidth > 0) {
      isLoaded.value = true;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.avatar-yui-kit {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  --online-indicator-size: 9px;

  width: 2em;
  height: 2em;
  min-width: 2em;
  min-height: 2em;

  font-size: var(--size-avatar, 16px);

  color: var(--color, #fff);

  user-select: none;
  container-type: inline-size;
}

.avatar-yui-kit::after {
  content: '';
  transition: all 0.3s ease-in-out;
  transform: scale(0);
  position: absolute;
  background-color: var(--green2);
  width: var(--online-indicator-size);
  height: var(--online-indicator-size);
  border-radius: 50%;
  border: 1px solid var(--white, #fff);
  left: calc(85% - calc(var(--online-indicator-size) / 2));
  top: calc(85% - calc(var(--online-indicator-size) / 2));
  transform-origin: center;
  z-index: 2;
}

@container (min-width: 48px) {
  .avatar-yui-kit::after {
    --online-indicator-size: 12px;
  }
}

.avatar-yui-kit.is-online::after {
  transform: scale(1);
}

/* ============ IMAGE LAYER ============ */
.avatar-yui-kit__image {
  background-color: var(--black);
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 50%;

  opacity: 0;
  transition: opacity 0.18s ease-in-out;
}

.avatar-yui-kit__image.is-visible {
  opacity: 1;
}

/* ============ FALLBACK LAYER ============ */
.avatar-yui-kit__fallback {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  padding-inline: 0.25em;
}

/* initials */
.avatar-yui-kit__text {
  font-size: 1em;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  pointer-events: none;
}
</style>
