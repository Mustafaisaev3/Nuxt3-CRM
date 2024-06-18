<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetPropertiesBuildingsResponse } from '~/lib/api/properties'

import PropertiesBuildingList from '~/components/properties/properties-building/PropertiesBuildingList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Properties Building
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-building`);
  return url.toString();
});

// Запрос Properties Building и с использованием useFetch
const { data: propertiesBuildingsData, pending: propertiesBuildingsPending } =
  useFetch<GetPropertiesBuildingsResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в propertiesBuildingsData
console.log('propertiesBuildingsData:', propertiesBuildingsData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Properties Building — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Properties Building -->
          <p v-if="propertiesBuildingsPending">Loading Properties Building...</p>
          <!-- Отображение Properties Building или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Properties Building -->
            <p
              v-if="
                propertiesBuildingsData &&
                propertiesBuildingsData.buildings &&
                propertiesBuildingsData.buildings.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Properties Building и пагинации -->
            <div v-else-if="propertiesBuildingsData && propertiesBuildingsData.buildings">
              <PropertiesBuildingList :propertiesBuildings="propertiesBuildingsData.buildings" />
              <!-- <CustomPagination
                :base-url="`/`"
                :entity-count="goodsData.goodsCount"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>