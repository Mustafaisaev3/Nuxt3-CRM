<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса статей из библиотек
// Импорт запроса статей из библиотек
import type { GetTenantsResponse } from '~/lib/api/tenant'

import TenantsList from '~/components/Tenants/TenantsList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса статей
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/tenants`);
  url.searchParams.append('limit', '10');
  if (route.query.offset) {
    url.searchParams.append('offset', route.query.offset as string);
  }
  return url.toString();
});

// Запрос статей и с использованием useFetch
const { data: tenantData, pending: tenantPending } =
  useFetch<GetTenantsResponse>(apiUrl, {
    method: 'GET',
  });


// Добавляем лог в консоль для проверки данных в tenantData
console.log('tenantDatas:', tenantData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <div class='h-auto pt-6'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Арендаторы — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="md:w-3/4 mr-4">

          <!-- Отображение состояния загрузки статей -->
          <p v-if="tenantPending">Loading tenants...</p>
          <!-- Отображение статей или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия статей -->
            <p
              v-if="
                tenantData &&
                tenantData.tenants &&
                tenantData.tenants.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка статей и пагинации -->
            <div v-else-if="tenantData && tenantData.tenants">
              <TenantsList :tenants="tenantData.tenants" />
              <CustomPagination
                :base-url="`/`"
                :entity-count="tenantData.tenantsCount"
              />
            </div>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>
