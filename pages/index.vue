<script setup lang="ts">
// Импорт необходимых функций и компонентов из библиотек
// Импорт константы API_BASE_URL из фаimport { computed, useFetch, useRoute } from '#imports'
import { API_BASE_URL, APP_NAME } from '~/constants'
// import { computed, useRoute } from 'vue'
// import { useFetch } from 'vue-query'
// ;('~/constants')
// Импорт запроса статей из библиотек
// import { computed, useRoute } from 'vue'
// import { useFetch } from 'vue-query'
// ;('~/constants')
// Импорт запроса статей из библиотек
import type { GetArticlesResponse } from '~/lib/api/article'
// Импорт запроса тегов из библиотек
// Импорт запроса тегов из библиотек
import type { GetTagsResponse } from '~/lib/api/tag'

// Использование маршрута из Vue Router
const route = useRoute()

// Вычисляемое свойство для определения вкладок меню
const menuTabs = computed(() => {
  const base = [{ label: 'Все новости', href: `/` }]
  if (route.query.tag) {
    return [
      ...base,
      {
        label: `#${route.query.tag as string}`,
        href: `/?tag=${route.query.tag as string}`,
      },
    ]
  }
  return base
})

// Определение текущей вкладки
const currentTab = route.query.tag
  ? `#${route.query.tag as string}`
  : 'Global Feed'

// Формирование URL для запроса статей
const apiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/articles`)
  url.searchParams.append('limit', '10')
  if (route.query.offset) {
    url.searchParams.append('offset', route.query.offset as string)
  }
  if (route.query.tag) {
    url.searchParams.append('tag', route.query.tag as string)
  }
  return url.toString()
})

// Запрос статей и с использованием useFetch
const { data: articleData, pending: articlePending } =
  useFetch<GetArticlesResponse>(apiUrl, {
    method: 'GET',
  })

// Запрос и тегов с использованием useFetch
const { data: tagData, pending: tagPending } = useFetch<GetTagsResponse>(
  new URL(`${API_BASE_URL}/tags`).toString(),
  {
    method: 'GET',
  },
)

/*
// Добавляем лог в консоль для проверки данных в articleData
console.log('articleData:', articleData.value);
// Проверяем pending, чтобы убедиться, что запрос выполнился
console.log('articlePending:', articlePending);
*/
</script>

<template>
  <!-- Главный контейнер страницы -->
  <div class="h-auto">
    <!-- Заголовок страницы -->
    <Head>
      <title>Новости — {{ APP_NAME }}</title>
    </Head>

    <!-- Компонент для отображения главной информации на странице -->
    <AppJumbotron />

    <!-- Контейнер для основного контента -->
    <TheContainer>
      <!-- Разделение контейнера на две колонки -->
      <div class="flex md:space-x-4">
        <!-- Левая колонка -->J-XDtB3cjE-kuBF
        <div class="md:w-3/4 mr-4">
          <!-- Меню вкладок с активной вкладкой -->
          <TabbedMenu :tabs="menuTabs" :active-tab="currentTab" />

          <!-- Отображение состояния загрузки статей -->
          <p v-if="articlePending">Loading articles...</p>
          <!-- Отображение статей или сообщения о их отсутствии -->
          <div v-else>
            <!-- Проверка наличия статей -->
            <p
              v-if="
                articleData &&
                articleData.articles &&
                articleData.articles.length === 0
              "
            >
              Здесь нет статей... пока.
            </p>
            <!-- Отображение списка статей и пагинации -->
            <div v-else-if="articleData && articleData.articles">
              <ArticleList :articles="articleData.articles" />
              <CustomPagination
                :base-url="`/`"
                :entity-count="articleData.articlesCount"
              />
            </div>
          </div>
        </div>

        <!-- Правая колонка (сайдбар) -->
        <div class="md:w-1/4">
          <!-- Блок с популярными тегами -->
          <div class="sidebar p-3 rounded bg-gray-200 dark:bg-gray-700">
            <p class="text-sm font-medium dark:text-gray-400 text-gray-500">
              Популярные теги
            </p>

            <!-- Отображение состояния загрузки тегов -->
            <p v-if="tagPending">Загрузка тегов...</p>
            <!-- Отображение списка популярных тегов -->
            <ul v-else-if="tagData && tagData.tags" class="tag-list list-none">
              <!-- Итерация по списку тегов -->
              <li
                v-for="tag in tagData.tags"
                :key="tag"
                class="mt-3 inline-block"
              >
                <!-- Ссылка на страницу с тегом -->
                <NuxtLink :to="`./?tag=${encodeURIComponent(tag)}`">
                  <!-- Компонент для отображения тега -->
                  <AppTag :name="tag"/>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>
