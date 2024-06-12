<template>
  <aside
    class="fixed flex flex-col justify-center overflow-y-hidden min-h-screen w-16 top-0 left-0 bottom-0 z-40 text-xs py-24 md:py-20 lg:py-14 border-r transition-transform border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    :class="{ open: isOpenMenu }"
    aria-label="Sidenav"
    id="drawer-navigation"
    aria-hidden="true"
    @mouseenter="isSubMenuOpen = true"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex justify-center py-2.5 cursor-pointer">
      <Icon
        name="ri:arrow-up-wide-line"
        size="30"
        v-if="showUpArrow"
        @click="scrollToTop"
      />
    </div>

    <ul
      ref="menuList"
      @scroll="handleScroll"
      class="space-y-2 overflow-y-auto h-full"
    >
      <li
        v-for="(item, index) in menuItems"
        :key="item.name"
        @mouseenter="
          activeSubmenu = index;
          isSubMenuOpen = true;
        "
        @mouseleave="isSubMenuOpen = false"
      >
        <NuxtLink
          :to="item.href"
          class="menulink flex flex-col items-center text-center text-gray-400 hover:bg-gray-300 hover:text-white dark:hover:bg-gray-700 rounded-sm group py-2 my-2"
          :class="[{ 'text-gradient': route.name === item.routeName }]"
        >
          <Icon
            :name="item.icon"
            class="size-6"
            :class="[
              {
                'text-gray-600 dark:text-white': route.name === item.routeName,
              },
            ]"
          />
          {{ item.name }}
        </NuxtLink>

        <transition name="submenu">
          <TheMainMultyMenu
            v-show="isSubMenuOpen && activeSubmenu === index"
            :key="item.name"
            :items="item.subMenuItems"
          />
        </transition>
      </li>
    </ul>

    <div class="flex justify-center py-3 cursor-pointer">
      <Icon
        name="ri:arrow-down-wide-line"
        size="30"
        v-if="showDownArrow"
        @click="scrollToBottom"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from '#imports'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const isOpenMenu = ref(false);
const showUpArrow = ref(false);
const showDownArrow = ref(false);
const route = useRoute();
const activeSubmenu: Ref<number | null> = ref(null); // Хранит индекс активного подменю
const menuList = ref<HTMLElement | null>(null);
const isSubMenuOpen = ref(false); // переменная состояния для контроля видимости подменю

const menuItems: {
  name: string;
  href: string;
  routeName: string;
  icon: string;
  subMenuItems: Array<{
    name: string;
    href: string;
    routeName: string;
    icon: string;
  }>;
}[] = [
  {
    name: 'Главная',
    href: '/',
    routeName: 'index',
    icon: 'ic:twotone-domain',
    subMenuItems: [
      {
        name: 'Главная',
        href: '/',
        routeName: 'index',
        icon: 'ic:twotone-domain',
      },
    ],
  },
  {
    name: 'Новая статья',
    href: '/editor/new',
    routeName: 'editor-new',
    icon: 'pixelarticons:article-multiple',
    subMenuItems: [
      {
        name: 'Арендатор 1',
        href: '/tenants',
        routeName: 'tenants-list',
        icon: 'flowbite:clipboard-check-outline',
      },
      {
        name: 'Арендатор 2',
        href: '/tenants',
        routeName: 'tenants-list',
        icon: 'flowbite:clipboard-check-outline',
      },
      {
        name: 'Новый Арендатор',
        href: '/tenants/new',
        routeName: 'tenants-new',
        icon: 'teenyicons:user-plus-outline',
      },
    ],
  },
  {
    name: 'Задачи',
    href: '/todos',
    routeName: 'todos-list',
    icon: 'ri:todo-fill',
    subMenuItems: [
      {
        name: 'Новая Задача',
        href: '/todos/new',
        routeName: 'todos-new',
        icon: 'ri:todo-line',
      },
    ],
  },
  {
    name: 'Новая Задача',
    href: '/todos/new',
    routeName: 'todos-new',
    icon: 'ri:todo-line',
    subMenuItems: [],
  },
  {
    name: 'Арендаторы',
    href: '/tenants',
    routeName: 'tenants-list',
    icon: 'clarity:users-line',
    subMenuItems: [
      {
        name: 'Арендатор 1',
        href: '/tenants',
        routeName: 'tenants-list',
        icon: 'flowbite:clipboard-check-outline',
      },
      {
        name: 'Арендатор 2',
        href: '/tenants',
        routeName: 'tenants-list',
        icon: 'flowbite:clipboard-check-outline',
      },
      {
        name: 'Новый Арендатор',
        href: '/tenants/new',
        routeName: 'tenants-new',
        icon: 'teenyicons:user-plus-outline',
      },
    ],
  },
  {
    name: 'Новый Арендатор',
    href: '/tenants/new',
    routeName: 'tenants-new',
    icon: 'tdesign:user-add',
    subMenuItems: [],
  },
	{
		name: 'Работник команды',
		href: '/teams',
		routeName: 'teams-list',
    icon: 'flowbite:users-solid'
  },
  {
    name: 'Новый работник команды',
		href: '/teams/new',
		routeName: 'teams-new',
    icon: 'flowbite:user-add-solid'
  },
  {
    name: 'Команды на обьектах',
		href: '/teams/work_team_zones',
		routeName: 'work-team-zones',
    icon: 'flowbite:users-solid'
  },
  {
    name: 'Новыая команда на обьекте',
		href: '/teams/work_team_zones/new',
		routeName: 'work-team-zones-new',
    icon: 'flowbite:user-add-solid'
  },
  {
    name: 'Обекты недвижимости',
		href: '/objects',
		routeName: 'objects',
    icon: 'flowbite:users-solid'
  },
  {
    name: 'Новыая обект недвижимости',
		href: '/objects/new',
		routeName: 'objects-new',
    icon: 'flowbite:user-add-solid'
  },
];

let mouseLeaveTimeout;
const handleMouseLeave = () => {
  // Очистить предыдущий таймер
  clearTimeout(mouseLeaveTimeout);
  // новый таймер
  mouseLeaveTimeout = setTimeout(() => {
    isSubMenuOpen.value = false;
  }, 300);
};

onMounted(() => {
  menuList.value?.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  menuList.value?.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  if (menuList.value) {
    showUpArrow.value = menuList.value.scrollTop > 0;
    showDownArrow.value =
      menuList.value.scrollTop + menuList.value.clientHeight <
      menuList.value.scrollHeight;
  }
};

const scrollToTop = () => {
  if (menuList.value) {
    menuList.value.scrollTop = 0;
  }
};

const scrollToBottom = () => {
  if (menuList.value) {
    menuList.value.scrollTop = menuList.value.scrollHeight;
  }
};

// реагировать на изменения
watch(activeSubmenu, (newIndex) => {
  // позже можно доработать обновить состояние/отправь событие
});
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer/Edge */
}
.overflow-y-auto::-webkit-scrollbar {
  display: none; /* Webkit (Chrome, Safari) */
}

.submenu-enter-active,
.submenu-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  transform: translateX(100%);
}
.menulink {
  word-break: break-word;
  white-space: pre-line;
}
</style>
