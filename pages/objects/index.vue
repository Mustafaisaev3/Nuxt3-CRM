<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// Импорт запроса статей из библиотек
// Импорт запроса статей из библиотек
// import type { GetObjects } from '~/lib/api/object'

import ObjectsList from '~/components/objects/ObjectsList.vue'

// Использование маршрута из Vue Router
const route = useRoute();

// Формирование URL для запроса objects
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-object`);
  // url.searchParams.append('limit', '10');
  // if (route.query.offset) {
  //   url.searchParams.append('offset', route.query.offset as string);
  // }
  return url.toString();
});

// Запрос objects и с использованием useFetch
const { data: objectsData, pending: objectsPending } =
  useFetch(apiUrl, {
    method: 'GET',
  });


// Добавляем лог в консоль для проверки данных в objectsData
console.log('objectsDatas:', objectsData.value);

// const getObjects = async () => {
//   const data = await useFetch(apiUrl, {
//     method: 'GET',
//   });

//   console.log(data, 'objects')
// }

</script>

<template>
  <!-- Главный контейнер страницы -->
  <!-- убран md:ml-64, ломает верстку -->
  <div class='h-auto pt-20'>
    <!-- Заголовок страницы -->
    <Head>
      <title>Oбъект недвижимости — {{ APP_NAME }}</title>
    </Head>

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->
        <div class="w-full mr-4">

          <!-- Отображение состояния загрузки статей -->
          <p v-if="teamsPending">Loading objects...</p>
          <!-- Отображение статей или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия статей -->
            <p
              v-if="
                objectsData &&
                objectsData.objects &&
                objectsData.objects.length === 0
              "
            >
              Здесь нет записей ... пока.
            </p>
            <!-- Отображение списка статей и пагинации -->
            <div v-else-if="objectsData && objectsData.objects">
              <ObjectsList :objects="objectsData.objects" />
              <CustomPagination
                :base-url="`/`"
                :entity-count="objectsData.teamsCount"
              />
            </div>
          </div>
          <!-- <button @click="getObjects">Hello</button> -->
        </div>
      </div>
    </TheContainer>
  </div>
</template>