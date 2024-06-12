<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import TeamsWorkZoneForm from '~/components/teams/TeamsWorkZoneForm.vue'
import { APP_NAME } from '~/constants'
import { authStore } from '~/stores/auth'

// TEAMS: use a middleware
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
        Новыая Wowk Team Zone - {{ title }}
      </title>
    </Head>
    <TheContainer>
      <div class="w-full md:w-10/12 md:mx-auto">
        <TeamsWorkZoneForm :author="auth.currentUser" />
      </div>
    </TheContainer>
  </div>
</template>