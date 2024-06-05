<template lang="">
  <div class="colors">
    <div class="colors__color1">
      <h2>Основные</h2>
      <ul class="colors__list">
        <li v-for="type in colorTypes" :key="type">
          <Color :color="colors[type].color" :text="colors[type].text" />
        </li>
      </ul>
    </div>
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
          <Color :color="colors['White'].color" :text="colors['White'].text" />
        </li>
        <li>
          <Color :color="colors['Blue1'].color" :text="colors['Blue1'].text" />
        </li>
        <li>
          <Color :color="colors['Grey6'].color" :text="colors['Grey6'].text" />
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
          <Color :color="colors['Grey7'].color" :text="colors['Grey7'].text" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Color from './Color';
import { ColorsType } from './enum';
import { colors } from './colors';

const colorTypes = ref([...new Set(Object.values(ColorsType))]);
</script>

<style lang="scss">
.colors {
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  &__color1 {
    grid-column: 1/13;
  }
  &__color2 {
    grid-column: 1/6;
  }
  &__color3 {
    grid-column: 6/13;
  }

  &__list {
    list-style-type: none;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
