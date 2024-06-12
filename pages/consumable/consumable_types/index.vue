<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetConsumableTypesResponse } from '~/lib/api/consumable'

import ConsumableTypeList from '~/components/consumable/ConsumableTypeList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Имущества
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/consumable-types`);
  return url.toString();
});

// Запрос Имущества и с использованием useFetch
const { data: consumableTypesData, pending: consumableTypesPending } =
  useFetch<GetConsumableTypesResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в consumableTypesData
console.log('consumableTypesData:', consumableTypesData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Типы Расходных материалов — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Имущества -->
          <p v-if="consumableTypesPending">Loading consumable types...</p>
          <!-- Отображение Имущества или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия статей -->
            <p
              v-if="
                consumableTypesData &&
                consumableTypesData.consumabletypes &&
                consumableTypesData.consumabletypes.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Имущества и пагинации -->
            <div v-else-if="consumableTypesData && consumableTypesData.consumabletypes">
              <ConsumableTypeList :consumableTypes="consumableTypesData.consumabletypes" />
              <CustomPagination 
                :base-url="`/`"
                :entity-count="consumableTypesData.consumabletypes.consumablesCount"
              />
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>