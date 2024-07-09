<template>
  <div>
    <UserMenu :user="user" :languages="langs" :isBlackTheme="true" />
  </div>
</template>
<script setup lang="ts">
import UserMenu from './components/UserMenu/UserMenu';

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
