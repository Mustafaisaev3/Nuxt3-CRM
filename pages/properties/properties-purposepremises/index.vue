<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetPropertiesPurposepremisesResponse } from '~/lib/api/properties'

import PropertiesPurposepremisesList from '~/components/properties/properties-purposepremises/PropertiesPurposepremisesList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Properties Purposepremises
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-purposepremises`);
  return url.toString();
});

// Запрос Properties Purposepremises и с использованием useFetch
const { data: propertiesPurposespremisesData, pending: propertiesPurposespremisesPending } =
  useFetch<GetPropertiesPurposepremisesResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в propertiesPurposespremisesData
console.log('propertiesPurposespremisesData:', propertiesPurposespremisesData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Properties Purposespremises — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Properties Purposespremises -->
          <p v-if="propertiesPurposespremisesPending">Loading Properties Purposespremises...</p>
          <!-- Отображение Properties Floors или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Properties Purposespremises -->
            <p
              v-if="
                propertiesPurposespremisesData &&
                propertiesPurposespremisesData.purposepremisess &&
                propertiesPurposespremisesData.purposepremisess.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Properties Purposespremises и пагинации -->
            <div v-else-if="propertiesPurposespremisesData && propertiesPurposespremisesData.purposepremisess">
              <PropertiesPurposepremisesList :propertiesPurposespremises="propertiesPurposespremisesData.purposepremisess" />
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