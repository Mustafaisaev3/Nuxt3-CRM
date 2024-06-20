<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createPropertiesFloor, updatePropertiesFloor } from '~/lib/api/properties'
import type { PropertiesFloor, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  propertiesFloor: {
    type: Object as () => PropertiesFloor,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Properties Floor полученный из props родительского компонента, в случае если мы изменяем Properties Floor
const defaultValues = {
  floorNumber: props.propertiesFloor?.floorNumber,
//   floorPlanImage: props.propertiesFloor?.floorPlanImage,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    floorNumber: zod.number(),
    // floorPlanImage: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Properties Floor, в случае если мы изменяем Properties Floor
});

const { value: floorNumber } = useField('floorNumber')
// const { value: floorPlanImage } = useField('floorPlanImage')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Properties Floor, то в этом месте выполняем запрос на создание нового Properties Floor
    if (props.mode == FormMode.CREATE) {
      const response = await createPropertiesFloor(props.author.token, {
        floorNumber: values.floorNumber,
        // floorPlanImage: values.floorPlanImage,
      });

      console.log(response)

      await navigateTo(`/properties/properties-floor/${response.floor.id}`);
    }

    // Если мы изменяем существующий Properties Floor, то в этом месте выполняем запрос на изменение существующего Properties Floor
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Floor ...
      const response = await updatePropertiesFloor(props.author.token, props.propertiesFloor!.id, {
        floorNumber: values.floorNumber,
        // floorPlanImage: values.floorPlanImage,
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
          v-model="floorNumber"
          name="floorNumber"
          type="number"
          placeholder="Номер этажа"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.floorNumber }}</span>
      </div>
      <!-- <div class="mb-4">
        <input
          v-model="floorPlanImage"
          name="floorPlanImage"
          type="text"
          placeholder="Фото плана Этажа"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.floorPlanImage }}</span>
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