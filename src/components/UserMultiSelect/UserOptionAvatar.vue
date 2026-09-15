<template>
  <span
    class="board-user-avatar"
    role="img"
    :aria-label="`Пользователь: ${props.name}`"
    :style="avatarStyle"
    :title="props.name"
  >
    <img
      v-if="imageUrl && !state.isImageBroken"
      alt=""
      decoding="async"
      loading="lazy"
      :src="imageUrl"
      @error="handleImageError"
    />
    <span v-else aria-hidden="true">{{ initials }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import type { IUserOptionAvatarProps } from './types';

defineOptions({ name: 'UserOptionAvatar' });

const props = withDefaults(defineProps<IUserOptionAvatarProps>(), {
  image: null,
  size: 24,
  borderRadius: '50%'
});

const state = reactive({
  isImageBroken: false
});

/**
 * Возвращает инициалы пользователя для fallback-аватара.
 */
const initials = computed((): string => {
  // Убираем лишние пробелы, чтобы корректно определить части ФИО.
  const nameParts = props.name.trim().split(/\s+/).filter(Boolean);

  // Для ФИО используем первые буквы первых двух частей.
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }

  // Для логина или одного слова показываем первые два символа.
  return (nameParts[0] || '?').slice(0, 2).toUpperCase();
});

/**
 * Собирает URL изображения из абсолютного пути или имени файла в MinIO.
 */
const imageUrl = computed((): string => {
  // Не создаем сетевой запрос, если у пользователя нет изображения.
  if (!props.image) {
    return '';
  }

  // Абсолютные и встроенные URL можно использовать без преобразования.
  if (/^(?:https?:|data:|blob:)/i.test(props.image)) {
    return props.image;
  }

  // Относительный адрес подготовлен потребителем; библиотека не знает адрес ЕРП.
  return props.image;
});

/**
 * Передает размер компонента в CSS-переменную.
 */
const avatarStyle = computed(() => ({
  '--board-user-avatar-size': `${props.size}px`,
  '--board-user-avatar-radius': props.borderRadius
}));

/**
 * Переключает битое изображение на безопасный fallback с инициалами.
 */
const handleImageError = (): void => {
  // После первой ошибки больше не пытаемся отображать тот же URL.
  state.isImageBroken = true;
};

watch(
  () => props.image,
  () => {
    // Новое изображение должно получить собственную попытку загрузки.
    state.isImageBroken = false;
  }
);
</script>

<style scoped>
.board-user-avatar {
  display: inline-flex;
  flex: 0 0 var(--board-user-avatar-size);
  align-items: center;
  justify-content: center;
  width: var(--board-user-avatar-size);
  height: var(--board-user-avatar-size);
  overflow: hidden;
  border-radius: var(--board-user-avatar-radius);
  background: var(--surface-brand, #d6e4ff);
  color: var(--text-link, #4880ff);
  font-size: calc(var(--board-user-avatar-size) * 0.38);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.board-user-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.board-user-avatar > span {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  transform: translateY(1px);
}
</style>
