<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
//import { TenantForm } from '~/components/tenants/TenantForm.vue'
import { APP_NAME } from '~/constants'
import { authStore } from '~/stores/auth'

// TODO: use a middleware
const auth = authStore();

if (!auth.isAuthenticated) {
  await navigateTo('/');
}
const title = APP_NAME.toLocaleLowerCase();
</script>

<template>
  <div class='mt-6'>
    <Head>
      <title>
        Новый арендатор - {{ title }}
      </title>
    </Head>
    <TheContainer>
      <div class="w-full md:w-10/12 md:mx-auto">
        <TenantsForm :author="auth.currentUser" />
      </div>
    </TheContainer>
  </div>
</template>
