<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createPropertiesPurposepremises, updatePropertiesPurposepremises } from '~/lib/api/properties'
import type { PropertiesPurposepremises, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  propertiesPurposepremises: {
    type: Object as () => PropertiesPurposepremises,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Properties Purposepremises полученный из props родительского компонента, в случае если мы изменяем Properties Purposepremises
const defaultValues = {
    namePurposePremises: props.propertiesPurposepremises?.namePurposePremises,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    namePurposePremises: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Properties Purposepremises, в случае если мы изменяем Properties Purposepremises
});

const { value: namePurposePremises } = useField('namePurposePremises')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Properties Purposepremises, то в этом месте выполняем запрос на создание нового Properties Purposepremises
    if (props.mode == FormMode.CREATE) {
      const response = await createPropertiesPurposepremises(props.author.token, {
        namePurposePremises: values.namePurposePremises,
      });

      console.log(response)

      await navigateTo(`/properties/properties-purposepremises/${response.purposepremises.id}`);
    }

    // Если мы изменяем существующий Properties Purposepremises, то в этом месте выполняем запрос на изменение существующего Properties Purposepremises
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Floor ...
      const response = await updatePropertiesPurposepremises(props.author.token, props.propertiesPurposepremises!.id, {
        namePurposePremises: values.namePurposePremises,
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
          v-model="namePurposePremises"
          name="namePurposePremises"
          type="string"
          placeholder="Назначение объекта"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.namePurposePremises }}</span>
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