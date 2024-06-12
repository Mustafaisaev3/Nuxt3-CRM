<template>
  <aside
    class="fixed top-0 right-[calc(100%-4rem)] -z-30 w-80 h-screen py-10 sm:py-28 transition-transform translate-x-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Подменю"
    :aria-hidden="!isOpen"
    :class="{ 'translate-x-full': !isOpen, 'translate-x-0': isOpen }"
    @mouseleave="closeSubMenu"
  >
    <div class="h-full p-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li v-for="subItem in items" :key="subItem.name">
          <NuxtLink
            :to="subItem.href"
            class="block py-2 px-6 text-sm text-slate-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white rounded-sm"
            role="menuitem"
            :aria-selected="subItem.isActive"
          >
              <Icon :name="subItem.icon" v-if="subItem.icon" />
            {{ subItem.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
<!-- <Icon :name=item.icon class="size-6" :class="[{ 'text-gray-600 dark:text-white': route.name === item.routeName }]"/> -->

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

interface SubItem {
  name: string;
  href: string;
}

const { isOpen, items } = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['close']);

function closeSubMenu() {
  emit('close'); // Уведомление родителя о том, что курсор покинул подменю
}
</script>
