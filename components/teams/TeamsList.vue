<script setup lang="ts">
//import { defineProps } from 'vue';
import type { Team } from '~/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  teams: Team[];
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
                Имя
              </th>
              <th scope="col" class="px-6 py-3">
                Фамилия
              </th>
              <th scope="col" class="px-6 py-3">
                Второе имя
              </th>
              <th scope="col" class="px-6 py-3">
                Позиция
              </th>
              <th scope="col" class="px-6 py-3">
                Начало работы
              </th>
              <th scope="col" class="px-6 py-3">
                Конец работы
              </th>
              <th scope="col" class="px-6 py-3">
                Номер телефона команды
              </th>
              <th scope="col" class="px-6 py-3">
                Номер телефона
              </th>
              <th scope="col" class="px-6 py-3">
                Рабочий Номер телефона
              </th>
              <th scope="col" class="px-6 py-3">
                Внутрений Номер
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Личный Email
              </th>
              <th scope="col" class="px-6 py-3">
                Сайт
              </th>
            </tr>
          </thead>
          <tbody
            v-for="team in teams"
            :key="team.id"
            class="border-t border-gray-200 py-6"
            >
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ team.teamLastName }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ team.teamFirstName }}</h1>
              </td>
              <td class="px-6 py-4">
                <h1 class="font-bold text-lg mb-1 text-gray-700">{{ team.teamMiddleName }}</h1>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ team.teamPosition }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{new Date(team.teamWorkStartTime).toDateString()}}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{new Date(team.teamWorkEndTime).toDateString()}}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ team.teamMobile }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ team.teamWorkPhone }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ team.teamInternalNumber }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ team.teamEmail }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ team.teamPersonalEmail }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="date block text-gray-400 text-xs">{{ team.teamWebsite }}</span>
              </td>
                <td class="px-6 py-4">
                  <a
                    :href="`/teams/${team.id}`"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    ><span class="text-xs font-light text-gray-400">Подробнее.{{ team.id }}</span></a>
                </td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  </div>
</template>