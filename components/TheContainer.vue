<script setup lang="ts">
// import { useColorMode } from '#imports';
import { useColorMode } from '#imports'
import { ref } from 'vue'

const colorMode = useColorMode();
const isDarkMode = ref(colorMode.preference === 'dark');

watch(() => colorMode.preference, () => {
  isDarkMode.value = colorMode.preference === 'dark';
});

// const isDarkMode = ref(true);
</script>

<!-- :style="{ borderColor: isDarkMode ? '#00FFBA' : '#f9f9f9' }" -->
<template>
  <div
    class="container mx-auto rounded p-8 sm:p-4 bg-white dark:bg-gray-800 border-gray-800 dark:border-gray-200"    
    :class="{ 
      'bg-light-bg': !isDarkMode, 
      'bg-dark-bg': isDarkMode 
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.dark-mode .custom-border {
  /* border: 1px solid #00FFBA; */
}
@media (min-width: 544px) {
  .container {
    max-width: 556px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 940px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
</style>
