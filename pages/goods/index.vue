<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetGoodsResponse } from '~/lib/api/goods'

import GoodsList from '~/components/goods/GoodsList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Имущества
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/goods`);
  return url.toString();
});

// Запрос Имущества и с использованием useFetch
const { data: goodsData, pending: goodsPending } =
  useFetch<GetGoodsResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в goodsData
console.log('goodsDatas:', goodsData.value);

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

          <!-- Отображение состояния загрузки Имущества -->
          <p v-if="goodsPending">Loading goods...</p>
          <!-- Отображение Имущества или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия статей -->
            <p
              v-if="
                goodsData &&
                goodsData.goods &&
                goodsData.goods.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Имущества и пагинации -->
            <div v-else-if="goodsData && goodsData.goods">
              <GoodsList :goods="goodsData.goods" />
              <CustomPagination
                :base-url="`/`"
                :entity-count="goodsData.goodsCount"
              />
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>