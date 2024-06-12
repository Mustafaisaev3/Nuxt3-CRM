<script setup lang="ts">
import { APP_NAME } from '~/constants'
import { useColorMode } from '#imports';
import { ref } from 'vue';

const colorMode = useColorMode();
const isDarkMode = ref(colorMode.preference === 'dark');

// Прослушивание изменений выбранной темы, обновление переменной isDarkMode
watch(() => colorMode.preference, () => {
  isDarkMode.value = colorMode.preference === 'dark';
});

const title = APP_NAME.toLowerCase()
// const isDarkMode = ref(false)

</script>

  <!-- :class="{ 'dark-mode': isDarkMode }" -->
<template>
  <div
  class="container mx-auto w-full flex flex-grow justify-center items-center text-center overflow-auto shadow-inner dark:bg-dark-mode"
  >
    <TheContainer>
      <h1 :class="{ 'text-gradient-dark': isDarkMode, 'text-gradient': !isDarkMode }" class="text-6xl font-extrabold text-center pb-4">
        {{ title }}
      </h1>
      <p :class="{ 'text-gradient-dark': isDarkMode, 'text-gradient': !isDarkMode }" class="font-regular text-xl pb-4">
        CRM система для управления недвижимостью.
      </p>
    </TheContainer>
  </div>
</template>
