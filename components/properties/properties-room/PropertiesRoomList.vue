
<script setup lang="ts">
//import { defineProps } from 'vue';
import type { PropertiesRoom } from '~/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    propertiesRooms: PropertiesRoom[];
}>();
</script>

<template>
  <div>
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Номер комнаты
              </th>
              <th scope="col" class="px-6 py-3">
                Номер плана
              </th>
              <th scope="col" class="px-6 py-3">
                Вход
              </th>
              <th scope="col" class="px-6 py-3">
                Площадь
              </th>
              <th scope="col" class="px-6 py-3">
                План комнаты
              </th>
              <th scope="col" class="px-6 py-3">
                Сайт
              </th>
            </tr>
          </thead>
          <tbody
            v-for="propertiesRoom in propertiesRooms"
            :key="propertiesRoom.id"
            class="border-t border-gray-200 py-6"
            >
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ propertiesRoom.roomNumber }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ propertiesRoom.planNumber }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ propertiesRoom.entrance }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ propertiesRoom.area }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ propertiesRoom.roomPlan }}</h1>
              </td>
              <td class="px-6 py-4">
                <a :href="`/properties/properties-room/${propertiesRoom.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><span class="text-xs font-light text-gray-400">Подробнее.{{ propertiesRoom.id }}</span></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  </div>
</template>