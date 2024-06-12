<script setup lang="ts">
//import { defineProps } from 'vue';
import type { Tenant } from '~/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  tenants: Tenant[];
}>();

// Добавляем лог в консоль для проверки данных в tenantData
console.log('tenantData:', props.value);
</script>

<template>
  <div class='mx-2 media'>
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                     Автор
                </th>
                <th scope="col" class="px-6 py-3">
                    Задача
                </th>
                <th scope="col" class="px-6 py-3">
                    Дата создания
                </th>
              <th scope="col" class="px-6 py-3">
                    Дата выполнения
              </th>
                <th scope="col" class="px-6 py-3">
                    Действие
                </th>
            </tr>
        </thead>
        <tbody
          v-for="tenant in tenants"
          :key="tenant.id"
          class="border-t border-gray-200 py-6"
          >
          <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div class="mb-4">
                    <img
                      :data-src="tenant.author.image"
                      :src="tenant.author.image"
                      alt="изображение профиля автора"
                      class="inline-block align-middle h-8 w-8 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                      />
                  <div class="inline-block align-middle mr-6 ml-1">
                      <span>{{ tenant.author.username }}</span>
                  </div>
                </div>
              </th>
              <td class="px-6 py-4">
                  <h1 class="font-bold text-lg mb-1 text-gray-700">{{ tenant.tenantType }}</h1>
              </td>
              <td class="px-6 py-4">
                  <h1 class="font-bold text-lg mb-1 text-gray-700">{{ tenant.tradeName }}</h1>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{new Date(tenant.createdAt).toDateString()}}</span>
              </td>
              <td class="px-6 py-4">
                <a
                  :href="`/tenants/${tenant.id}`"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  ><span class="text-xs font-light text-gray-400">Подробнее.{{ tenant.id }}</span></a>
              </td>
          </tr>
        </tbody>
    </table>
</div> 
    </div>
  </div>
</template>

<style>
@media only screen and (max-width: 780px) {
  .media {
    width: 65%;
  }
}
</style>