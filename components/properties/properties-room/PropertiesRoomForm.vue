<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createPropertiesRoom, updatePropertiesRoom } from '~/lib/api/properties'
import type { PropertiesRoom, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  propertiesRoom: {
    type: Object as () => PropertiesRoom,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Properties Room полученный из props родительского компонента, в случае если мы изменяем Properties Room
const defaultValues = {
    roomNumber: props.propertiesRoom?.roomNumber,
    // planNumber: props.propertiesRoom?.planNumber,
    entrance: props.propertiesRoom?.entrance,
    area: props.propertiesRoom?.area,
    // roomPlan: props.propertiesRoom?.roomPlan,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    roomNumber: zod.string(),
    // planNumber: zod.string(),
    entrance: zod.string(),
    area: zod.string(),
    // roomPlan: zod.string(),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Properties Room, в случае если мы изменяем Properties Room
});

const { value: roomNumber } = useField('roomNumber')
// const { value: planNumber } = useField('planNumber')
const { value: entrance } = useField('entrance')
const { value: area } = useField('area')
// const { value: roomPlan } = useField('roomPlan')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Properties Room, то в этом месте выполняем запрос на создание нового Properties Room
    if (props.mode == FormMode.CREATE) {
      const response = await createPropertiesRoom(props.author.token, {
        roomNumber: values.roomNumber,
        // planNumber: values.planNumber,
        roomEntrance: values.entrance,
        roomArea: values.area,
        // roomPlan: values.roomPlan,
      });

      console.log(response)

      await navigateTo(`/properties/properties-room/${response.room.id}`);
    }

    // Если мы изменяем существующий Properties Room, то в этом месте выполняем запрос на изменение существующего Properties Room
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Room ...
      const response = await updatePropertiesRoom(props.author.token, props.propertiesRoom!.id, {
        roomNumber: values.roomNumber,
        // planNumber: values.planNumber,
        roomEntrance: values.entrance,
        roomArea: values.area,
        // roomPlan: values.roomPlan,
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
          v-model="roomNumber"
          name="roomNumber"
          type="text"
          placeholder="Номер комнаты"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.roomNumber }}</span>
      </div>
      <!-- <div class="mb-4">
        <input
          v-model="planNumber"
          name="planNumber"
          type="text"
          placeholder="Номер плана"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.planNumber }}</span>
      </div> -->
      <div class="mb-4">
        <input
          v-model="entrance"
          name="entrance"
          type="text"
          placeholder="Вход"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.entrance }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="area"
          name="area"
          type="text"
          placeholder="Площадь"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.area }}</span>
      </div>
      <!-- <div class="mb-4">
        <input
          v-model="roomPlan"
          name="roomPlan"
          type="text"
          placeholder="План комнаты"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.roomPlan }}</span>
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