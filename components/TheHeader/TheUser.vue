<script setup lang="ts">
import { ref } from 'vue'
import UserMenu from './UserMenu.vue'

const showMenu = ref(false);

const toggleList = () => {
  showMenu.value = !showMenu.value;
};

const closeList = () => {
  showMenu.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      class="btn-common"
      title="Настройки пользователя"
      @click="showMenu = !showMenu"
    >
      <span>U</span>
    </button>
    <UserMenu @select="closeList" v-if="showMenu" />
  </div>
</template>
