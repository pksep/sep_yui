<template>
  <ul class="bread-crumbs">
    <li
      class="bread-crumbs__item"
      v-for="(crumb, index) in crumbs"
      :key="crumb.title"
    >
      <span
        v-if="state.items.length >= 5 && index === 1"
        class="bread-crumbs--closed"
        @click="() => toggleShowList()"
        >...</span
      >
      <ul
        v-if="state.items.length >= 5 && index === 1"
        :class="classesSubCrumbs"
      >
        <li
          v-for="(subcrumb, index) in subCrumbs"
          :key="subcrumb.title"
          :class="{
            'bread-subcrumbs__item': true,
            checked: subcrumb.isChecked
          }"
        >
          <span @click="toSelectCrumb(subcrumb)">
            {{ curtText(subcrumb) }}</span
          >
        </li>
      </ul>
      <div class="bread-crumbs__link">
        <span @click="toSelectCrumb(crumb)">{{ curtText(crumb) }}</span>
        <Icon :name="'rightSmall'" />
      </div>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { IBreadCrumbsProps } from './interface';
import Icon from './../Icon/Icon';

const props = withDefaults(defineProps<IBreadCrumbsProps>(), {
  items: []
});

const state = reactive({
  items: [],
  isShowList: false,
  isChecked: false
});

const emit = defineEmits<{
  (e: 'selectedCrumb', crumb: object): object;
}>();

const maxSymbols = 15;

// const toSelectCrumb = (crumb: object, isChecked?: boolean) => {
//   if (e.target === crumb) state.isChecked = !state.isChecked;
//   emit('selectedCrumb', crumb);
// };

const toSelectCrumb = (crumb: { title: string; isChecked?: boolean }) => {
  crumb.isChecked = !crumb.isChecked;
  emit('selectedCrumb', crumb);
};

const classesSubCrumbs = computed(() => ({
  'bread-subcrumbs': true,
  scroll: subCrumbs.value.length >= 5,
  active: state.isShowList
}));

const crumbs = computed(() => {
  if (state.items.length >= 5) {
    return [state.items[0], ...state.items.slice(state.items.length - 3)];
  } else {
    return state.items;
  }
});

const subCrumbs = computed(() => {
  if (state.items.length >= 5) {
    return state.items.slice(1, state.items.length - 3);
  }
  return [];
});

const toggleShowList = () => {
  state.isShowList = !state.isShowList;
};

const curtText = (el: { title: string }) => {
  return el.title.length > maxSymbols
    ? el.title.slice(0, maxSymbols) + '...'
    : el.title;
};

onMounted(() => {
  state.items = props.items.map(item => ({ ...item, isChecked: false }));
});
</script>
<style lang="scss">
.bread-crumbs,
.bread-subcrumbs {
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: $grey-B8B8B8;

  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__link {
    display: flex;
    align-items: center;
    transition: 0.3s ease-in-out;

    &.disabled {
      opacity: 0.3;
      user-select: none;
    }

    &:hover {
      color: $blue-77A6FF;
    }
  }
}

.bread-crumbs {
  display: flex;

  &--closed {
    background-color: $blue-4480F345;
    color: $blue-4480F3;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 21px;
    width: 29px;
    padding: 6px;
    border-radius: 6px;
    margin-right: 5px;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: $blue-D6E4FF;
    }
  }

  &__item:nth-of-type(2) {
    position: relative;
  }
}

.bread-subcrumbs {
  opacity: 0;
  position: absolute;
  padding: 5px 12px;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  background-color: $white;
  z-index: -10000;
  top: 25px;
  color: $grey-282828;
  transition: 0.3s ease-in-out;

  &.scroll {
    height: 80px;
    overflow-y: scroll;
  }

  &.active {
    opacity: 1;
    z-index: 10000;
  }

  &__item {
    padding: 0 7px 5px 7px;
    border-radius: 2px;
  }

  &__item.checked {
    background-color: $blue-EAF2FF;
  }
}
</style>
