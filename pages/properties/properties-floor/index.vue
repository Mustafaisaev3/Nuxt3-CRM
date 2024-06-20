<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetPropertiesFloorResponse } from '~/lib/api/properties'

import PropertiesFloorList from '~/components/properties/properties-floor/PropertiesFloorList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Properties Floor
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-floor`);
  return url.toString();
});

// Запрос Properties Floor и с использованием useFetch
const { data: propertiesFloorsData, pending: propertiesFloorsPending } =
  useFetch<GetPropertiesFloorResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в propertiesFloorsData
console.log('propertiesFloorsData:', propertiesFloorsData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Properties Floors — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Properties Floors -->
          <p v-if="propertiesFloorsPending">Loading Properties Floors...</p>
          <!-- Отображение Properties Floors или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Properties Floors -->
            <p
              v-if="
                propertiesFloorsData &&
                propertiesFloorsData.floors &&
                propertiesFloorsData.floors.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Properties Floors и пагинации -->
            <div v-else-if="propertiesFloorsData && propertiesFloorsData.floors">
              <PropertiesFloorList :propertiesFloors="propertiesFloorsData.floors" />
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