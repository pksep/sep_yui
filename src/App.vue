<template>
  <div>
    <UserMenu :user="user" :languages="langs" :isBlackTheme="true" />
  </div>

  <div class="search">
    <Search :global="true" />
  </div>
</template>
<script setup lang="ts">
import UserMenu from './components/UserMenu/UserMenu';
import Search from './components/Search/Search';

const user = {
  name: 'David Perov',
  role: 'admin',
  avatar:
    'https://bogatyr.club/uploads/posts/2023-06/1686903015_bogatyr-club-p-derevo-na-fone-rassveta-instagram-45.jpg'
};

const langs = {
  items: ['Ru', 'En'],
  defaultValue: 'En'
};
</script>
<style lang="scss">
.search {
  width: 553px;
}
</style>
