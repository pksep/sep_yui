<template>
  <ul class="bread-crumbs">
    <li
      :class="{ 'bread-crumbs__item': true }"
      v-for="(crumb, index) in crumbs"
      :key="crumb.title"
    >
      <span
        v-if="state.items.length >= 5 && index === 1"
        class="bread-crumbs--closed"
        @click="toggleShowList"
        >...</span
      >
      <ul
        v-if="state.items.length >= 5 && index === 1 && state.isShowList"
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
          <span
            @click="toSelectCrumb(subcrumb)"
            :class="{ checked: crumb.isChecked }"
          >
            {{ curtText(subcrumb) }}</span
          >
        </li>
      </ul>
      <div :class="{ 'bread-crumbs__link': true, disabled: crumb.path === '' }">
        <span
          @click="toSelectCrumb(crumb)"
          :class="{ checked: crumb.isChecked }"
          >{{ curtText(crumb) }}</span
        >
        <Icon :name="'rightSmall'" v-if="index !== crumbs.length - 1" />
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
  lastSelectedIndex: -1
});

const emit = defineEmits<{
  (e: 'selectedCrumb', crumb: object): object;
}>();

const maxSymbols = 15;

const toSelectCrumb = (selectedCrumb: {
  title: string;
  isChecked?: boolean;
}) => {
  state.items.forEach(crumb => {
    crumb.isChecked = crumb === selectedCrumb;
  });
  state.lastSelectedIndex = state.items.indexOf(selectedCrumb);
  console.log(state.lastSelectedIndex, 'lastIndex');
  emit('selectedCrumb', selectedCrumb);
  state.isShowList = false;
};

const classesSubCrumbs = computed(() => ({
  'bread-subcrumbs': true,
  scroll: subCrumbs.value.length >= 5,
  active: state.isShowList
}));

const crumbs = computed(() => {
  if (state.items.length > 4 && state.lastSelectedIndex >= 0) {
    return [state.items[0], ...state.items.slice(-3)];
  } else {
    return state.items;
  }
});

const subCrumbs = computed(() => {
  if (state.items.length > 4) {
    return state.items.slice(1, -3);
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
  state.lastSelectedIndex = state.items.length - 1;
  state.items[state.lastSelectedIndex].isChecked = true;
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

    span {
      cursor: pointer;
      white-space: nowrap;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    transition: 0.3s ease-in-out;

    span {
      white-space: nowrap;
      cursor: pointer;
    }

    &.disabled {
      color: $white-E0E0E0;
      user-select: none;
      pointer-events: none;
      cursor: auto;
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

  &__item {
    span.checked {
      background-color: $blue-D6E4FF;
      color: $blue-77A6FF;
      border-radius: 6px;
      padding: 3px 8px;
    }
    &:nth-of-type(2) {
      position: relative;
    }
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
