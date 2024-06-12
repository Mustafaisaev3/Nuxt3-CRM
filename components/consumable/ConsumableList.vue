<script setup lang="ts">
//import { defineProps } from 'vue';
import type { Consumable } from '~/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  consumables: Consumable[];
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
                Название
              </th>
              <th scope="col" class="px-6 py-3">
                Описание
              </th>
              <th scope="col" class="px-6 py-3">
                Фото
              </th>
              <th scope="col" class="px-6 py-3">
                Количество
              </th>
              <th scope="col" class="px-6 py-3">
                Еденица измерения
              </th>
              <th scope="col" class="px-6 py-3">
                consumableRelatedObject
              </th>
              <th scope="col" class="px-6 py-3">
                Тип Расходного материала
              </th>
              <th scope="col" class="px-6 py-3">
                Ответственный за расходный материал
              </th>
              <th scope="col" class="px-6 py-3">
                Сайт
              </th>
            </tr>
          </thead>
          <tbody
            v-for="consumable in consumables"
            :key="consumable.id"
            class="border-t border-gray-200 py-6"
            >
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ consumable.consumableName }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ consumable.consumableDescription }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ consumable.consumablePhoto }}</h1>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ consumable.consumableQuantity }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ consumable.consumableQuantityUnit }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ consumable.consumableRelatedObject }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ consumable.consumableResponsiblePerson }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ consumable.consumable_type }}</span>
              </td>
                <td class="px-6 py-4">
                  <a
                    :href="`/consumable/${consumable.id}`"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    ><span class="text-xs font-light text-gray-400">Подробнее.{{ consumable.id }}</span></a>
                </td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  </div>
</template>