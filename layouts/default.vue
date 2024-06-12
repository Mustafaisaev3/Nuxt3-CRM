<template>
  <div class="flex flex-col min-h-screen w-screen bg-white dark:bg-gray-900"
>
<TheHeader />

<main
class="w-full flex-grow mx-auto pl-11">

  <TheMainSitebarUser v-if="auth.isAuthenticated" />
  <TheMainMultyMenu :isOpen="isOpenMenu" :items="menuItems" />

  <slot />
</main>
  <TheFooter />
<ConfirmationModal />
</div>
</template>

<script setup lang="ts">
// import ConfirmationModal from '~/components/ui/comfirmation-modal/ConfirmationModal.vue'
import { ref } from 'vue'
import { authStore } from '~/stores/auth'

  const auth = authStore();
  const isOpenMenu = ref(false);
  const menuItems = ref([]);
  defineExpose({auth, isOpenMenu}) //экспорт состояния, кот. д/б доступно извне 
</script>
