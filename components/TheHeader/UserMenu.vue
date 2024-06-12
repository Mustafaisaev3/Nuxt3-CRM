<script setup lang="ts">
import { ref } from 'vue';

const userMenuItems = ref([
  {
    iconName: 'material-symbols:account-circle-full',
    name: 'Мой профиль',
  },
  {
    iconName: 'basil:settings-adjust-outline',
    name: 'Персонализация',
  },
  {
    iconName: 'majesticons:applications-line',
    name: 'Приложения',
  },
  {
    iconName: 'memory:card-text',
    name: 'Мой тариф',
  },
  {
    iconName: 'ph:gear-six',
    name: 'Настройки портала',
  },
  {
    iconName: 'humbleicons:exchange-horizontal',
    name: 'Сменить портал',
  },
  {
    iconName: 'ic:baseline-exit-to-app',
    name: 'Выйти',
  },
]);
</script>
<template>
  <div
    class="absolute z-50 p-3 text-base list-none -translate-x-1/2 bg-white rounded shadow top-12 w-max dark:bg-gray-700"
  >
    <ul>
      <li v-for="item in userMenuItems" @click="">
        <NuxtLink> <Icon :name="item.iconName" /> {{ item.name }} </NuxtLink>
      </li>
    </ul>
  </div>
</template>
