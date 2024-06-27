<template>
  <ul class="bread-crumbs">
    <li
      :class="classesItem"
      v-for="(crumb, inx) in state.items"
      :key="state.generateUniqueId"
    >
      <div v-if="isShowSubList(inx)">
        <span class="bread-crumbs--closed" @click="toggleShowList">...</span>

        <ul :class="classes.crumbs">
          <li
            v-for="(subCrumb, inx) in state.subCrumbs"
            :key="state.generateUniqueId"
            :class="classesItem"
          >
            <span @click="toSelectCrumb(subCrumb, inx)">
              {{ curtText(subCrumb)
              }}<span v-if="state.fullTitle(crumb)" class="fullName">{{
                subCrumb.title
              }}</span></span
            >
          </li>
        </ul>
      </div>

      <div :class="state.getClassesLink(crumb)" v-if="!crumb.isSub">
        <span
          :class="state.getClassesSpan(inx)"
          @click="toSelectCrumb(crumb, inx)"
          >{{ curtText(crumb)
          }}<span v-if="state.fullTitle(crumb)" class="fullName">{{
            crumb.title
          }}</span></span
        >
        <Icon
          :name="IconNameEnum.rightSmall"
          v-if="inx !== state.crumbs.length - 1"
        />
      </div>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import {
  IBreadCrumbsItem,
  IBreadCrumbsEmit,
  IBreadCrumbsProps,
  IBreadCrumbItems
} from './interface/interface';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from './../Icon/enum/enum';
import { generateUniqueId } from './../../helpers/genarate-unic-id';

const props = withDefaults(defineProps<IBreadCrumbsProps>(), {});

const state = reactive({
  items: [] as IBreadCrumbsItem[],
  crumbs: computed(() => {
    const minLength = props.items.length < 4 ? props.items.length - 1 : 3;
    let condition = [props.items[0], ...props.items.slice(-minLength)];

    if (props.items.length === 1) condition = [props.items[0]];

    return condition.map(el => {
      el.isSub = false;
      return el;
    });
  }),
  subCrumbs: computed(() => {
    return props.items.slice(1, -3).map(el => {
      el.isSub = true;
      return el;
    });
  }),
  getClassesLink: computed(() => (crumb: IBreadCrumbItems) => ({
    'bread-crumbs__link': true,
    disabled: !crumb.path
  })),
  getClassesSpan: computed(() => (inx: number) => ({
    checked: inx === state.crumbs.length - 1
  })),
  fullTitle: computed(() => (crumb: IBreadCrumbItems) => {
    return computed(() => crumb.title.length > MAX_SYMBOLS);
  }),
  isShowList: false,
  generateUniqueId: generateUniqueId
});

const emit = defineEmits<{
  (e: 'click', item: IBreadCrumbsEmit): void;
}>();

const MAX_SYMBOLS = 15;

const classesItem = computed(() => ({
  'bread-crumbs__item': true
}));

const classes = computed(() => ({
  crumbs: {
    'bread-subcrumbs': true,
    scroll: true,
    active: state.isShowList
  }
}));

const toSelectCrumb = (item: IBreadCrumbsItem, inx: number): void => {
  if (inx === state.items.length - 1) return;

  if (item.isSub) toggleShowList();

  props.items.forEach(({ path }, findIndex) => {
    path === item.path &&
      emit('click', {
        title: item.title,
        path: item.path,
        inx: findIndex + 1
      });
  });
};
const toggleShowList = () => (state.isShowList = !state.isShowList);

const curtText = (crumb: IBreadCrumbsItem): string => {
  return crumb.title.length > MAX_SYMBOLS
    ? crumb.title.slice(0, MAX_SYMBOLS) + '...'
    : crumb.title;
};

const isShowSubList = (inx: number) => state.items.length >= 5 && inx === 1;

onMounted(() => (state.items = state.crumbs.concat(state.subCrumbs)));
</script>
<style lang="scss" scoped>
.bread-crumbs,
.bread-subcrumbs {
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: $GREY-B8B8B8;

  &__item {
    display: flex;
    align-items: center;
    position: relative;

    div {
      min-height: 100%;
      display: flex;
      align-items: center;
    }

    span {
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        .fullName {
          z-index: 1;
          opacity: 1;
        }
      }
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
      color: $WHITE-E0E0E0;
      user-select: none;
      pointer-events: none;
      cursor: auto;
    }

    &:hover {
      color: $BLUE-77A6FF;
    }
  }
}

.bread-crumbs {
  display: flex;

  &--closed {
    background-color: $BLUE-4480F345;
    color: $BLUE-4480F3;
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
      background-color: $BLUE-D6E4FF;
    }
  }

  &__item {
    span.checked {
      background-color: $BLUE-D6E4FF;
      color: $BLUE-77A6FF;
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
  background-color: $WHITE;
  z-index: -10000;
  top: 25px;
  color: $GREY-282828;
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
    background-color: $BLUE-EAF2FF;
  }
}

.fullName {
  position: absolute;
  top: -30px;
  right: 0;
  padding: 5px;
  background-color: $WHITE;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  z-index: -10000;
  opacity: 0;
  transition: 0.3s ease-in-out;
}
</style>
