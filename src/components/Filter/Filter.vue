<template>
  <div class="filter">
    <div
      :class="{ filter__wrapper: true, active: state.isShow }"
      @click="toggleShow"
    >
      <Icon :name="props.iconName" />
      <span>{{ props.title }}</span>
      <span
        ><Badges>{{ state.items[0] }}</Badges></span
      >
      <div class="filter__counter counter">
        <span class="counter__value">{{ '+' + state.items.length }} </span>
        <div class="counter__list">
          <ul class="filter__select-list">
            <li
              class="filter__select-item"
              v-for="(badge, index) in state.items"
              :key="badge"
            >
              <Badges :type="badgeTypes[index]">{{ badge }}</Badges>
            </li>
          </ul>
        </div>
      </div>
      <button type="button" class="filter__close" @click.stop="closeFilter">
        <Icon :name="'exitBig'" />
      </button>
    </div>
    <!-- <ul class="filter__select-list" v-if="state.isShow">
      <li
        class="filter__select-item"
        v-for="(badge, index) of state.items"
        v-if="state.choosenStatus"
      >
        <Badges
          :type="badgeTypes[index]"
          @choose="choose => state.choosenStatus"
          >{{ badge }}</Badges
        >
      </li>
    </ul> -->
    <ul class="filter__select-list" v-if="state.isShow">
      <li
        class="filter__select-item"
        v-for="(badge, index) in state.items"
        :key="badge"
      >
        <div class="choosen" v-if="state.choosenStatus">
          <Badges
            :type="badgeTypes[index]"
            @click="state.choosenStatus"
            @choose="choose => (state.choosenStatus = choose)"
            >{{ badge }}</Badges
          >
        </div>
        <div class="unchoosen" v-if="state.choosenStatus === false">
          <Badges
            :type="badgeTypes[index]"
            :choosed="state.choosedStatus"
            @choose="
              choose => {
                state.choosenStatus = choose;
                console.log(state.choosenStatus, 'state.choosenStatus');
              }
            "
            >{{ badge }}</Badges
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { IFilterProps } from './interface';
import { FilterType } from './enum';
import { BadgesType } from './../Badges/enum';
import Badges from '@/components/Badges/Badges';
import Icon from '@/components/Icon/Icon';
import { IconNameEnum } from '../Icon/enum';

const props = withDefaults(defineProps<IFilterProps>(), {
  title: FilterType.default,
  iconName: IconNameEnum.filter,
  multiselect: false,
  items: [],
  defaultValue: 'red'
});

const state = reactive({
  items: [],
  isShow: false,
  choosenStatus: false
});

const toggleShow = () => {
  state.isShow = !state.isShow;
};

const closeFilter = (e: Event) => {
  e.stopPropagation();
  state.isShow = false;
};

const badgeTypes = Object.values(BadgesType);

onMounted(() => {
  state.items = props.items;
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
