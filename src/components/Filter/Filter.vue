<template>
  <div class="filter">
    <div
      :class="{ filter__wrapper: true, active: state.isShow }"
      @click="toggleShow"
    >
      <Icon :name="props.iconName" />
      <span>{{ props.title }}</span>
      <Badges
        :disabled="true"
        :type="getChoosen[0]?.type"
        :text="getChoosen[0]?.value"
      />
      <div class="filter__counter counter">
        <span class="counter__value">{{ '+' + getChoosen.length }} </span>
        <div class="counter__list">
          <ul class="filter__select-list">
            <li
              class="filter__select-item"
              v-for="(item, inx) in getChoosen"
              :key="inx"
            >
              <Badges :type="item.type" :disabled="true" :text="item.value" />
            </li>
          </ul>
        </div>
      </div>
      <button type="button" class="filter__close" @click.stop="clearFilter">
        <Icon :name="'exitBig'" />
      </button>
    </div>

    <ul class="filter__select-list" v-if="state.isShow">
      <li
        class="filter__select-item"
        v-for="(item, inx) in state.items"
        :key="inx"
      >
        <div class="choosen" v-if="item.choose">
          <Badges
            :disabled="true"
            :choosed="item.choose"
            :type="item.type"
            @click="toogleChoosed(item)"
            :text="item.value"
          />
        </div>

        <div class="unchoosen" v-if="!item.choose">
          <Badges
            :disabled="true"
            :choosed="item.choose"
            :type="item.type"
            :text="item.value"
            @click="toogleChoosed(item)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { IFilterProps, IStateItem } from './interface';
import Badges from '@/components/Badges/Badges';
import Icon from '@/components/Icon/Icon';
import { IconNameEnum } from '../Icon/enum';
import { isArray } from 'lodash';

const props = withDefaults(defineProps<IFilterProps>(), {
  iconName: IconNameEnum.filter,
  multiselect: false
});

const state = reactive({
  items: [] as IStateItem[],
  isShow: false,
  choosenStatus: false
});

const toggleShow = () => (state.isShow = !state.isShow);

const clearFilter = (e: Event) => {
  e.stopPropagation();
  state.items.forEach((el, inx) => setDefaultChoosen(el, inx));
  state.isShow = false;
};

const getChoosen = computed(() => state.items.filter(el => el.choose));

const toogleChoosed = (item: IStateItem) => {
  item.choose = !item.choose;

  if (!getChoosen.value.length) {
    state.items.forEach((el, inx) => setDefaultChoosen(el, inx));
  }
};

const setDefaultChoosen = (el: IStateItem, inx: number) => {
  if (typeof props.defaultValue === 'string' && el.value === props.defaultValue)
    el.choose = true;
  else if (isArray(props.defaultValue)) {
    props.defaultValue.forEach(defaultValue => {
      if (defaultValue === el.value) el.choose = true;
    });
  } else if (inx === 0) {
    // По умолчанию, если дефолтное значение не передано - отображаем первый элемент
    el.choose = true;
  } else {
    el.choose = false;
  }
};

onMounted(() => {
  state.items = props.items.map((item, inx) => {
    const newItem = {
      value: typeof item === 'string' ? item : item.value,
      type: typeof item === 'string' ? 'blue' : item.type,
      choose: false
    };

    setDefaultChoosen(newItem, inx);

    return newItem;
  }) as IStateItem[];
});
</script>

<style lang="scss" scope>
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
    transition: 0.3s ease-in-out;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;

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

  &__select-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    background-color: $white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05);

    position: absolute;
    top: 62px;
    z-index: 20;
    left: 0;
    width: 100%;
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
  &:hover {
    .counter__list {
      opacity: 1;
      display: block;

      .filter__select-list {
        display: flex;
        position: absolute;
        padding: 3px;
        top: -45px;
        width: auto;
      }
    }
  }
}
</style>
