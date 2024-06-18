<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetPropertiesClusterResponse } from '~/lib/api/properties'

import PropertiesClusterList from '~/components/properties/properties-cluster/PropertiesClusterList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Properties Cluster
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-cluster`);
  return url.toString();
});

// Запрос Properties Cluster и с использованием useFetch
const { data: propertiesClustersData, pending: propertiesClustersPending } =
  useFetch<GetPropertiesClusterResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в propertiesClustersData
console.log('propertiesClustersData:', propertiesClustersData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Properties Clusters — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Properties Clusters -->
          <p v-if="propertiesClustersPending">Loading Properties Clusters...</p>
          <!-- Отображение Properties Clusters или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Properties Clusters -->
            <p
              v-if="
                propertiesClustersData &&
                propertiesClustersData.clusters &&
                propertiesClustersData.clusters.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Properties Clusters и пагинации -->
            <div v-else-if="propertiesClustersData && propertiesClustersData.clusters">
              <PropertiesClusterList :propertiesClusters="propertiesClustersData.clusters" />
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