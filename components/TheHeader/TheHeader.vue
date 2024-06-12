<script setup lang="ts">
import { useColorMode } from '#imports'
import { watchEffect } from 'vue'
import { authStore } from '~/stores/auth'
import ColorModeSelector from './ColorMode.vue'
import Date from './Date.vue'
import Notifications from './Notifications.vue'; // Импорт компонента оповещения
import PlusMenu from './PlusMenu.vue'
import TheHelp from './TheHelp.vue'
import TheMail from './TheMail.vue'
import TheMessenger from './TheMessenger.vue'
import TheNotes from './TheNotes.vue'
import ThemeToggler from './ThemeToggler.vue'

const auth = authStore();
const colorMode = useColorMode()
const iconNames = {
  iconDark: 'ph:moon-bold',
  iconLight: 'ph:sun',
};
let iconName = colorMode.preference === 'dark' ? iconNames.iconLight : iconNames.iconDark;

const onColorModeChange = (newValue: string) => {
  iconName = newValue === 'dark' ? iconNames.iconLight : iconNames.iconDark;
};
// Подписка на изменения цветовой темы
watchEffect(() => {
  onColorModeChange(colorMode.preference);
});

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
  getTheme(); // Вызов функции для изменения класса иконки
};

function getTheme() {
	  const localTheme = localStorage.theme;
  if (localTheme === 'dark') {
    document.documentElement.classList.toggle('dark');
  }
}
</script>

<template>
  <header class="antialiased sticky left-0 right-0 top-0 z-50 sm:z-100">
    <nav
    class="items-center w-screen bg-white border-b px-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-wrap">
        <div class="flex justify-start items-center">
          <TheHeaderAppLogo />
          <PlusMenu />
          <TheHeaderSearch v-if="auth.isAuthenticated"/>
        </div>
        <div class="flex items-center lg:order-2 justify-end flex-grow">
          <Date />
          <TheMail />
          <TheNotes v-if="auth.isAuthenticated" />
          <Notifications v-if="auth.isAuthenticated" />
          <TheMessenger v-if="auth.isAuthenticated" />
          <TheHelp />
          <ThemeToggler />
          <ColorModeSelector :colorMode="colorMode" />
          <!-- <TheUser v-if="auth.isAuthenticated" /> -->
          <TheHeaderMemberMenu v-if="auth.isAuthenticated" />
          <TheHeaderGuestMenu v-else />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

.customBgColor {
  background-color: rgba(203, 205, 244, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid #f1f2f6;
}

@media (min-width: 544px) {
  .container {
    max-width: 576px;
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
