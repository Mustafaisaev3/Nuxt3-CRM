<script setup lang="ts">
import { ref } from 'vue';

const menuItems = ref([
  'Создать задачу',
  'Создать событие',
  'Создать проект',
  'Создать сделку',
  'Создать компанию',
  'Создать контакт',
  'Выставить счет',
  'Новый пользователь',
]);
</script>

<template>
  <div
    class="absolute z-50 p-3 text-normal list-none -translate-x-1/2 bg-white rounded shadow top-14 w-max dark:bg-gray-700"
  >
    <ul>
      <li v-for="item in menuItems" @click="">
        <NuxtLink href="#">{{ item }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
