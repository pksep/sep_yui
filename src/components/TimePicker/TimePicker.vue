<template>
  <div class="time-picker-select">
    <div class="time-picker-select-content" @click="state.openModal = true">
      <Icon :name="IconNameEnum.time" />
      {{ showedValue }}
    </div>
  </div>

  <Dialog
    :open="state.openModal"
    @close="state.openModal = false"
    class="time-picker-dialog"
    width="328px"
  >
    <div class="time-picker-dialog-content">
      <h3>Установка времени</h3>

      <div class="time-picker-header">
        <InputNumber
          v-model="hours"
          :min="0"
          :max="11"
          class="time-picker-input"
          input-message=""
          @click="editingValue = 'hour'"
        />
        <span class="time-picker-separator">:</span>
        <InputNumber
          v-model="minutes"
          :min="0"
          :max="59"
          class="time-picker-input"
          input-message=""
          @click="editingValue = 'minute'"
        />

        <div class="time-picker-ampm">
          <button :class="{ active: period === 'AM' }" @click="setPeriod('AM')">
            AM
          </button>
          <button :class="{ active: period === 'PM' }" @click="setPeriod('PM')">
            PM
          </button>
        </div>
      </div>

      <!-- CLOCK -->
      <div
        class="time-picker-clock"
        ref="clockRef"
        @mousedown="startDrag"
        @click="handleClick"
      >
        <div class="clock-face" v-if="editingValue === 'hour'">
          <div class="clock-hand" :style="handStyleHours"></div>
          <div
            v-for="n in 12"
            :key="n"
            class="clock-number"
            :style="numberStyle(n * 5)"
          >
            {{ n }}
          </div>
        </div>
        <div class="clock-face" v-else>
          <div class="clock-hand" :style="handStyleMinutes"></div>
          <div
            v-for="n in 60"
            :key="n"
            class="clock-number"
            :style="numberStyle(n)"
          >
            {{ n % 5 ? '' : n }}
          </div>
        </div>
      </div>

      <div class="time-picker-actions">
        <button @click="state.openModal = false">Отменить</button>
        <button @click="saveTime">Сохранить</button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onBeforeUnmount } from 'vue';
import { Dialog, Icon, IconNameEnum, InputNumber } from '@/components';

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const hours = ref<number | undefined>();
const minutes = ref<number | undefined>();
const editingValue = ref<'hour' | 'minute'>('hour');
const period = ref<'AM' | 'PM'>('AM');
const clockRef = ref<HTMLElement | null>(null);

const state = reactive({
  openModal: false
});

// --------------------
// DISPLAYED VALUE
// --------------------
const showedValue = computed(() => {
  if (hours.value !== undefined && minutes.value !== undefined) {
    return `${String(hours.value).padStart(2, '0')}:${String(
      minutes.value
    ).padStart(2, '0')} ${period.value}`;
  }
  return '-- --';
});

// --------------------
// CLOCK HAND STYLES
// --------------------
const handStyleHours = computed(() => ({
  transform: `rotate(${(hours.value ?? 0) * 30}deg)`
}));

const handStyleMinutes = computed(() => ({
  transform: `rotate(${(minutes.value ?? 0) * 6}deg)`
}));

const numberStyle = (n: number) => {
  const angle = ((n % 60) / 60) * 360;
  const radius = 100;
  const x = radius * Math.sin((angle * Math.PI) / 180);
  const y = -radius * Math.cos((angle * Math.PI) / 180);
  return {
    left: `calc(50% + ${x}px - 24.5px)`,
    top: `calc(50% + ${y}px - 24.5px)`
  };
};

// --------------------
// CALCULATE ANGLE
// --------------------
function getAngleFromEvent(event: MouseEvent): number {
  const rect = clockRef.value?.getBoundingClientRect();
  if (!rect) return 0;
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  return (angle + 90 + 360) % 360;
}

// --------------------
// UPDATE TIME
// --------------------
function updateTime(event: MouseEvent) {
  const angle = getAngleFromEvent(event);
  if (editingValue.value === 'hour') {
    hours.value = Math.round(angle / 30) % 12;
  } else {
    minutes.value = Math.round(angle / 6) % 60;
  }
}

// --------------------
// CLICK & DRAG HANDLERS
// --------------------
function handleClick(event: MouseEvent) {
  updateTime(event);
}

function startDrag(event: MouseEvent) {
  updateTime(event);
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function onDrag(event: MouseEvent) {
  updateTime(event);
}

function stopDrag() {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

onBeforeUnmount(() => stopDrag());

// --------------------
// SAVE
// --------------------
function setPeriod(p: 'AM' | 'PM') {
  period.value = p;
}

function saveTime() {
  if (hours.value !== undefined && minutes.value !== undefined) {
    const timeStr = `${String(hours.value).padStart(2, '0')}:${String(
      minutes.value
    ).padStart(2, '0')} ${period.value}`;
    emits('update:modelValue', timeStr);
    state.openModal = false;
  }
}
</script>

<style scoped lang="scss">
.time-picker-select {
  width: fit-content;
  height: 44px;
  padding: 5px;
  border-radius: 10px;
  color: var(--grey6);
  background-color: var(--white);
  border: 1px solid var(--border-grey);

  & .time-picker-select-content {
    padding: 5px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    gap: 5px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: var(--blue9);
    }
    &:active {
      color: var(--blue1);
    }
  }
}

.time-picker-dialog {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;

  & .time-picker-dialog-content {
    padding-inline: 8px;
    width: 100%;

    & h3 {
      font-weight: 400;
      font-size: 16px;
      margin: 0;
    }

    & .time-picker-input {
      width: 96px;
      height: 80px;
      gap: 0;
      margin: 0;
      padding: 0;
      background-color: var(--blue15);

      & :deep(.input-yui-kit__input) {
        padding: 0;
        height: 100%;
        font-weight: 400;
        font-size: 55px;
        line-height: 100%;
        text-align: center;
        border: none;
      }

      & :deep(.input-yui-kit__buttons) {
        display: none;
      }
    }

    & .time-picker-separator {
      width: 1px;
      font-weight: 400;
      font-size: 55px;
      line-height: 100%;
      text-align: center;
      transform: translateX(-7px);
    }
  }

  .time-picker-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
    margin-bottom: 16px;

    .time-picker-ampm {
      display: flex;
      flex-direction: column;
      border: 0.5px solid var(--border-grey);
      border-radius: 4px;
      overflow: hidden;

      & button {
        width: 50px;
        height: 40px;
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        line-height: 100%;
        color: var(--grey6);
        overflow: hidden;

        &:first-child {
          height: 39.5px;
          border-bottom: 0.5px solid var(--border-grey);
        }

        &.active {
          background-color: var(--blue9);
          color: var(--blue1);
        }
      }
    }
  }

  .time-picker-clock {
    position: relative;
    width: 256px;
    height: 256px;
    margin: 12px auto;
    border-radius: 50%;
    cursor: pointer;

    & * {
      user-select: none;
    }

    .clock-face {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--blue15);

      .clock-hand {
        width: 2px;
        height: 80px;
        background: #4285f4;
        position: absolute;
        top: calc(50% - 80px);
        left: 50%;
        transform-origin: bottom center;
        transform: rotate(0deg);
      }

      .clock-number {
        position: absolute;
        cursor: pointer;
        width: 45px;
        height: 45px;
        text-align: center;
        line-height: 45px;
      }
    }
  }

  .time-picker-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #4285f4;
      color: white;

      &:first-child {
        background: #eee;
        color: #333;
      }
    }
  }
}
</style>
