<!-- Vue 3 passes these slots to the calendar web component. -->
<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <col-cal
    :date.prop="selectedDate"
    :minDate.prop="minDate"
    :maxDate.prop="maxDate"
    :locale="props.locale"
    :data-testid="props.dataTestid"
    @show-months="activePopup = 'months'"
    @show-years="activePopup = 'years'"
    @hide-months="hidePopup('months')"
    @hide-years="hidePopup('years')"
    @change-month="changeMonth"
    @change-year="changeYear"
    @change-date="changeDate"
  >
    <Icon
      v-for="name in ['months', 'years']"
      :key="name"
      :slot="`${name}-popup-icon`"
      :class="
        activePopup === name
          ? 'open-popup'
          : 'date-picker__icon date-picker__icon_area'
      "
      :name="
        activePopup === name ? IconNameEnum.chevronUp : IconNameEnum.chevronDown
      "
      :width="16"
      :height="16"
    />
    <Icon
      v-for="icon in navigationIcons"
      :key="icon.slot"
      :slot="icon.slot"
      class="date-picker__icon"
      :name="icon.name"
      :width="16"
      :height="16"
    />
  </col-cal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import '@pksep/col-cal';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';

const props = withDefaults(
  defineProps<{
    date: Date | null;
    startDate?: Date | null;
    endDate?: Date | null;
    locale?: string;
    dataTestid: string;
  }>(),
  { locale: 'ru-RU' }
);

const emits = defineEmits<{ (e: 'change', value: Date): void }>();

// col-cal mutates its date bounds, so never pass the range's Date objects.
const selectedDate = computed(() => (props.date ? new Date(props.date) : null));
const viewDate = ref(props.date ? new Date(props.date) : new Date());
const activePopup = ref<'months' | 'years' | null>(null);

const navigationIcons = [
  { slot: 'icon-left-button', name: IconNameEnum.chevronLeft },
  { slot: 'icon-right-button', name: IconNameEnum.chevronRight },
  { slot: 'years-icon-left', name: IconNameEnum.chevronLeft },
  { slot: 'years-icon-right', name: IconNameEnum.chevronRight }
];

const minDate = computed(() => {
  if (!props.startDate) return null;
  const date = new Date(props.startDate);
  date.setHours(0, 0, 0, 0);
  if (activePopup.value === 'months') date.setDate(1);
  if (activePopup.value === 'years') date.setMonth(0, 1);
  return date;
});

const maxDate = computed(() => {
  const date = props.endDate ? new Date(props.endDate) : new Date(9999, 11, 31);
  date.setHours(23, 59, 59, 999);
  if (activePopup.value === 'months') {
    date.setMonth(date.getMonth() + 1, 0);
  }
  if (activePopup.value === 'years') date.setMonth(11, 31);
  return date;
});

const hidePopup = (name: 'months' | 'years'): void => {
  if (activePopup.value === name) activePopup.value = null;
};

const changeMonth = ({
  detail
}: {
  detail: Date | { month: number } | null;
}): void => {
  if (detail instanceof Date) {
    viewDate.value = new Date(detail.getFullYear(), detail.getMonth(), 1);
  } else if (detail) {
    viewDate.value = new Date(viewDate.value.getFullYear(), detail.month, 1);
  }
};

const changeYear = ({ detail }: { detail: { year: number } | null }): void => {
  if (detail) {
    viewDate.value = new Date(detail.year, viewDate.value.getMonth(), 1);
  }
};

const changeDate = ({ detail }: { detail: { date: Date | null } }): void => {
  const date = detail?.date;
  if (
    !date ||
    date.getFullYear() !== viewDate.value.getFullYear() ||
    date.getMonth() !== viewDate.value.getMonth()
  ) {
    return;
  }

  const selected = new Date(date);
  if (props.date) {
    selected.setHours(props.date.getHours(), props.date.getMinutes());
  }
  emits('change', selected);
};
</script>
