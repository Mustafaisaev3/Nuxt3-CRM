<script setup lang="ts">
//import { defineProps } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  tenantContact: any;
}>();
</script>

<template>
  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    <td class="px-4 py-2">
      <span class="date block text-base mb-1 text-gray-400 text-nowrap">{{ tenantContact.firstNameTenant }} {{ tenantContact.lastNameTenant }}</span>
    </td>
    <td class="px-4 py-2">
      <span class="date block text-base mb-1 text-gray-400">{{ tenantContact.contactTypeTenant }}</span>
    </td>
    <td class="px-4 py-2">
      <span class="date block text-base mb-1 text-gray-400">{{ tenantContact.attitudeContactTypeTenant }}</span>
    </td>
    <td class="px-4 py-2">
      <h2 class="font-bold text-base text-gray-400">{{ tenantContact.valueTenant }}</h2>
    </td>
    <td class="px-4 py-2">
      <h2 class="font-bold text-base text-gray-400">{{ tenantContact.organizationTenant }}</h2>
    </td>
    <td class="px-4 py-2">
      <h2 class="font-bold text-base text-gray-400">{{ tenantContact.jobTitleTenant }}</h2>
    </td>
    <td class="px-4 py-2">
      <h2 class="font-bold text-base text-gray-400">{{ tenantContact.addressTenant }}</h2>
    </td>
  </tr>
</template>