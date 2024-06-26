<template>
  <div class="filter">
    <!-- основная плашка с статусом и иконкой -->
    <div :class="classesFilter" @click="toggleShow">
      <Icon :name="props.iconName" />
      <span>{{ props.title }}</span>
      <Badges
        :disabled="true"
        :type="computedBadgeType"
        :text="computedBadgeText"
        :style="'margin:0 3px;'"
      />
      <div :class="classes">
        <span class="counter__value" v-if="getChoosen.length > 1"
          >{{ '+' + getChoosen.length }}
        </span>
        <div class="counter__list">
          <div class="counter__list-wrapper">
            <ul
              class="filter__select-list select-counter"
              :style="'padding: 2px; gap: 2px'"
            >
              <li
                class="filter__select-item"
                v-for="(item, inx) in getChoosen"
                :key="inx"
              >
                <Badges
                  :type="
                    props.searchable ? BadgesTypeEnum.blue : badgesTypeEnum[inx]
                  "
                  :disabled="true"
                  :text="item.value"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button type="button" class="filter__close" @click.stop="clearFilter">
        <Icon :name="IconNameEnum.exitBig" />
      </button>
    </div>

    <div
      class="filter__select-wrapper"
      v-if="state.isShow"
      @mouseleave="hidefilters"
    >
      <!-- список выбранных фильтров -->
      <ul :class="classesList">
        <li
          class="filter__select-item"
          v-for="(item, inx) in getChoosen"
          :key="inx"
        >
          <Badges
            :disabled="true"
            :choosed="item.choose"
            :type="props.searchable ? BadgesTypeEnum.blue : badgesTypeEnum[inx]"
            @click="toogleChoosed(item)"
            :text="item.value"
            v-if="
              props.searchable
                ? item.type != BadgesTypeEnum.default
                : item.choose
            "
          />
        </li>
      </ul>
      <Search
        v-if="props.searchable"
        @enter="updateSearchString"
        @input="changeUpdateSearchString"
        style="margin: 5px 0"
      />
      <!-- фильтр со статусом без поиска -->
      <ul class="filter__select-list" v-if="state.isShow && !props.searchable">
        <li
          class="filter__select-item"
          v-for="(item, inx) in getNotChoosen"
          :key="inx"
          :style="inx === 0 ? { paddingTop: '10px' } : ''"
        >
          <Badges
            :disabled="true"
            :choosed="item.choose"
            :type="badgesTypeEnum[inx]"
            :text="item.value"
            @click="toogleChoosed(item)"
            v-if="!item.choose"
          />
        </li>
      </ul>
      <!-- фильтр если есть тип с поиском -->
      <ul
        class="filter__select-list filter__select-list--search"
        v-if="state.isShow && props.searchable"
        @scroll="handleScroll"
      >
        <li
          class="filter__select-item"
          v-for="(item, inx) in getNotChoosen"
          :key="inx"
          @click="toogleChoosed(item)"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ComputedRef } from 'vue';
import { IFilterOption, IFilterProps, IStateItem } from './interface';
import Badges from '@/components/Badges/Badges.vue';
import { BadgesTypeEnum } from '@/components/Badges/enum';
import Search from '@/components/Search/Search.vue';
import Icon from '@/components/Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum';
import { isArray } from 'lodash';

const props = withDefaults(defineProps<IFilterProps>(), {
  iconName: IconNameEnum.filter,
  multiselect: false
});

const state = reactive({
  options: [] as IStateItem[],
  isShow: false,
  searchString: '',
  choosenStatus: false,
  searchItems: []
});

const emit = defineEmits<{
  (e: 'scroll', value: boolean): void;
}>();

const badgesTypeEnum = Object.values(BadgesTypeEnum);

const updateSearchString = (value: string) => {
  state.searchString = value.trim();
};

const changeUpdateSearchString = (value: string) => {
  setTimeout(() => {
    state.searchString = value;
  }, 1000);
};

const toggleShow = () => (state.isShow = !state.isShow);

const clearFilter = (e: Event) => {
  e.stopPropagation();
  state.options.forEach((el: IStateItem, inx: number) =>
    setDefaultChoosen(el, inx)
  );
  state.isShow = false;
};

const getChoosen = computed(() => {
  let options = state.options.filter((el: IStateItem) => el.choose);

  if (props.searchable && options.length > 1) {
    options = options.filter(
      (el: IStateItem) => el.type !== BadgesTypeEnum.default
    );
  }

  return options;
});

const getNotChoosen = computed(() =>
  state.options.filter((el: IStateItem) => {
    let strCondition = true;
    if (state.searchString) {
      strCondition = el.value
        .toLowerCase()
        .includes(state.searchString.toLowerCase());

      if (strCondition) {
        return el;
      }
    }
    return !el.choose && strCondition;
  })
);

const toogleChoosed = (item: IStateItem) => {
  if (props.multiselect) {
    item.choose = !item.choose;
  } else {
    state.options.forEach(
      (el: IStateItem) => el !== item && (el.choose = false)
    );
    item.choose = !item.choose;
  }

  if (!getChoosen.value.length) {
    state.options.forEach((el: IStateItem, inx: number) => {
      setDefaultChoosen(el, inx);
    });
  }
};

const setDefaultChoosen = (el: IStateItem, inx: number) => {
  const conditionsChoose =
    typeof props.defaultValue === 'string' && el.value === props.defaultValue;

  if (conditionsChoose) el.choose = true;
  else if (isArray(props.defaultValue)) {
    props.defaultValue.forEach(
      (defaultValue: string) => defaultValue === el.value && (el.choose = true)
    );
    // По умолчанию, если дефолтное значение не передано - отображаем первый элемент
  } else el.choose = inx === 0 ? true : false;
};

const hidefilters = () => {
  state.isShow = false;
  if (state.searchString) {
    state.searchString = '';
  }
};

// classes перенсти выше
const classes = computed(() => ({
  filter__counter: true,
  counter: true,
  'counter--search': props.searchable
}));

const classesList = computed(() => ({
  'filter__select-list': true,
  selected: true,
  'selected--search': props.searchable,
  'border-none': props.searchable && getChoosen.value.length < 2
}));

const classesFilter = computed(() => ({
  filter__wrapper: true,
  active: state.isShow,
  'filter--search': props.searchable
}));

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.scrollHeight - target.scrollTop === target.clientHeight) {
    emit('scroll', true);
  }
};

const computedBadgeType: ComputedRef<BadgesTypeEnum | undefined> = computed(
  () => {
    if (getChoosen.value.length <= 1 && props.searchable) {
      return getChoosen.value[0]?.type === BadgesTypeEnum.default
        ? undefined
        : (getChoosen.value[0]?.type as BadgesTypeEnum);
    } else {
      return getChoosen.value[0]?.type as BadgesTypeEnum;
    }
  }
);

const computedBadgeText: ComputedRef<string> = computed(() => {
  if (getChoosen.value.length > 1 && props.searchable) {
    return getChoosen.value[1]?.value;
  } else {
    return getChoosen.value[0]?.value;
  }
});

onMounted(() => {
  state.options = props.options.map(
    (item: string | IFilterOption, inx: number) => {
      const newItem = {
        value: typeof item === 'string' ? item : item.value,
        type: typeof item === 'string' ? 'blue' : item.type,
        choose: false
      };

      setDefaultChoosen(newItem, inx);

      if (props.searchable && newItem.type === BadgesTypeEnum.default) {
        newItem.value = 'Не выбрано';
      }
      console.log(getChoosen.value.length, 'choosen');
      return newItem;
    }
  ) as IStateItem[];
});
</script>

<style lang="scss" scoped>
.filter {
  display: grid;
  width: fit-content;
  position: relative;

  &__wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    border: 1px solid $white-E7E7E7;
    color: $grey-757D8A;
    background-color: $white;
    transition: 0.3s ease-in-out;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;

    &:hover {
      border: 1px solid $blue-9CBEFF;
    }

    &.active {
      color: $blue-9CBEFF;
      border: 1px solid $blue-9CBEFF;
    }
  }

  &__counter {
    color: $grey-757D8A;
  }

  &__select-wrapper {
    position: absolute;
    top: 62px;
    z-index: 20;
    left: 0;
    background-color: $white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05);
    width: 326px;
  }

  &__select-list {
    padding: 0;
    margin: 0;
    list-style-type: none;

    width: 100%;
    display: grid;
    gap: 5px;

    &.selected {
      border-bottom: 0.5px solid $white-E7E7E7;
      padding-bottom: 10px;
    }

    &.select-counter {
      background-color: $white;
      border-radius: 10px;
      box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05);
    }

    &--search {
      max-height: 150px;
      overflow-y: scroll;

      .filter__select-item {
        padding: 10px;
        border-bottom: 1px solid $white-E7E7E7;
      }
    }
  }

  &__close {
    color: $grey-757D8A;
    cursor: pointer;
    background-color: $transparent;
    border: 1px solid $transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
  }
}

.counter {
  position: relative;

  &__list {
    opacity: 0;
    display: none;
  }

  &__list-wrapper {
    width: 187px;
    position: absolute;
  }

  &:hover {
    .counter__list {
      opacity: 1;
      display: block;

      .filter__select-list {
        display: flex;
        position: absolute;
        justify-content: flex-start;
        flex-wrap: wrap;
        top: -30px;
        width: auto;
      }
    }
  }

  &--search {
    .filter__select-item {
      width: max-content;
    }

    .base {
      max-width: 187px;

      span.badges-text {
        color: $blue-407BFF;
      }
    }

    &:hover .counter__list .filter__select-list {
      display: flex;
      top: 15px;
      z-index: 33;
    }
  }
}

ul.filter__select-list.selected.border-none {
  border-bottom: none;
}
</style>
