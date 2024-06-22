<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createPropertiesTerritory, updatePropertiesTerritory } from '~/lib/api/properties'
import type { PropertiesTerritory, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  propertiesTerritory: {
    type: Object as () => PropertiesTerritory,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Properties Territory полученный из props родительского компонента, в случае если мы изменяем Properties Territory
const defaultValues = {
  territoryDistrict: props.propertiesTerritory?.territoryDistrict,
  territoryMicrodistrict: props.propertiesTerritory?.territoryMicrodistrict,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    territoryDistrict: zod.string().nonempty('This is required'),
    territoryMicrodistrict: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Properties Territory, в случае если мы изменяем Properties Territory
});

const { value: territoryDistrict } = useField('territoryDistrict')
const { value: territoryMicrodistrict } = useField('territoryMicrodistrict')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Properties Territory, то в этом месте выполняем запрос на создание нового Properties Territory
    if (props.mode == FormMode.CREATE) {
      const response = await createPropertiesTerritory(props.author.token, {
        territoryDistrict: values.territoryDistrict,
        territoryMicrodistrict: values.territoryMicrodistrict,
      });

      console.log(response)

      await navigateTo(`/properties/properties-territory/${response.territory.id}`);
    }

    // Если мы изменяем существующий Properties Territory, то в этом месте выполняем запрос на изменение существующего Properties Territory
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Territory ...
      const response = await updatePropertiesTerritory(props.author.token, props.propertiesTerritory!.id, {
        territoryDistrict: values.territoryDistrict,
        territoryMicrodistrict: values.territoryMicrodistrict,
      });

      location.reload()

      // Выводим сообщение об успешном сохранении данных
      console.log('Данные успешно сохранены');
    }

  } catch (error) {
    alert(error);
  } finally {
    isSubmitting.value = false;
  }
});



// Меняем Title кнопки в зависимости от mode формы
const FormBtnTitle = computed(() => {
  return props.mode == FormMode.CREATE ? 'Сохранить' : 'Изменить'
})
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-4">
      <div class="mb-4">
        <input
          v-model="territoryDistrict"
          name="territoryDistrict"
          type="text"
          placeholder="Район"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.territoryDistrict }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="territoryMicrodistrict"
          name="territoryMicrodistrict"
          type="text"
          placeholder="Микрорайон"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.territoryMicrodistrict }}</span>
      </div>

      <button
        :disabled="isSubmitting"
        class="float-right px-6 py-3 text-base text-white bg-gray-500 border border-gray rounded-md hover:bg-gray-600"
        :class="{ 'bg-gray-300 cursor-not-allowed': isSubmitting }"
      >
        {{ FormBtnTitle }}
      </button>
    </fieldset>
  </form>
</template>