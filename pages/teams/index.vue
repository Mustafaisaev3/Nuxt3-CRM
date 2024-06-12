<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса статей из библиотек
import type { GetTenantsResponse } from '~/lib/api/tenant'

import TeamsList from '~/components/teams/TeamsList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса статей
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/teams`);
  return url.toString();
});

// Запрос статей и с использованием useFetch
const { data: teamsData, pending: teamsPending } =
  useFetch<GetTenantsResponse>(apiUrl, {
    method: 'GET',
  });


// Добавляем лог в консоль для проверки данных в tenantData
console.log('teamsDatas:', teamsData.value);

// const getTeams = async () => {
//   const data = await useFetch<GetTenantsResponse>(apiUrl, {
//     method: 'GET',
//   });

//   console.log(data, 'teams')
// }

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Команды — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки статей -->
          <p v-if="teamsPending">Loading tenants...</p>
          <!-- Отображение статей или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия статей -->
            <p
              v-if="
                teamsData &&
                teamsData.teams &&
                teamsData.teams.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка статей и пагинации -->
            <div v-else-if="teamsData && teamsData.teams">
              <TeamsList :teams="teamsData.teams" />
              <CustomPagination
                :base-url="`/`"
                :entity-count="teamsData.teamsCount"
              />
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>