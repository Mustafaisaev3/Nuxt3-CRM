<template>
<aside
    class="fixed flex flex-col justify-center overflow-y-hidden min-h-100% h-screen w-16 top-0 left-0 bottom-0 z-30 sm:z-10 text-xs py-12 border-r transition-transform border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidenav"
    id="drawer-navigation"
    aria-hidden="true"
  >
  <div class="overflow-y-auto h-full py-20 lg:py-2 md:py-12 sm:py-20">
    <ul class="space-y-2 relative">
      <li v-for="item in menuItems" :key="item.name" 
          @mouseover="openPopup(item)" @mouseleave="closePopup"
          class="">
          <NuxtLink
            :to="item.href"
            class="flex flex-col items-center text-center text-gray-400 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-700 rounded-lg group py-1 lg:mx-1 md:my-4 sm:mx-0 sm:my-0"
            style="word-break: break-word; white-space: pre-line;"
            :class="[isDarkMode ? 'dark-text dark-icon' : 'light-text colorText light-icon', { 'text-gradient': route.name === item.routeName }]"
          >
          <Icon :name=item.icon :class="isDarkMode ? 'dark-icon' : 'light-icon' " class="size-6" />
          {{ item.name }}
        </NuxtLink>                         
      </li>
    </ul>
<SidebarPopup v-if="popupItem" :popupItem="popupItem" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useColorMode, useRoute } from '#imports'
import { ref } from 'vue'
import SidebarPopup from '~/components/TheHeader/SidebarPopup.vue'
import { authStore } from '~/stores/auth'

const colorMode = useColorMode();
const isDarkMode = ref(colorMode.preference === 'dark');
const popupItem = ref<null | { name: string; href: string; routeName: string; icon: string }>(null);

// watch(() => colorMode.preference, () => {
//   isDarkMode.value = colorMode.preference === 'dark';
// });

const auth = authStore()

const route = useRoute()

const openPopup = (item: { name: string; href: string; routeName: string; icon: string }) => {
  popupItem.value = item;
  console.log(popupItem.value)
};

const closePopup = () => {
  popupItem.value = null;
  console.log(popupItem.value)
};

const menuItems: { name: string; href: string; routeName: string; icon: string }[] = [
  { name: 'Главная', href: '/', routeName: 'index', icon:'flowbite:home-solid' },
  { name: 'Новая статья', href: '/editor/new', routeName: 'editor-new', icon:'flowbite:newspaper-solid' },
  { name: 'Задачи', href: '/todos', routeName: 'todos-list', icon:'flowbite:clipboard-check-solid' },
  { name: 'Новая Задача', href: '/todos/new', routeName: 'todos-new', icon:'flowbite:clipboard-check-outline' },
  {
    name: 'Арендаторы', href: '/tenants', routeName: 'tenants-list',
    icon: 'flowbite:users-solid'
  },
  {
    name: 'Новый Арендатор', href: '/tenants/new', routeName: 'tenants-new',
    icon: 'flowbite:user-add-solid'
  },
  {
    name: 'Работник команды', href: '/teams', routeName: 'teams-list',
    icon: 'flowbite:users-solid'
  },
  {
    name: 'Новый работник команды', href: '/teams/new', routeName: 'teams-new',
    icon: 'flowbite:user-add-solid'
  },
  {
    name: 'Команды на обьектах', href: '/teams/work_team_zones', routeName: 'work-team-zones',
    icon: 'flowbite:users-solid'
  },
  {
    name: 'Новыая команда на обьекте', href: '/teams/work_team_zones/new', routeName: 'work-team-zones-new',
    icon: 'flowbite:user-add-solid'
  },
  {
    name: 'Обекты недвижимости', href: '/objects', routeName: 'objects',
    icon: 'flowbite:users-solid'
  },
  {
    name: 'Новыая обект недвижимости', href: '/objects/new', routeName: 'objects-new',
    icon: 'flowbite:user-add-solid'
  },
]
</script>


<style scoped>
.overflow-y-auto {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer/Edge */
}

.overflow-y-auto::-webkit-scrollbar {
  display: none; /* Webkit (Chrome, Safari) */
}
</style>