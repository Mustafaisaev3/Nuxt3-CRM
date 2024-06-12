<script setup>
  import { APP_NAME } from '~/constants'

  const title = APP_NAME.toLocaleLowerCase();
</script>

<template>
  <NuxtLink
    to="/"
    class="flex mr-8 items-center space-x-2 rtl:space-x-reverse sm:pl-8 text-gradient"
  >
    <!--img src="#" class="h-8" alt="Logo"-->
    <span
      class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
      >{{ title }}</span
    >
  </NuxtLink>  
</template>
  <!--h1 class="font-titillium text-custom-green font-bold text-2xl">
    <NuxtLink to="/">{{ title }}</NuxtLink>
  </h1>-->
