<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import PropertiesBuildingForm from '~/components/properties/properties-building/PropertiesBuildingForm.vue'
import { APP_NAME } from '~/constants/index'
import { authStore } from '~/stores/auth'

// ПЩЩВЫ: use a middleware
const auth = authStore();

if (!auth.isAuthenticated) {
  await navigateTo('/');
}
const title = APP_NAME.toLocaleLowerCase();
</script>

<template>
  <div class='mt-20'>
    <Head>
      <title>
        Новая Недвижимость - {{ title }}
      </title>
    </Head>
    <TheContainer>
      <div class="w-full md:w-10/12 md:mx-auto">
        <PropertiesBuildingForm :author="auth.currentUser" />
      </div>
    </TheContainer>
  </div>
</template>
