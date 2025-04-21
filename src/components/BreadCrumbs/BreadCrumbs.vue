<template>
  <ul class="bread-crumbs-yui-kit" :data-testid="props.dataTestid">
    <li
      :class="classesItem.crumbs"
      v-for="(crumb, inx) in state.items"
      :key="crumb.path"
      :data-testid="`${props.dataTestid}-Crumbs${inx}`"
    >
      <div
        v-if="isShowSubList(inx)"
        :data-testid="`${props.dataTestid}-ShowSubList${inx}`"
      >
        <span
          class="bread-crumbs-yui-kit--closed"
          @click="toggleShowList"
          :data-testid="`${props.dataTestid}-Closed${inx}`"
          >...</span
        >

        <ul
          :class="classes.crumbs"
          :data-testid="`${props.dataTestid}-Crumbs${inx}`"
        >
          <li
            v-for="(subCrumb, inx) in state.subCrumbs"
            :key="subCrumb.path"
            :class="classesItem.subcrumbs"
            :data-testid="`${props.dataTestid}-SubCrumbs${inx}`"
          >
            <span
              :title="subCrumb.title"
              @click="toSelectCrumb(subCrumb, inx)"
              :class="{
                'disabled-yui-kit': !subCrumb.path
              }"
              :data-testid="`${props.dataTestid}-SubCrumbs-Title${inx}`"
            >
              {{ curtText(subCrumb) }}
            </span>
          </li>
        </ul>
      </div>

      <div
        :class="state.getClassesLink(crumb, inx === state.crumbs.length - 1)"
        v-if="!crumb.isSub"
        :data-testid="`${props.dataTestid}-Classes${inx}`"
      >
        <span
          :class="state.getClassesSpan(inx)"
          @click="toSelectCrumb(crumb, inx)"
          :data-testid="`${props.dataTestid}-Checked${inx}`"
          >{{ inx !== state.crumbs.length - 1 ? curtText(crumb) : crumb.title
          }}<span
            v-if="state.fullTitle(crumb) && inx !== state.crumbs.length - 1"
            :data-testid="`${props.dataTestid}-FullName`"
            class="fullName-yui-kit"
            >{{ crumb.title }}</span
          ></span
        >
        <Icon
          :name="IconNameEnum.rightSmall"
          :data-testid="`${props.dataTestid}-Icon`"
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

const props = withDefaults(defineProps<IBreadCrumbsProps>(), {
  dataTestid: 'BreadCrumbs'
});

const emit = defineEmits<{
  (e: 'click', item: IBreadCrumbsEmit): void;
}>();

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
  getClassesLink: computed(() => (crumb: IBreadCrumbItems, active = false) => ({
    'bread-crumbs-yui-kit__link': true,
    'disabled-yui-kit': !crumb.path,
    active
  })),
  getClassesSpan: computed(() => (inx: number) => ({
    'checked-yui-kit': inx === state.crumbs.length - 1
  })),
  fullTitle: computed(
    () => (crumb: IBreadCrumbItems) => crumb.title.length > MAX_SYMBOLS
  ),
  isShowList: false
});

const MAX_SYMBOLS = 25;

/**
 * Создает проверку на классы для пунктов в открытом списке
 */

const classesItem = computed(() => ({
  crumbs: {
    'bread-crumbs-yui-kit__item': true
  },
  subcrumbs: {
    'bread-subcrumbs-yui-kit__item': true
  }
}));

/**
 * Создает проверку на классы для пунктов в скрытом списке
 */
const classes = computed(() => ({
  crumbs: {
    'bread-subcrumbs-yui-kit': true,
    'scroll-yui-kit': true,
    'active-yui-kit': state.isShowList
  }
}));

/**
 *
 * @param :
 *    item: {
  path: string;
  title: string;
  }
  * @param :
  *  inx: number
 * @returns
 */
/**
 * Выбрать пункт навигации хлебных крошек
 */
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

/**
 * Показать скрытый список либо закрыть его
 */
const toggleShowList = () => (state.isShowList = !state.isShowList);

/**
 * @param :
 *    crumb: {
    path: string;
    title: string;
    }
 * @returns
 */

/**
 * Обрезает текст хлебной крошки
 */
const curtText = (crumb: IBreadCrumbsItem): string => {
  return crumb.title.length > MAX_SYMBOLS
    ? crumb.title.slice(0, MAX_SYMBOLS).trim() + '...'
    : crumb.title;
};

/**
 * @param :
 *    inx: number
 * @returns
 */

/**
 * Проверка кол-ва хлебных крошек, если больше 4, то поялвяется скрытый список
 */
const isShowSubList = (inx: number) => state.items.length >= 5 && inx === 1;

/**
 * Соединяет в общий массив с хлебными крошками, массив с крошками из скрытого списка.
 */
onMounted(() => {
  return (state.items = state.crumbs.concat(state.subCrumbs));
});
</script>
<style lang="scss" scoped>
.bread-crumbs-yui-kit,
.bread-subcrumbs-yui-kit {
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: $GREY-B8B8B8;
  font-size: 12px;

  & svg {
    margin: 0 -5px;
  }

  &__item {
    display: flex;
    align-items: center;
    position: relative;
    height: 21px;

    div {
      min-height: 100%;
      display: flex;
      align-items: center;
    }
  }

  &__link {
    display: flex;
    align-items: center;

    &:hover {
      .fullName-yui-kit {
        opacity: 1;
      }
    }

    &.active {
      color: var(--blue4);
      background-color: var(--blue12);
      border-radius: 6px;
      padding: 3px 8px;
    }

    span {
      white-space: nowrap;
      cursor: pointer;
    }

    &.disabled-yui-kit {
      color: var(--grey0);
      user-select: none;
      pointer-events: none;
      cursor: auto;
    }

    &:hover {
      color: var(--blue4);
    }
  }
}

.bread-crumbs-yui-kit {
  display: flex;

  &--closed {
    background-color: $BLUE-ECF3FF;
    color: $BLUE-4480F3;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 21px;
    width: 29px;
    padding: 6px;
    border-radius: 6px;
    margin-right: 5px;
    cursor: pointer;

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

.bread-subcrumbs-yui-kit {
  opacity: 0;
  position: absolute;
  padding: 5px 12px;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  background-color: $WHITE;
  z-index: -10000;
  top: 31px;
  color: $GREY-282828;

  &.scroll-yui-kit {
    max-height: 92px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  &.active-yui-kit {
    opacity: 1;
    z-index: 10000;
  }

  &__item {
    padding: 5px 7px 5px 5px;
    border-radius: 2px;

    &:not(:has(.disabled-yui-kit)):hover {
      background-color: $BLUE-D6E4FF;
      border-radius: 6px;
      cursor: pointer;
    }

    & span.disabled-yui-kit {
      color: $WHITE-E0E0E0;
      user-select: none;
      pointer-events: none;
      cursor: default;
      background-color: $TRANSPARENT;
    }
  }

  &__item.checked-yui-kit {
    background-color: $BLUE-EAF2FF;
  }
}

.fullName-yui-kit {
  position: absolute;
  top: -20px;
  left: 60px;
  padding: 5px;
  background-color: $WHITE;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
}
</style>
