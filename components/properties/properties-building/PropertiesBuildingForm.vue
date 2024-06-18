<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createPropertiesBuilding, updatePropertiesBuilding } from '~/lib/api/properties'
import type { PropertiesBuilding, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  propertiesBuilding: {
    type: Object as () => PropertiesBuilding,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Properties Building полученный из props родительского компонента, в случае если мы изменяем Properties Building
const defaultValues = {
  buildingName: props.propertiesBuilding?.buildingName,
  nombeBuilding: props.propertiesBuilding?.nombeBuilding,
  yearBuilt: props.propertiesBuilding?.yearBuilt,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    buildingName: zod.string().nonempty('This is required'),
    nombeBuilding: zod.string().nonempty('This is required'),
    yearBuilt: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Properties Building, в случае если мы изменяем Properties Building
});

const { value: buildingName } = useField('buildingName')
const { value: nombeBuilding } = useField('nombeBuilding')
const { value: yearBuilt } = useField('yearBuilt')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Properties Building, то в этом месте выполняем запрос на создание нового Properties Building
    if (props.mode == FormMode.CREATE) {
      const response = await createPropertiesBuilding(props.author.token, {
        buildingName: values.buildingName,
        nombeBuilding: values.nombeBuilding,
        yearBuilt: values.yearBuilt,
      });

      console.log(response)

      await navigateTo(`/properties/properties-building/${response.building.id}`);
    }

    // Если мы изменяем существующий Properties Building, то в этом месте выполняем запрос на изменение существующего Properties Building
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Team ...
      const response = await updatePropertiesBuilding(props.author.token, props.propertiesBuilding!.id, {
        buildingName: values.buildingName,
        nombeBuilding: values.nombeBuilding,
        yearBuilt: values.yearBuilt,
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
          v-model="buildingName"
          name="buildingName"
          type="text"
          placeholder="Название"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.buildingName }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="nombeBuilding"
          name="nombeBuilding"
          type="text"
          placeholder="Номер"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.nombeBuilding }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="yearBuilt"
          name="yearBuilt"
          type="text"
          placeholder="Год постройки"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.yearBuilt }}</span>
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