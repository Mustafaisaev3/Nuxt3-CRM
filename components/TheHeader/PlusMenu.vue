<template>
  <div class="relative">
    <button
            class="btn-common"
      title="Создать"
      @click="showMenu = !showMenu"
    >
      <Icon name="flowbite:plus-outline" size="sm" />
    </button>

    <PlusMenuList @select="closeList" v-if="showMenu" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlusMenuList from './PlusMenuList.vue'

const showMenu = ref(false);

const toggleList = () => {
  showMenu.value = !showMenu.value;
};

const closeList = () => {
  showMenu.value = false;
};

function useIcon(): { Icon: any; } {
  throw new Error('Function not implemented.');
}
</script>
