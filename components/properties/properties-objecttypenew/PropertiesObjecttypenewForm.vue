<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createObjectType, updateObjectType } from '~/lib/api/properties'
import type { PropertiesObjectTypeNew, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  objectType: {
    type: Object as () => PropertiesObjectTypeNew,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Objects Type полученный из props родительского компонента, в случае если мы изменяем Objects Type
const defaultValues = {
  objectType: props.objectType?.objectType,
  nameObjectType: props.objectType?.nameObjectType,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    objectType: zod.string().nonempty('This is required'),
    nameObjectType: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Objects Type, в случае если мы изменяем Objects Type
});

const { value: objectType } = useField('objectType')
const { value: nameObjectType } = useField('nameObjectType')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Objects Type, то в этом месте выполняем запрос на создание  нового Objects Type
    if (props.mode == FormMode.CREATE) {
      console.log(props.author.token, ';sksksksk')
      const response = await createObjectType(props.author.token, {
        objectType: values.objectType,
        nameObjectType: values.nameObjectType,
      });


      await navigateTo(`/properties/properties-objecttypenew/${response.objectType.id}`);
    }

    // Если мы изменяем существующий Objects Type, то в этом месте выполняем запрос на изменение существующего Objects Type
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Objects ...
      const response = await updateObjectType(props.author.token, props.objectType!.id, {
        objectType: values.objectType,
        nameObjectType: values.nameObjectType,
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
          v-model="objectType"
          name="objectType"
          type="text"
          placeholder="Тип Недвижимости"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.objectType }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="nameObjectType"
          name="nameObjectType"
          type="text"
          placeholder="Название Типа Недвижимости"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.nameObjectType }}</span>
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