<script setup lang="ts">
import { useRoute } from '#imports'
import { authStore } from '~/stores/auth'
const auth = authStore();

const route = useRoute();

const menuItems = [
  { name: '', href: '/user/settings', routeName: 'user-settings', icon: 'flowbite:cog-outline' },
  {
    name: auth.currentUser?.username,
    href: '/@' + auth.currentUser?.username,
    routeName: '@' + auth.currentUser?.username,
  },
];
</script>

<template>
  <ul class="list-none">
    <li
      v-for="item in menuItems"
      :key="item.name"
      class="float-left relative"
    >
      <NuxtLink
        :href="item.href"
        class="btn-common w-9 text-sm font-medium flex items-center justify-center p-3"
        :class="{ 'text-gradient': route.name === item.routeName }"
        >
        <Icon :name=item.icon class='w-6 h-6'         
/> {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
