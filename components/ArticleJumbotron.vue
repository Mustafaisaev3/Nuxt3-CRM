<script setup lang="ts">
//import { defineProps } from 'vue';
import { authStore } from '~/stores/auth';
import type { Article } from '~/types';
import { formatLongDate } from '~/utils/dateUtils';

const auth = authStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  article: Article;
}>();
</script>

<template>
  <div class="container mx-auto overflow-auto text-white shadow-inner">
    <TheContainer>
      <h1
        class="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
      >
        {{ article.title }}
      </h1>
      <UserAvatar :image="article.author.image" class="w-8 h-8 mx-4" />
      <div class="ml-2 inline-block align-middle">
        <ul class="list-inside">
          <li class="text-sm font-medium">
            <NuxtLink
              :to="`/@${encodeURIComponent(article.author.username)}`"
              class="hover:underline"
              >{{ article.author.username }}</NuxtLink
            >
          </li>
          <li class="text-xs text-gray-400">
            {{ formatLongDate(article.createdAt) }}
          </li>
        </ul>
      </div>
      <div
        v-if="auth.currentUser?.username !== article.author.username"
        class="ml-4 inline-block align-middle"
      >
        <FavoriteButton
          :username="article.author.username"
          :active="article.author.following"
          class="inline-block align-middle"
        />
        <FavoriteButton
          :favorites-count="article.favoritesCount"
          :active="article.favorited"
          :article-slug="article.slug"
          text="Favorite Article"
          class="inline-block align-middle ml-1"
        />
      </div>
    </TheContainer>
  </div>
</template>

<style scoped>

</style>