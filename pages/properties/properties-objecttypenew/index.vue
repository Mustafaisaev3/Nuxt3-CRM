<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetObjectsTypeResponse } from '~/lib/api/properties'

import PropertiesObjecttypenewList from '~/components/properties/properties-objecttypenew/PropertiesObjecttypenewList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Objects Type
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-objecttypenew`);
  return url.toString();
});

// Запрос Objects Type и с использованием useFetch
const { data: objectsTypeData, pending: objectsTypePending } =
  useFetch<GetObjectsTypeResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в objectsTypeData
console.log('objectsTypeData:', objectsTypeData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Objects Type — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Objects Type -->
          <p v-if="objectsTypePending">Loading objects types...</p>
          <!-- Отображение Objects Type или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Objects Type -->
            <p
              v-if="
                objectsTypeData &&
                objectsTypeData.objecttypenews &&
                objectsTypeData.objecttypenews.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Objects Type и пагинации -->
            <div v-else-if="objectsTypeData && objectsTypeData.objecttypenews">
              <PropertiesObjecttypenewList :objectTypes="objectsTypeData.objecttypenews" />
              <!-- <CustomPagination 
                :base-url="`/`"
                :entity-count="objectsTypeData.goodsCount"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>