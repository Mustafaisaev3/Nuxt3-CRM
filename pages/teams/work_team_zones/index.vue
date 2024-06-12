<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса статей из библиотек
// Импорт запроса статей из библиотек
import type { GetTenantsResponse } from '~/lib/api/tenant'

import TeamsWorkZonesList from '~/components/teams/TeamsWorkZonesList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса статей
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/work-team-zones`);
  // url.searchParams.append('limit', '10');
  // if (route.query.offset) {
  //   url.searchParams.append('offset', route.query.offset as string);
  // }
  return url.toString();
});

// Запрос статей и с использованием useFetch
const { data: workTeamZonesData, pending: workTeamZonesPending } =
  useFetch<GetTenantsResponse>(apiUrl, {
    method: 'GET',
  });


// Добавляем лог в консоль для проверки данных в tenantData
console.log('teamZones:', workTeamZonesData.value);

console.log()

// const getTeams = async () => {
//     const { data: teamsData, pending: teamsPending } =
//   useFetch<GetTenantsResponse>(apiUrl, {
//     method: 'GET',
//   });

//   console.log(teamsData, 'teamszones')
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
          <p v-if="workTeamZonesPending">Loading work team zones...</p>
          <!-- Отображение статей или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия статей -->
            <p
              v-if="
                workTeamZonesData &&
                workTeamZonesData.workteamzones &&
                workTeamZonesData.workteamzones.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка статей и пагинации -->
            <div v-else-if="workTeamZonesData && workTeamZonesData.workteamzones">
              <TeamsWorkZonesList :workteamzones="workTeamZonesData.workteamzones" />
              <CustomPagination
                :base-url="`/`"
                :entity-count="workTeamZonesData.workteamzones"
              />
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>