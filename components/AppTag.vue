<script setup lang="ts">
import { defineProps } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  name: string;
}>();
</script>

<template>
  <span
    class="text-gray-800 bg-gray-400 rounded border border-gray-400 font-medium text-xs px-2 py-1.5 text-center me-1 mb-2 
    hover:bg-gray-100 hover:text-gray-600
    dark:bg-gray-600 dark:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-500 dark:focus:ring-blue-800
    focus:ring-2 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-500 ">
    {{ name }}
  </span>
</template>
