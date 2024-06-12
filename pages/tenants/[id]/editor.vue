<script setup lang="ts">
import { navigateTo, useFetch, useRoute } from 'nuxt/app'
//import { TenantForm } from '~/components/tenants/TenantForm.vue'
import { API_BASE_URL, APP_NAME } from '~/constants'
import type { GetTenantResponse } from '~/lib/api/tenant'
import { authStore } from '~/stores/auth'

// TODO: use a middleware
const auth = authStore();

const route = useRoute();
const id = route.params.id as string;

if (!auth.isAuthenticated) {
  await navigateTo('/');
}
const title = APP_NAME.toLocaleLowerCase();

const { data: tenantData, pending: tenantPending } =
  useFetch<GetTenantResponse>(
    new URL(`${API_BASE_URL}/tenants/${id}`).toString(),
    {
      method: 'GET',
    },
  );
console.log('conslog', tenantData.value)
</script>

<template>
  <div class='mt-6'>
    <Head>
      <title v-if="tenantData" v-text="'Изменить арендатор - ' + tenantData.tenant.tradeName"></title>
    </Head>
    <TheContainer>
      <div class="w-full md:w-10/12 md:mx-auto">
        <TenantsFormEditor :author="auth.currentUser" :tenantData="tenantData" v-if="tenantData" />
      </div>
    </TheContainer>
  </div>
</template>
