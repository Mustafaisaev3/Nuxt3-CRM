<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { API_BASE_URL } from '~/constants'
import { createConsumable, updateConsumable } from '~/lib/api/consumable'
import type { Consumable, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  consumable: {
    type: Object as () => Consumable,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Consumable полученный из props родительского компонента, в случае если мы изменяем Consumables
const defaultValues = {
  consumable_type: props.consumable?.consumableType,
  consumableName: props.consumable?.consumableName,
  consumableDescription: props.consumable?.consumableDescription,
//   consumablePhoto: props.consumable?.consumablePhoto,
  consumableQuantity: props.consumable?.consumableQuantity,
  consumableQuantityUnit: props.consumable?.consumableQuantityUnit,
  consumableRelatedObject: props.consumable?.consumableRelatedObject,
  consumableResponsiblePerson: props.consumable?.consumableResponsiblePerson,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    consumable_type: zod.number(),
    consumableName: zod.string().nonempty('This is required'),
    consumableDescription: zod.string(),
    // consumablePhoto: zod.string(),
    consumableQuantity: zod.string(),
    consumableQuantityUnit: zod.string(),
    consumableRelatedObject: zod.string(),
    consumableResponsiblePerson: zod.string(),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Consumable, в случае если мы изменяем Consumable
});


const { value: consumable_type } = useField('consumable_type')
const { value: consumableName } = useField('consumableName')
const { value: consumableDescription } = useField('consumableDescription');
// const { value: consumablePhoto } = useField('consumablePhoto');
const { value: consumableQuantity } = useField('consumableQuantity');
const { value: consumableQuantityUnit } = useField('consumableQuantityUnit');
const { value: consumableRelatedObject } = useField('consumableRelatedObject');
const { value: consumableResponsiblePerson } = useField('consumableResponsiblePerson');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Consumable, то в этом месте выполняем запрос на создание нового Consumable
    if (props.mode == FormMode.CREATE) {
      const response = await createConsumable(props.author.token, {
        consumable_type: values.consumable_type,
        consumableName: values.consumableName,
        consumableDescription: values.consumableDescription,
        // consumablePhoto: values.consumablePhoto,
        consumableQuantity: values.consumableQuantity,
        consumableQuantityUnit: values.consumableQuantityUnit,
        consumableRelatedObject: values.consumableRelatedObject,
        consumableResponsiblePerson: values.consumableResponsiblePerson,
      });

      await navigateTo(`/consumable/${response.consumable.id}`);
    }

    // Если мы изменяем существующий Consumable, то в этом месте выполняем запрос на изменение существующего Consumable
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Consumable ...
      const response = await updateConsumable(props.author.token, props.consumable!.id, {
        consumable_type: values.consumable_type,
        consumableName: values.consumableName,
        consumableDescription: values.consumableDescription,
        // consumablePhoto: values.consumablePhoto,
        consumableQuantity: values.consumableQuantity,
        consumableQuantityUnit: values.consumableQuantityUnit,
        consumableRelatedObject: values.consumableRelatedObject,
        consumableResponsiblePerson: values.consumableResponsiblePerson,
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


// Получаем Consumable Types
// Формирование URL для запроса Consumable Types
const getConsumableTypesApiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/consumable-types`);

  return url.toString();
});

// Делаем запрос на получение Consumable Types
const { data: consumableTypesData, pending: consumableTypesPending } =
  useFetch(getConsumableTypesApiUrl, {
    method: 'GET',
  });

console.log(consumableTypesData)


// Получаем Objects
// Формирование URL для запроса Objects
const getObjectsApiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/properties-object`);

  return url.toString();
});

// Делаем запрос на получение Objects
const { data: objectsData, pending: objectsPending } =
  useFetch(getObjectsApiUrl, {
    method: 'GET',
  });

console.log(objectsData, 'objects')

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
          v-model="consumableName"
          name="consumableName"
          type="text"
          placeholder="Название"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.consumableName }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="consumableDescription"
          name="consumableDescription"
          type="text"
          placeholder="Описание"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.consumableDescription }}</span>
      </div>
      <!-- <div class="mb-4">
        <input
          v-model="consumablePhoto"
          name="consumablePhoto"
          type="text"
          placeholder="Фото"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.consumablePhoto }}</span>
      </div> -->
      <div class="mb-4">
        <input
          v-model="consumableQuantity"
          name="consumableQuantity"
          type="text"
          placeholder="Количество"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.consumableQuantity }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="consumableQuantityUnit"
          name="consumableQuantityUnit"
          type="text"
          placeholder="Единица измерения"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.consumableQuantityUnit }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="consumableResponsiblePerson"
          name="consumableResponsiblePerson"
          type="text"
          placeholder="Ответственный за расходный материал"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.consumableResponsiblePerson }}</span>
      </div>
      <div class="mb-4" v-if="!objectsPending">
        <select
          v-model="goodsRelatedObject"
          name="goodsRelatedObject"
          placeholder="Выберите Обьект"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          <option value="" disabled selected>Выберите Обьект</option>
          <option v-for="object in objectsData.objects" :key="object.id" :value="object.id">{{ object.objectAddress }}</option>
        </select>
        <span class="text-red-500">{{ errors.goodsRelatedObject }}</span>
      </div>
      <div class="mb-4" v-if="!consumableTypesPending">
        <select
          v-model="consumable_type"
          name="consumable_type"
          placeholder="Выберите тип Рас. Материала"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          <option value="" disabled selected>Выберите тип Рас. Материала</option>
          <option v-for="consumableType in consumableTypesData.consumabletypes" :key="consumableType.id" :value="consumableType.id">{{ consumableType.consumableTypeName }}</option>
        </select>
        <span class="text-red-500">{{ errors.consumable_type }}</span>
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