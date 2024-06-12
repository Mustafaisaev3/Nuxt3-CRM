<script setup>
  import { ref } from 'vue'
import { APP_NAME } from '~/constants'

  const title = APP_NAME.toLocaleLowerCase();

  const menuOpen = ref(false);

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  }

  const closeList = () => {
    menuOpen.value = false;
};
</script>

<template>
  <!-- Бургер для мобильной версии -->
  <button
    @click="toggleMenu"
    data-drawer-target="drawer-navigation"
    data-drawer-toggle="drawer-navigation"
    aria-controls="drawer-navigation"
    class="btn-common"
  >
    <svg
      aria-hidden="true"
      class="w-6 h-6 burgerIcon"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      v-if="!menuOpen"
    >
      <path
        fill-rule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <svg
      aria-hidden="true"
      class="hidden w-6 h-6 closeIcon"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      v-if="menuOpen"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span class="sr-only">Toggle sidebar</span>
  </button>
<TheHeaderSitebarUser @select="!menuOpen" v-if="menuOpen"/>
<!-- <SideBar @select="closeList" v-if="menuOpen"/> -->

  <NuxtLink
    to="/"
    class="flex mr-8 items-center space-x-2 rtl:space-x-reverse text-gradient"
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
  <style>
.burgerIcon {
  display: block;
}
.closeIcon {
  display: none;
}
</style>
