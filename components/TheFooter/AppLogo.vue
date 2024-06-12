<script setup>
import { APP_NAME } from '~/constants'
const title = APP_NAME.toLocaleLowerCase();
</script>

<template>
  <span class="font-bold text-gradient">{{ title }}</span>
</template>
