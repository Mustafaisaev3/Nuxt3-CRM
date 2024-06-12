<script setup lang="ts">
//import { defineProps } from 'vue';
import type { Good } from '~/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  goods: Good[];
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
                Инвентарный номер
              </th>
              <th scope="col" class="px-6 py-3">
                Описание
              </th>
              <th scope="col" class="px-6 py-3">
                Фото имущества
              </th>
              <th scope="col" class="px-6 py-3">
                Описание состояния имущества
              </th>
              <th scope="col" class="px-6 py-3">
                Дата поломки имущества
              </th>
              <th scope="col" class="px-6 py-3">
                edObjec
              </th>
              <th scope="col" class="px-6 py-3">
                Ответственный за имущество
              </th>
              <th scope="col" class="px-6 py-3">
                Статус имущества
              </th>
              <th scope="col" class="px-6 py-3">
                Сайт
              </th>
            </tr>
          </thead>
          <tbody
            v-for="good in goods"
            :key="good.id"
            class="border-t border-gray-200 py-6"
            >
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ good.goodsName }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ good.goodsInventoryNumber }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ good.goodsDescription }}</h1>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ good.goodsPhoto }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ good.goodsConditionDescription }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{new Date(good.goodsDamageDateTime).toDateString()}}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ good.goodsRelatedObject }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ good.goodsResponsiblePerson }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ good.goodsStatus }}</span>
              </td>
                <td class="px-6 py-4">
                  <a
                    :href="`/goods/${good.id}`"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    ><span class="text-xs font-light text-gray-400">Подробнее.{{ good.id }}</span></a>
                </td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  </div>
</template>