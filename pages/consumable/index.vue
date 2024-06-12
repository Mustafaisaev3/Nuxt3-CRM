<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetConsumableResponse } from '~/lib/api/consumable'

import ConsumableList from '~/components/consumable/ConsumableList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Consumable
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/consumable`);
  return url.toString();
});

// Запрос Consumable и с использованием useFetch
const { data: consumableData, pending: consumablePending } =
  useFetch<GetConsumableResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в consumableData
console.log('consumableData:', consumableData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Расходные материалы — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Consumable -->
          <p v-if="consumablePending">Loading goods...</p>
          <!-- Отображение Consumable или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Consumable -->
            <p
              v-if="
                consumableData &&
                consumableData.consumables &&
                consumableData.consumables.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Consumable и пагинации -->
            <div v-else-if="consumableData && consumableData.consumables">
              <ConsumableList :consumables="consumableData.consumables" />
              <CustomPagination
                :base-url="`/`"
                :entity-count="consumableData.consumableCount"
              />
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>