<template>
  <div class="time-picker-select">
    <div class="time-picker-select-content" @click="openModal">
      <Icon :name="IconNameEnum.time" />
      <span>{{ showedValue }}</span>
      <div
        class="time-picker-select-clear"
        @click.stop="clearTime"
        v-if="
          state.localHours !== undefined || state.localMinutes !== undefined
        "
      >
        <Icon :name="IconNameEnum.closeTag" :width="16" :height="16" />
      </div>
    </div>
  </div>

  <Dialog
    :open="state.openModal"
    @close="closeModal"
    class="time-picker-dialog"
    width="328px"
  >
    <div class="time-picker-dialog-content">
      <h3>Установка времени</h3>

      <div class="time-picker-header">
        <InputNumber
          :model-value="state.hours"
          @update:model-value="value => (state.hours = +value)"
          :min="0"
          :max="23"
          :class="{
            'time-picker-input': true,
            pressed: state.editingValue === 'hour'
          }"
          input-message=""
          is-integer
          zero-pad
          @click="state.editingValue = 'hour'"
        />
        <span class="time-picker-separator">:</span>
        <InputNumber
          :model-value="state.minutes"
          @update:model-value="value => (state.minutes = +value)"
          :min="0"
          :max="59"
          :class="{
            'time-picker-input': true,
            pressed: state.editingValue === 'minute'
          }"
          input-message=""
          is-integer
          zero-pad
          @click="state.editingValue = 'minute'"
        />
      </div>

      <!-- CLOCK -->
      <div
        v-if="state.openClock"
        class="time-picker-clock"
        ref="clockRef"
        @mousedown="startDrag"
        @click="handleClick"
      >
        <!-- HOURS -->
        <div class="clock-face" v-if="state.editingValue === 'hour'">
          <div class="clock-hand" :style="handStyleHours"></div>

          <!-- OUTER RING 1–12 -->
          <div
            v-for="n in 12"
            :key="'outer-' + n"
            :class="{
              'clock-number': true,
              active: n === Number(state.hours)
            }"
            :style="numberStyle(n, 100)"
          >
            {{ n }}
          </div>

          <!-- INNER RING 13–24 -->
          <div
            v-for="n in 12"
            :key="'inner-' + n"
            :class="{
              'clock-number': true,
              active: n + 12 === (Number(state.hours) || 24)
            }"
            :style="numberStyle(n + 12, 70)"
          >
            {{ n + 12 }}
          </div>
        </div>

        <!-- MINUTES -->
        <div class="clock-face" v-else>
          <div class="clock-hand" :style="handStyleMinutes"></div>
          <div
            v-for="n in Array.from({ length: 60 }, (_, i) => i)"
            :key="n"
            :class="{
              'clock-number': true,
              active: n === Number(state.minutes || 0)
            }"
            :style="numberStyle(n / 5, 100)"
          >
            <div
              v-if="n === Number(state.minutes) && n % 5"
              class="clock-number__dot"
            />
            {{ n % 5 ? '' : n % 60 }}
          </div>
        </div>

        <div class="clock-hand-center"></div>
      </div>

      <div class="time-picker-actions">
        <div
          class="time-picker-actions__switch"
          @click="state.openClock = !state.openClock"
        >
          <Icon
            :name="state.openClock ? IconNameEnum.keyboard : IconNameEnum.time"
          />
        </div>
        <Button :type="ButtonTypeEnum.ghost" @click="closeModal"
          >Отменить</Button
        >
        <Button :type="ButtonTypeEnum.primary" @click="saveTime"
          >Сохранить</Button
        >
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue';
import Button from '../Button/Button.vue';
import InputNumber from '../InputNumber/InputNumber.vue';
import Dialog from '../Dialog/Dialog.vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { ButtonTypeEnum } from '../Button/enum/enum';

interface IState {
  openModal: boolean;
  hours: number | undefined;
  minutes: number | undefined;
  editingValue: 'hour' | 'minute';
  openClock: boolean;
  localHours: number | undefined;
  localMinutes: number | undefined;
}

const props = defineProps<{
  modelValue?: string | null; // ISO UTC string
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

const state = reactive<IState>({
  openModal: false,
  hours: undefined,
  minutes: undefined,
  editingValue: 'hour',
  openClock: false,
  localHours: undefined,
  localMinutes: undefined
});

const clockRef = ref<HTMLElement | null>(null);

// --- Watch modelValue (UTC → local)
watch(
  () => props.modelValue,
  val => {
    if (val) {
      const date = new Date(val);
      state.localHours = date.getHours();
      state.localMinutes = date.getMinutes();
    } else {
      state.localHours = undefined;
      state.localMinutes = undefined;
    }
  },
  { immediate: true }
);

// --- Copy local time when modal opens
watch(
  () => state.openModal,
  open => {
    if (open) {
      state.hours = Number(state.localHours) || 0;
      state.minutes = Number(state.localMinutes) || 0;
    }
  }
);

// --- Computed
const showedValue = computed(() => {
  if (state.localHours !== undefined && state.localMinutes !== undefined) {
    return `${String(state.localHours).padStart(2, '0')}:${String(
      state.localMinutes
    ).padStart(2, '0')}`;
  }
  return '-- --';
});

const handStyleHours = computed(() => ({
  transform: `rotate(${((state.hours ?? 0) % 12) * 30}deg)`
}));

const handStyleMinutes = computed(() => ({
  transform: `rotate(${(state.minutes ?? 0) * 6}deg)`
}));

// --- Dual ring number placement
function numberStyle(n: number, radius = 100) {
  const angle = ((n % 12) / 12) * 360;
  const x = radius * Math.sin((angle * Math.PI) / 180);
  const y = -radius * Math.cos((angle * Math.PI) / 180);
  return {
    left: `calc(50% + ${x}px - 24.5px)`,
    top: `calc(50% + ${y}px - 23.5px)`
  };
}

// --- Clock interaction
function getAngleFromEvent(event: MouseEvent): number {
  const rect = clockRef.value?.getBoundingClientRect();
  if (!rect) return 0;
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  return (angle + 90 + 360) % 360;
}

function updateTime(event: MouseEvent) {
  const angle = getAngleFromEvent(event);
  if (state.editingValue === 'hour') {
    const distance = Math.hypot(
      event.clientX - (clockRef.value!.getBoundingClientRect().left + 128),
      event.clientY - (clockRef.value!.getBoundingClientRect().top + 128)
    );
    const isInner = distance < 90;
    const baseHour = Math.round(angle / 30) % 12 || 12;
    state.hours = (isInner ? baseHour + 12 : baseHour) % 24;
  } else {
    state.minutes = Math.round(angle / 6) % 60;
  }
}

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

// --- Modal actions
function closeModal() {
  state.openModal = false;
}

function openModal() {
  state.editingValue = 'hour';
  state.openModal = true;
}

// --- Save local → UTC ISO
function saveTime() {
  if (state.hours === undefined || state.minutes === undefined) return;
  const baseDate = props.modelValue ? new Date(props.modelValue) : new Date();
  const localDate = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    +state.hours,
    +state.minutes,
    0,
    0
  );
  const utcString = new Date(localDate.getTime()).toISOString();
  emits('update:modelValue', utcString);
  state.localHours = state.hours;
  state.localMinutes = state.minutes;
  closeModal();
}

// --- Clear
function clearTime() {
  state.hours = undefined;
  state.minutes = undefined;
  state.localHours = undefined;
  state.localMinutes = undefined;
  emits('update:modelValue', null);
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
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    gap: 5px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    & > span {
      font-size: 14px;
      line-height: 21px;
    }

    &:hover {
      background-color: var(--blue9);
    }
    &:active {
      color: var(--blue1);
    }

    & .time-picker-select-clear {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      color: var(--black);
      &:hover {
        background-color: var(--white);
      }
      &:active {
        color: var(--blue1);
      }
    }
  }
}

.time-picker-dialog {
  background: var(--white);
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
      background-color: var(--blue15);
      &.pressed :deep(.input-yui-kit__input) {
        color: var(--blue20);
      }

      & :deep(.input-yui-kit__input) {
        padding: 0;
        height: 100%;
        font-weight: 400;
        font-size: 55px;
        line-height: 100%;
        text-align: center;
        border: none;
      }

      & :deep(.pressed) {
        color: var(--blue1) !important;
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
        height: 78px;
        background: var(--blue1);
        position: absolute;
        top: calc(50% - 79px);
        left: calc(50% - 3px);
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
        z-index: 2;
        font-size: 14px;

        &.active {
          color: var(--white);
          border-radius: 50%;
          background: var(--blue1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        & .clock-number__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--white);
        }
      }
    }

    .clock-hand-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-6px, -5px);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--blue1);
    }
  }

  .time-picker-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    color: var(--grey6);

    & .time-picker-actions__switch {
      height: 24px;
      margin-right: auto;
      cursor: pointer;
      &:hover {
        color: var(--blue1);
      }
    }
  }
}
</style>
