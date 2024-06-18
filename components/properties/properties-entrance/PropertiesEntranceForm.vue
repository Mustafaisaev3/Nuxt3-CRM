<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createPropertiesEntrance, updatePropertiesEntrance } from '~/lib/api/properties'
import type { PropertiesEntrance, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  propertiesEntrance: {
    type: Object as () => PropertiesEntrance,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Properties Entrance полученный из props родительского компонента, в случае если мы изменяем Properties Entrance
const defaultValues = {
  entranceNumber: props.propertiesEntrance?.entranceNumber,
//   entrancePlanImage: props.propertiesEntrance?.entrancePlanImage,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    entranceNumber: zod.number(),
    // entrancePlanImage: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Properties Entrance, в случае если мы изменяем Properties Entrance
});

const { value: entranceNumber } = useField('entranceNumber')
// const { value: entrancePlanImage } = useField('entrancePlanImage')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Properties Entrance, то в этом месте выполняем запрос на создание нового Properties Entrance
    if (props.mode == FormMode.CREATE) {
      const response = await createPropertiesEntrance(props.author.token, {
        entranceNumber: values.entranceNumber,
        // entrancePlanImage: values.entrancePlanImage,
      });

      console.log(response)

      await navigateTo(`/properties/properties-entrance/${response.entrance.id}`);
    }

    // Если мы изменяем существующий Properties Entrance, то в этом месте выполняем запрос на изменение существующего Properties Entrance
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Entrance ...
      const response = await updatePropertiesEntrance(props.author.token, props.propertiesEntrance!.id, {
        entranceNumber: values.entranceNumber,
        // entrancePlanImage: values.entrancePlanImage,
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
          v-model="entranceNumber"
          name="entranceNumber"
          type="number"
          placeholder="Номер подъезда"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.entranceNumber }}</span>
      </div>
      <!-- <div class="mb-4">
        <input
          v-model="entrancePlanImage"
          name="entrancePlanImage"
          type="text"
          placeholder="Фото плана этажа"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.entrancePlanImage }}</span>
      </div> -->

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