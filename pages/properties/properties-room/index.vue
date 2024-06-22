<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса Имущества из библиотек
import type { GetPropertiesRoomResponse } from '~/lib/api/properties'

import PropertiesRoomList from '~/components/properties/properties-room/PropertiesRoomList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса Properties Room
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-room`);
  return url.toString();
});

// Запрос Properties Room и с использованием useFetch
const { data: propertiesRoomsData, pending: propertiesRoomsPending } =
  useFetch<GetPropertiesRoomResponse>(apiUrl, {
    method: 'GET',
  });

// Добавляем лог в консоль для проверки данных в propertiesRoomsData
console.log('propertiesRoomsData:', propertiesRoomsData.value);

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Properties Rooms — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки Properties Rooms -->
          <p v-if="propertiesRoomsPending">Loading Properties Rooms...</p>
          <!-- Отображение Properties Rooms или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия Properties Rooms -->
            <p
              v-if="
                propertiesRoomsData &&
                propertiesRoomsData.rooms &&
                propertiesRoomsData.rooms.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка Properties Rooms и пагинации -->
            <div v-else-if="propertiesRoomsData && propertiesRoomsData.rooms">
              <PropertiesRoomList :propertiesRooms="propertiesRoomsData.rooms" />
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