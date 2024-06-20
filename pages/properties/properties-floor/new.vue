<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import PropertiesFloorForm from '~/components/properties/properties-floor/PropertiesFloorForm.vue'
import { APP_NAME } from '~/constants/index'
import { authStore } from '~/stores/auth'

// ПЩЩВЫ: use a middleware
const auth = authStore();

if (!auth.isAuthenticated) {
  await navigateTo('/');
}
const title = APP_NAME.toLocaleLowerCase()
</script>

<template>
  <div class='mt-20'>
    <Head>
      <title>
        Новый Этаж - {{ title }}
      </title>
    </Head>
    <TheContainer>
      <div class="w-full md:w-10/12 md:mx-auto">
        <PropertiesFloorForm :author="auth.currentUser" />
      </div>
    </TheContainer>
  </div>
</template>