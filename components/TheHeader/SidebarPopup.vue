<template>
  <div :class="{ 'sidebar-popup': true, 'active': popupItem }" class="absolute z-50 p-3 text-normal list-none -translate-x-1/2 bg-white rounded shadow top-0 w-26 dark:bg-gray-700">    
    <p v-if="popupItem">{{ popupItem.name }}</p>
    <ul v-if="popupItem">
      <li>
        <NuxtLink :to="popupItem.href" class="block px-4 py-2 hover:bg-gray-300">{{ popupItem.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
  popupItem: { name: string; href: string };
}>();
const popupItem = ref(false);

// Функции открытия и закрытия popup
const openPopup = (item: { name: string; href: string }) => {
  popupItem.value = item;
};

const closePopup = () => {
  popupItem.value = false;
};

</script>

<style>
.sidebar-popup {
  /* display: none; */
  position: fixed;
  top: 0;
  right: -250px;  
  height: 100vh; /* высота равна высоте экрана */
  padding: 2rem;
  background-color: #f1f1f1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;  /* плавная анимация */
  /* z-index: 1000;  */
}

.sidebar-popup.active:hover {
  transition: width 0.3s ease; /* плавное изменение ширины */
  overflow: visible;
  /* display: block; */
  right: 110px; /* сдвигаем вправо на 0, чтобы появился на экране */
  width: 250px; /* изменение ширины меню при наведении курсора */
  overflow: visible;
}

.sidebar-popup:hover {
  width: 300px;
}
</style>