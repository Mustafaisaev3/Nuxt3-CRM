<script setup lang="ts">
import { useRoute } from '#imports'
const route = useRoute()

const menuItems = [
  { name: 'ГЛАВНАЯ', href: '/', routeName: 'index' },
  { name: 'АВТОРИЗАЦИЯ', href: '/user/login', routeName: 'user-login' },
  { name: 'РЕГИСТРАЦИЯ', href: '/user/register', routeName: 'user-register' },
]
</script>

<template>
  <ul class="list-none">
    <li v-for="item in menuItems" :key="item.name" class="float-left text-sm font-semi-bold">
      <NuxtLink
        :href="item.href"
        class="block p-2 text-dark-text hover:text-white rounded-lg hover-custom group dark:text-white"
        :class="{ 'text-gradient': route.name === item.routeName }"
      >
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>

.colorText{
  color: #cbcdf4;
}
</style>