<template>
  <div class="colors">
    <div class="colors__heading">
      <h2>Colors</h2>
    </div>
    <div class="colors__color1">
      <h2>Основные</h2>
      <ul class="colors__list">
        <li v-for="type in filteredColors('White')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
      <ul class="colors__list">
        <li v-for="type in filteredColors('Blue')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
      <ul class="colors__list">
        <li v-for="type in filteredColors('Grey')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
      <ul class="colors__list">
        <li v-for="type in filteredColors('Black')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
      <ul class="colors__list">
        <li v-for="type in filteredColors('Orange')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
      <ul class="colors__list">
        <li v-for="type in filteredColors('Red')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
        <li v-for="type in filteredColors('Pink')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
      <ul class="colors__list">
        <li v-for="type in filteredColors('Green')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
      <ul class="colors__list">
        <li v-for="type in filteredColors('Gradient')" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
    </div>
    <div class="colors__decor">
      <div class="colors__color2">
        <h2>Текст</h2>
        <ul class="colors__list">
          <li>
            <Color
              :color="colors['Black2'].color"
              :text="colors['Black2'].text"
            />
          </li>
          <li>
            <Color
              :color="colors['White'].color"
              :text="colors['White'].text"
            />
          </li>
          <li>
            <Color
              :color="colors['Blue1'].color"
              :text="colors['Blue1'].text"
            />
          </li>
          <li>
            <Color
              :color="colors['Grey6'].color"
              :text="colors['Grey6'].text"
            />
          </li>
        </ul>
      </div>
      <div class="colors__color3">
        <h2>Обводка</h2>
        <ul class="colors__list">
          <li>
            <Color
              :color="colors['Blue16'].color"
              :text="colors['Blue16'].text"
            />
          </li>
          <li>
            <Color
              :color="colors['Grey7'].color"
              :text="colors['Grey7'].text"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Color from './Color.vue';
import { ColorsTypeEnum } from './enum/enum';
import { colors } from './colors.ts';

/**
 * Вытаскиваем значения ключей из энамов
 */
const colorTypes = computed(() => [...new Set(Object.values(ColorsTypeEnum))]);

/**
 * @param str1: string,
 * @param str2: string,
 * @returns
 */

/**
 * Ищем цвет
 */
const searchColor = (str1: string, str2: string) => {
  const cleanedStr1 = str1.replace(/\d/g, '');
  const cleanedStr2 = str2.replace(/\d/g, '');
  return cleanedStr1.toLowerCase() === cleanedStr2.toLowerCase();
};

/**
 * @param str: string,
 * @returns
 */

/**
 * Фильтруем и находим тип цвета
 */
const filteredColors = (str: string) => {
  return colorTypes.value.filter(type => {
    if (searchColor(type, str)) return type;
  });
};
</script>

<style lang="scss">
.colors {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  font-family: 'Arial', sans-serif;

  h2 {
    color: $BLUE-77A6FF;
    font-family: 'Arial', sans-serif;
    font-size: 58px;
  }

  &__heading {
    grid-column: 1/13;
    background-color: $BLUE-77A6FF;
    min-height: 124px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 32px 32px 0 0;
    h2 {
      color: $WHITE;
      font-size: 58px;
    }
  }

  &__color1 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    align-items: flex-start;
    gap: 10px;

    h2 {
      grid-column: 1/13;
    }
  }
  &__decor {
    display: flex;
    grid-column: 1/13;
    gap: 10px;
  }
  &__color2 {
    h2 {
      text-transform: uppercase;
    }

    .colors__list {
      display: flex;
      padding: 0;
    }
  }
  &__color3 {
    h2 {
      text-transform: uppercase;
    }

    .colors__list {
      display: flex;
      padding: 0;
    }
  }

  &__list {
    list-style-type: none;
    display: grid;
    gap: 10px;
    padding-left: 0;
  }
}
</style>
