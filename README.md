# Как работать с библиотекой

### Установить нпм-пакет с библиотекой к себе в проект
### Для работы библиотеки необходимы: node.js >= 20.14.0 и npm >= 10.7.0 

```bash
bash
    npm i sep-yui
```

#### 1. Для использования библиотеки в проекте, необходимо импортировать компоненты библиотеки в главный файл проекта main.ts таким образом:
```ts
main.ts
    import { createApp } from 'vue'
////your code
    import Ylibrary from 'sep-yui';

    const app = createApp(App);

    app.use(Ylibrary)
    app.mount('#app');
```
#### 1.1 Для выборочного импорта компонентов, можно использовать подключение такого вида.
```ts
main.ts
    import { createApp } from 'vue'
////your code
    import {Toggle} from 'sep-yui'

    const app = createApp(App);

    app.component('Toggle', Toggle);
    app.mount('#app');
```
#### 2. Стили импортируются через путь "sep-yui/styles" также в файле main.ts
```ts
main.ts
    import { createApp } from 'vue'
////your code
    import 'sep-yui/styles'
```
#### 3. Далее просто пишем название компонента внутри проекта и используем как при обычной разработке на Vue. 
```ts
App.vue
<template>
    <Toggle 
    {
        props...
    }
    />
</template>
<script setup lang="ts">
</script>
<styles lang="scss">
</styles>
```