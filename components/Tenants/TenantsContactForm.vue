<script setup lang="ts">
import * as zod from 'zod'
//import { defineProps, defineEmits } from 'vue';
import { ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { createTenantContact } from '~/lib/api/tenant'
import type { User } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  tenantId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['create:tenantContact']);

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    contactTypeTenant: zod.string().nonempty('This is required'),
    attitudeContactTypeTenant: zod.string().nonempty('This is required'),
    valueTenant: zod.string().nonempty('This is required'),
    firstNameTenant: zod.string(),
    lastNameTenant: zod.string(),
    organizationTenant: zod.string(),
    jobTitleTenant: zod.string(),
    addressTenant: zod.string(),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: contactTypeTenant } = useField('contactTypeTenant');
const { value: attitudeContactTypeTenant } = useField('attitudeContactTypeTenant');
const { value: valueTenant } = useField('valueTenant');
const { value: firstNameTenant } = useField('firstNameTenant');
const { value: lastNameTenant } = useField('lastNameTenant');
const { value: organizationTenant } = useField('organizationTenant');
const { value: jobTitleTenant } = useField('jobTitleTenant');
const { value: addressTenant } = useField('addressTenant');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  
  try {
    const response = await createTenantContact(
      props.author.token,
      props.tenantId,
      values
    );

    console.log(response)

    emit('create:tenantContact');
  } catch (error) {
    alert(error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <fieldset class="w-full p-0 m-0 border-0">
        <div class="mb-4">
          <input
            v-model="contactTypeTenant"
            name="description"
            type="text"
            placeholder="Тип контакта"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
          <span class="text-red-500">{{ errors.contactTypeTenant }}</span>
        </div>
      </fieldset>
      <fieldset class="w-full p-0 m-0 border-0">
        <div class="mb-4">
          <input
            v-model="attitudeContactTypeTenant"
            name="description"
            type="text"
            placeholder="Позиция"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
          <span class="text-red-500">{{ errors.attitudeContactTypeTenant }}</span>
        </div>
      </fieldset>
      <fieldset class="w-full p-0 m-0 border-0">
          <div class="mb-4">
            <input
              v-model="valueTenant"
              name="description"
              type="text"
              placeholder="Контакт"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <span class="text-red-500">{{ errors.valueTenant }}</span>
          </div>
      </fieldset>
      <fieldset class="w-full p-0 m-0 border-0">
          <div class="mb-4">
            <input
              v-model="firstNameTenant"
              name="description"
              type="text"
              placeholder="Имя"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <span class="text-red-500">{{ errors.firstNameTenant }}</span>
          </div>
      </fieldset>
      <fieldset class="w-full p-0 m-0 border-0">
          <div class="mb-4">
            <input
              v-model="lastNameTenant"
              name="description"
              type="text"
              placeholder="Фамилия"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <span class="text-red-500">{{ errors.lastNameTenant }}</span>
          </div>
      </fieldset>
      <fieldset class="w-full p-0 m-0 border-0">
          <div class="mb-4">
            <input
              v-model="organizationTenant"
              name="description"
              type="text"
              placeholder="Организация"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <span class="text-red-500">{{ errors.organizationTenant }}</span>
          </div>
      </fieldset>
      <fieldset class="w-full p-0 m-0 border-0">
          <div class="mb-4">
            <input
              v-model="jobTitleTenant"
              name="description"
              type="text"
              placeholder="Должность"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <span class="text-red-500">{{ errors.jobTitleTenant }}</span>
          </div>
      </fieldset>
      <fieldset class="w-full p-0 m-0 border-0">
          <div class="mb-4">
            <input
              v-model="addressTenant"
              name="description"
              type="text"
              placeholder="Адрес"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <span class="text-red-500">{{ errors.addressTenant }}</span>
          </div>
      </fieldset>
    </div>
    <button :disabled="isSubmitting" type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" :class="{ 'bg-gray-300 cursor-not-allowed': isSubmitting }">
      Добавить
    </button>
  </form>
</template>