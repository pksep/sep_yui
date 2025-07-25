<template>
  <div
    class="filter-yui-kit"
    v-on-click-outside.bubble="closeShow"
    :data-testid="props.dataTestid"
  >
    <div
      :class="classesFilter"
      @click="toggleShow"
      :data-testid="`${props.dataTestid}-Wrapper`"
    >
      <Icon
        v-if="!!props.iconName"
        :name="props.iconName"
        :data-testid="`${props.dataTestid}-Icon`"
      />
      <span v-if="!!props.title" :data-testid="`${props.dataTestid}-Title`">{{
        props.title
      }}</span>

      <Badges
        v-if="!getChosen.length && !props.disallowNull"
        disabled
        text="Все"
        :data-testid="`${props.dataTestid}-Badges-All`"
      />
      <Badges
        v-else
        v-for="(item, inx) in getChosen.filter(
          (_, i) => i < props.maxShowCount
        )"
        :key="item.value"
        :type="item.type"
        disabled
        :data-testid="`${props.dataTestid}-Badges${inx}`"
        :text="item.label"
      />
      <div
        class="filter-yui-kit__counter"
        v-if="props.maxShowCount < getChosen.length"
        :data-testid="`${props.dataTestid}-MaxShowCount-Counter`"
      >
        +{{ getChosen.length - props.maxShowCount }}
        <div
          class="filter-yui-kit__counter-content"
          :data-testid="`${props.dataTestid}-MaxShowCount-Content`"
        >
          <Badges
            v-for="(item, inx) in getChosen.filter(
              (_, i) => i >= props.maxShowCount
            )"
            :key="item.value"
            :type="item.type"
            disabled
            :text="item.label"
            :data-testid="`${props.dataTestid}-MaxShow-Badges${inx}`"
          />
        </div>
      </div>

      <button
        type="button"
        class="filter-yui-kit__close"
        @click.stop="handleClear"
        v-if="props.showClearButton && getChosen.length > 0"
        :data-testid="`${props.dataTestid}-Filter-CloseButton`"
      >
        <Icon
          :name="IconNameEnum.crossSmall"
          :data-testid="`${props.dataTestid}-CloseButton-Icon`"
        />
      </button>
    </div>

    <div
      class="filter-yui-kit__select-wrapper"
      v-if="state.isShow"
      :data-testid="`${props.dataTestid}-Select-Wrapper`"
    >
      <ul
        class="filter-yui-kit__select-list selected-yui-kit"
        :data-testid="`${props.dataTestid}-Select-List`"
      >
        <li
          v-if="!getChosen.length"
          class="filter-yui-kit__select-item"
          :data-testid="`${props.dataTestid}-Select-Item`"
        >
          <Badges
            disabled
            text="Все"
            :data-testid="`${props.dataTestid}-Select-Badges`"
          />
        </li>
        <li
          class="filter-yui-kit__select-item"
          v-for="(item, inx) in getChosen"
          :key="item.value"
          :data-testid="`${props.dataTestid}-Select-Item${inx}`"
        >
          <Badges
            :disabled="true"
            :choosed="!props.disallowNull && item.chose"
            :type="item.type"
            @click="handleToggle(item)"
            :text="item.label"
            :data-testid="`${props.dataTestid}-Select-Badges${inx}`"
          />
        </li>
      </ul>

      <div
        class="filter-yui-kit__select__divider"
        :data-testid="`${props.dataTestid}-Select-Divider`"
      />

      <ul
        class="filter-yui-kit__select-list"
        v-if="state.isShow"
        :data-testid="`${props.dataTestid}-Select-List`"
      >
        <li
          class="filter-yui-kit__select-item"
          v-for="(item, inx) in getNotChosen"
          :key="item.value"
          :data-testid="`${props.dataTestid}-Select-List${inx}`"
        >
          <Badges
            :disabled="true"
            :choosed="false"
            :type="item.type"
            :text="item.label"
            :data-testid="`${props.dataTestid}-Select-Badges${inx}`"
            @click="handleToggle(item)"
          />
        </li>
        <li
          v-if="!disallowNull"
          class="filter-yui-kit__select-item"
          :data-testid="`${props.dataTestid}-Select-Item`"
        >
          <Badges
            v-if="getChosen.length"
            disabled
            :data-testid="`${props.dataTestid}-Select-Badges`"
            text="Все"
            @click="handleClear"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { IFilterTagProps, IFilterTagOption } from './interface/interface';
import Badges from '@/components/Badges/Badges.vue';
import Icon from '@/components/Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { vOnClickOutside } from '@vueuse/components';
import type { OnClickOutsideHandler } from '@vueuse/core';

type filterTagOptionType = IFilterTagOption & {
  chose?: boolean;
};

interface IFilterTagState {
  isShow: boolean;
  options: filterTagOptionType[];
}

const props = withDefaults(defineProps<IFilterTagProps>(), {
  iconName: IconNameEnum.filter,
  options: () => [],
  selectedValues: () => [],
  maxShowCount: 5,
  multiply: true,
  showClearButton: false,
  dataTestid: 'FilterTag',
  disallowNull: false
});

const state = reactive<IFilterTagState>({
  isShow: false,
  options: []
});

const emits = defineEmits<{
  (e: 'change', value: string[]): void;
}>();

/**
 * Создаем проверки для классов, устанавливаем их основной плашке фильтра.
 */
const classesFilter = computed(() => ({
  'filter-yui-kit__wrapper': true,
  'active-yui-kit': state.isShow
}));

/**
 * показываем, скрываем список фильтров
 */
const toggleShow = () => (state.isShow = !state.isShow);

const closeShow: OnClickOutsideHandler = () => {
  state.isShow = false;
};
/**
 * получаем все выбранные фильтры.
 */
const getChosen = computed(() => {
  return state.options.filter(opt => opt.chose);
});

/**
 * получаем все невыбранные фильтры.
 */
const getNotChosen = computed(() => {
  return state.options.filter(opt => !opt.chose);
});

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
const handleToggle = (item: filterTagOptionType): void => {
  if (props.disallowNull && item.chose) {
    return;
  }
  item.chose = !item.chose;

  if (!props.multiply) {
    state.options = state.options.map(opt => ({
      ...opt,
      chose: item.value === opt.value && item.chose
    }));
  }
  if (state.options.every(opt => opt.chose)) {
    state.options = state.options.map(opt => ({ ...opt, chose: false }));
  }
  emits(
    'change',
    getChosen.value.map(opt => opt.value)
  );
  state.isShow = false;
};

const handleClear = (): void => {
  state.options = state.options.map(opt => ({ ...opt, chose: false }));

  emits('change', []);
};

/**
 * Записываем в список фильтров переданные фильтры. Устанавливает в дефолтное состояние все фильтры и также обнуляет выбранные фильтры, кроме одного.
 */

const setOptions = (): void => {
  state.options = props.options.map(opt => ({
    ...opt,
    chose: props.selectedValues.includes(opt.value)
  }));

  if (state.options.every(opt => opt.chose)) {
    state.options = state.options.map(opt => ({ ...opt, chose: false }));
  }
};

watch(() => [props.options, props.selectedValues], setOptions);

watch(() => props.selectedValues, setOptions);

onMounted(setOptions);
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
    color: var(--grey6);
    background-color: var(--white);
    transition: 0.3s ease-in-out;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;

    & span {
      font-size: 14px;
    }

    &:hover {
      border: 1px solid var(--border-blue);
    }

    &.active-yui-kit {
      color: var(--border-blue);
      border: 1px solid var(--border-blue);
    }

    & .filter-yui-kit__counter {
      color: var(--grey6);
      position: relative;
      font-size: 14px;

      &:hover {
        color: var(--border-blue);

        & .filter-yui-kit__counter-content {
          position: absolute;
          bottom: calc(100% + 5px);
          left: 0;
          display: flex;
          z-index: 20;
          background-color: var(--white);
          padding: 5px;
          border-radius: 5px;
          box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05);
          width: max-content;
          gap: 5px;
        }
      }

      & .filter-yui-kit__counter-content {
        display: none;
      }
    }
  }

  &__select-wrapper {
    position: absolute;
    top: calc(100% + 5px);
    z-index: 20;
    left: 0;
    background-color: var(--white);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05);
    width: 100%;

    & .filter-yui-kit__select__divider {
      width: 100%;
      height: 0.5px;
      margin-block: 10px;
      background-color: var(--border-grey);
    }
  }

  &__select-list {
    padding: 0;
    margin: 0;
    list-style-type: none;

    width: 100%;
    display: grid;
    gap: 5px;

    &.selected {
      border-bottom: 0.5px solid var(--border-grey);
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
        border-bottom: 1px solid var(--border-grey);
      }
    }
  }

  &__close {
    color: var(--grey6);
    cursor: pointer;
    background-color: transparent;
    border: 1px solid transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
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
  }
}

ul.filter-yui-kit__select-list.selected-yui-kit.border-none-yui-kit {
  border-bottom: none;
}

.filter-yui-kit__wrapper {
  gap: 5px;
  height: 44px;
}
</style>
