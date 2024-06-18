<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetPropertiesEntranceResponse } from '~/lib/api/properties'

import PropertiesEntranceList from '~/components/properties/properties-entrance/PropertiesEntranceList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Properties Entrance
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-entrance`);
  return url.toString();
});

// Запрос Properties Entrance и с использованием useFetch
const { data: propertiesEntrancesData, pending: propertiesEntrancesPending } =
  useFetch<GetPropertiesEntranceResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в propertiesEntrancesData
console.log('propertiesEntrancesData:', propertiesEntrancesData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Properties Entrances — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Properties Entrances -->
          <p v-if="propertiesEntrancesPending">Loading Properties Entrances...</p>
          <!-- Отображение Properties Entrances или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Properties Entrances -->
            <p
              v-if="
                propertiesEntrancesData &&
                propertiesEntrancesData.entrances &&
                propertiesEntrancesData.entrances.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Properties Entrances и пагинации -->
            <div v-else-if="propertiesEntrancesData && propertiesEntrancesData.entrances">
              <PropertiesEntranceList :propertiesEntrances="propertiesEntrancesData.entrances" />
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