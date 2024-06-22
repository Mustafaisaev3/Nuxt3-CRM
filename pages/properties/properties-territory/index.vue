<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetPropertiesTerritoryResponse } from '~/lib/api/properties'

import PropertiesTerritoryList from '~/components/properties/properties-territory/PropertiesTerritoryList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Properties Territory
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-territory`);
  return url.toString();
});

// Запрос Properties Territory и с использованием useFetch
const { data: propertiesTerritoriesData, pending: propertiesTerritoriesPending } =
  useFetch<GetPropertiesTerritoryResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в propertiesTerritoriesData
console.log('propertiesTerritoriesData:', propertiesTerritoriesData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Properties Territories — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Properties Territory -->
          <p v-if="propertiesTerritoriesPending">Loading Properties Territory...</p>
          <!-- Отображение Properties Territory или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Properties Territory -->
            <p
              v-if="
                propertiesTerritoriesData &&
                propertiesTerritoriesData.territorys &&
                propertiesTerritoriesData.territorys.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Properties Territory и пагинации -->
            <div v-else-if="propertiesTerritoriesData && propertiesTerritoriesData.territorys">
              <PropertiesTerritoryList :PropertiesTerritories="propertiesTerritoriesData.territorys" />
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