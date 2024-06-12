<script setup lang="ts">
import { useColorMode } from '#imports'
import { ref } from 'vue'

const colorMode = useColorMode();

// Определение значений для иконок
const iconNames = {
	iconDark: 'flowbite:moon-outline',
  iconLight: 'flowbite:sun-outline',
};

const iconTheme = ref(colorMode.preference === 'dark' ? iconNames.iconDark : iconNames.iconLight); // Определение переменной для имени текущей иконки в зависимости от темы
const iconClass = ref(colorMode.preference === 'dark' ? 'dark' : 'light');

// Функция для изменения темы
const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
getTheme();
};
// Функция для обновления иконки в зависимости от выбранной темы
function getTheme() {
  iconTheme.value = colorMode.preference === 'dark' ? iconNames.iconDark : iconNames.iconLight;
  iconClass.value = colorMode.preference === 'dark' ? 'dark' : 'light';
};

</script>

<template>
<button
      class="btn-common" title="Light" @click="toggleTheme">
    <Icon
      :name="iconTheme"
      :class="iconClass"
      style="width: 1.5rem; height: 1.4rem"
    />
  </button>
</template>

<style scoped>
.dark {
  /* color: rgb(97, 198, 156); */
}

.light {
  /* color: rgb(95, 92, 92); */
}
</style>
