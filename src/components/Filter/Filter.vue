<template>
  <div class="filter-yui-kit" :data-testid="props.dataTestid">
    <!-- основная плашка с статусом и иконкой -->
    <div
      :class="classesFilter"
      @click="toggleShow"
      :data-testid="`${props.dataTestid}-Wrapper`"
    >
      <Icon :name="props.iconName" :data-testid="`${props.dataTestid}-Icon`" />
      <span :data-testid="`${props.dataTestid}-Title`">{{ props.title }}</span>
      <Badges
        :disabled="true"
        :type="computedBadgeType"
        :text="computedBadgeText"
        :style="'margin:0 3px;'"
        :data-testid="`${props.dataTestid}-Badges`"
      />
      <div :class="classes" :data-testid="`${props.dataTestid}-Counter`">
        <span
          class="counter-yui-kit__value"
          v-if="getChoosen.length > 1"
          :data-testid="`${props.dataTestid}-Counter-Value`"
          >{{ '+' + getChoosen.length }}
        </span>
        <div
          class="counter-yui-kit__list"
          :data-testid="`${props.dataTestid}-Counter-List`"
        >
          <div
            class="counter-yui-kit__list-wrapper"
            :data-testid="`${props.dataTestid}-CounterList-Wrapper`"
          >
            <ul
              class="filter-yui-kit__select-list select-yui-kit-counter"
              :style="'padding: 2px; gap: 2px'"
              :data-testid="`${props.dataTestid}-SelectListCounter-Counter`"
            >
              <li
                class="filter-yui-kit__select-item"
                v-for="(item, inx) in getChoosen"
                :key="item.value"
                :data-testid="`${props.dataTestid}-SelectList-SelectItem${inx}`"
              >
                <Badges
                  :type="
                    props.searchable ? BadgesTypeEnum.blue : badgesTypeEnum[inx]
                  "
                  :disabled="true"
                  :text="item.value"
                  :data-testid="`${props.dataTestid}-SelectList-BadgesTypeEnum${inx}`"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="filter-yui-kit__close"
        @click.stop="clearFilter"
        :data-testid="`${props.dataTestid}-SelectList-ClearFilter`"
      >
        <Icon :name="IconNameEnum.exitBig" />
      </button>
    </div>

    <div
      class="filter-yui-kit__select-wrapper"
      v-if="state.isShow"
      @mouseleave="hideFilters"
      :data-testid="`${props.dataTestid}-SelectList-SelectWrapper`"
    >
      <!-- список выбранных фильтров -->
      <ul :class="classesList" :data-testid="`${props.dataTestid}-Select-List`">
        <li
          class="filter-yui-kit__select-item"
          v-for="(item, inx) in getChoosen"
          :key="item.value"
          :data-testid="`${props.dataTestid}-Select-ListItem${inx}`"
        >
          <Badges
            :disabled="true"
            :choosed="item.choose"
            :type="props.searchable ? BadgesTypeEnum.blue : badgesTypeEnum[inx]"
            @click="toogleChoosed(item)"
            :text="item.value"
            :data-testid="`${props.dataTestid}-Select-Badges${inx}`"
          />
        </li>
      </ul>
      <Search
        v-if="props.searchable"
        @enter="updateSearchString"
        @input="changeUpdateSearchString"
        style="margin: 5px 0"
        :data-testid="`${props.dataTestid}-Search`"
      />
      <!-- фильтр со статусом без поиска -->
      <ul
        class="filter-yui-kit__select-list"
        v-if="state.isShow && !props.searchable"
        :data-testid="`${props.dataTestid}-SelectList-NoSearch`"
      >
        <li
          class="filter-yui-kit__select-item"
          v-for="(item, inx) in getNotChoosen"
          :key="item.value"
          :style="inx === 0 ? { paddingTop: '10px' } : ''"
          :data-testid="`${props.dataTestid}-SelectList-Item`"
        >
          <Badges
            :disabled="true"
            :choosed="item.choose"
            :type="badgesTypeEnum[inx]"
            :text="item.value"
            @click="toogleChoosed(item)"
            v-if="!item.choose"
            :data-testid="`${props.dataTestid}-SelectList-Badges`"
          />
        </li>
      </ul>
      <!-- фильтр если есть тип с поиском -->
      <ul
        class="filter-yui-kit__select-list filter-yui-kit__select-list--search"
        v-if="state.isShow && props.searchable"
        @scroll="handleScroll"
        :data-testid="`${props.dataTestid}-SelectList-Search`"
      >
        <li
          class="filter-yui-kit__select-item"
          v-for="(item, inx) in getNotChoosen"
          :key="item.value"
          @click="toogleChoosed(item)"
          :data-testid="`${props.dataTestid}-SelectList-Items${inx}`"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ComputedRef } from 'vue';
import { IFilterOption, IFilterProps, IStateItem } from './interface/interface';
import Badges from '@/components/Badges/Badges.vue';
import { BadgesTypeEnum } from '@/components/Badges/enum/enum';
import Search from '@/components/Search/Search.vue';
import Icon from '@/components/Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { isArray } from 'lodash';

const props = withDefaults(defineProps<IFilterProps>(), {
  iconName: IconNameEnum.filter,
  multiselect: false,
  dataTestid: 'Filter'
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

/**
 * Создаем проверки для классов, устанавливаем их фильтрам, которые попали в скрытый список всех выбранных фильтров.
 */
const classes = computed(() => ({
  'filter-yui-kit__counter': true,
  'counter-yui-kit': true,
  'counter-yui-kit--search': props.searchable
}));

/**
 * Создаем проверки для классов, устанавливаем их выбранным фильтрам
 */
const classesList = computed(() => ({
  'filter-yui-kit__select-list': true,
  'selected-yui-kit': true,
  'selected-yui-kit--search': props.searchable,
  'border-none-yui-kit': props.searchable && getChoosen.value.length < 2
}));

/**
 * Создаем проверки для классов, устанавливаем их основной плашке фильтра.
 */
const classesFilter = computed(() => ({
  'filter-yui-kit__wrapper': true,
  'active-yui-kit': state.isShow,
  'filter-yui-kit--search': props.searchable
}));

/**
 * Создаем проверки для передаваемого текста в фильтры.
 */
const computedBadgeText: ComputedRef<string> = computed(() => {
  if (getChoosen.value.length > 1 && props.searchable) {
    return getChoosen.value[1]?.value;
  } else {
    return getChoosen.value[0]?.value;
  }
});

/**
 * Вытаскиваем значения из энама
 */
const badgesTypeEnum = Object.values(BadgesTypeEnum);

/**
 * @param value: string
 * @returns
 */

/**
 * получаем значение поиска, обрезаем пробелы по концам строки, записываем в стейт
 */
const updateSearchString = (value: string) => {
  state.searchString = value.trim();
};

/**
 * @param value: string
 * @returns
 */

/**
 * получаем значение поиска по каждому изменению, записываем в стейт через 1 секунду
 */
const changeUpdateSearchString = (value: string) => {
  setTimeout(() => {
    state.searchString = value;
  }, 1000);
};

/**
 * показываем, скрываем список фильтров
 */
const toggleShow = () => (state.isShow = !state.isShow);

/**
 * @event e: MouseEvent (click)
 * @returns
 */

/**
 * устанавливаем состояние всего компонента в дефолтное
 */
const clearFilter = (e: MouseEvent) => {
  e.stopPropagation();
  state.options.forEach((el: IStateItem, inx: number) =>
    setDefaultChoosen(el, inx)
  );
  state.isShow = false;
};

/**
 * получаем все выбранные фильтры.
 */
const getChoosen = computed(() => {
  let options = state.options.filter((el: IStateItem) => el.choose);

  if (props.searchable && options.length > 1) {
    options = options.filter(
      (el: IStateItem) => el.type !== BadgesTypeEnum.default
    );
  }

  return options;
});

/**
 * получаем все невыбранные фильтры.
 */
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

/**
 * @param item: {
      value: string;
      type: string;
      choose: boolean;
  * }
 * @returns
 */

/**
 * меняем состояние фильтра с выбранного на невыбранного и наоборот
 */
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

/**
 * @param el: {
      value: string,
      type: string,
      choose: boolean
  * }
 * @param inx: number
 * @returns
 */

/**
 * проверяем переданное дефолтное значение, если нет, то устанавливаем первый фильтр списка, либо ставим фильтр соответствующий дефолтному
 */
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

/**
 * скрываем список фильтров, обнуляем поиск.
 */
const hideFilters = () => {
  state.isShow = false;
  if (state.searchString) {
    state.searchString = '';
  }
};

/**
 * @param event: (scroll)
 * @returns
 */

/**
 * работает при скролле списка, передает булево значение в родителя
 */
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.scrollHeight - target.scrollTop === target.clientHeight) {
    emit('scroll', true);
  }
};

/**
 * высчитывает тип фильтра
 */
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

/**
 * Записываем в список фильтров переданные фильтры. Устанавливает в дефолтное состояние все фильтры и также обнуляет выбранные фильтры, кроме одного.
 */
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
      return newItem;
    }
  ) as IStateItem[];
});
</script>

<style lang="scss" scoped>
.filter-yui-kit {
  display: grid;
  width: fit-content;
  position: relative;

  &__wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    border: 1px solid $WHITE-E7E7E7;
    color: $GREY-757D8A;
    background-color: $WHITE;
    transition: 0.3s ease-in-out;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;

    &:hover {
      border: 1px solid $BLUE-9CBEFF;
    }

    &.active {
      color: $BLUE-9CBEFF;
      border: 1px solid $BLUE-9CBEFF;
    }
  }

  &__counter {
    color: $GREY-757D8A;
  }

  &__select-wrapper {
    position: absolute;
    top: 62px;
    z-index: 20;
    left: 0;
    background-color: $WHITE;
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
      border-bottom: 0.5px solid $WHITE-E7E7E7;
      padding-bottom: 10px;
    }

    &.select-counter {
      background-color: $WHITE;
      border-radius: 10px;
      box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05);
    }

    &--search {
      max-height: 150px;
      overflow-y: scroll;

      .filter__select-item {
        padding: 10px;
        border-bottom: 1px solid $WHITE-E7E7E7;
      }
    }
  }

  &__close {
    color: $GREY-757D8A;
    cursor: pointer;
    background-color: $TRANSPARENT;
    border: 1px solid $TRANSPARENT;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
  }
}

.counter-yui-kit {
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
    .counter-yui-kit__list {
      opacity: 1;
      display: block;

      .filter-yui-kit__select-list {
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
    .filter-yui-kit__select-item {
      width: max-content;
    }

    .base-yui-kit {
      max-width: 187px;

      span.badges-text-yui-kit {
        color: $BLUE-407BFF;
      }
    }

    &:hover .counter-yui-kit__list .filter-yui-kit__select-list {
      display: flex;
      top: 15px;
      z-index: 33;
    }
  }
}

ul.filter-yui-kit__select-list.selected-yui-kit.border-none-yui-kit {
  border-bottom: none;
}
</style>
