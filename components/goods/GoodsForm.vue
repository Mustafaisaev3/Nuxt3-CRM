<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { API_BASE_URL } from '~/constants'
import { createGood, updateGood } from '~/lib/api/goods'
import type { Good, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  good: {
    // type: Object as () => Good,
    type: Object as () => any,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Goods полученный из props родительского компонента, в случае если мы изменяем Goods
const defaultValues = {
  goodsType: props.good?.goodsType,
  goodsName: props.good?.goodsName,
  goodsInventoryNumber: props.good?.goodsInventoryNumber,
  goodsDescription: props.good?.goodsDescription,
//   goodsPhoto: props.good?.goodsPhoto,
  goodsConditionDescription: props.good?.goodsConditionDescription,
  goodsDamageDateTime: props.good?.goodsDamageDateTime,
  goodsRelatedObject: props.good?.goodsRelatedObject,
  goodsResponsiblePerson: props.good?.goodsResponsiblePerson,
  goodsStatus: props.good?.goodsStatus
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    goodsType: zod.string(),
    goodsName: zod.string().nonempty('This is required'),
    goodsInventoryNumber: zod.string(),
    goodsDescription: zod.string(),
    // goodsPhoto: zod.string(),
    goodsConditionDescription: zod.string(),
    goodsDamageDateTime: zod.string(),
    goodsRelatedObject: zod.number(),
    goodsResponsiblePerson: zod.string(),
    goodsStatus: zod.string(),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Good, в случае если мы изменяем Good
});


const { value: goodsType } = useField('goodsType')
const { value: goodsName } = useField('goodsName')
const { value: goodsInventoryNumber } = useField('goodsInventoryNumber');
const { value: goodsDescription } = useField('goodsDescription');
// const { value: goodsPhoto } = useField('goodsPhoto');
const { value: goodsConditionDescription } = useField('goodsConditionDescription');
const { value: goodsDamageDateTime } = useField('goodsDamageDateTime');
const { value: goodsRelatedObject } = useField('goodsRelatedObject');
const { value: goodsResponsiblePerson } = useField('goodsResponsiblePerson');
const { value: goodsStatus } = useField('goodsStatus');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Good, то в этом месте выполняем запрос на создание  нового Good
    if (props.mode == FormMode.CREATE) {
      const response = await createGood(props.author.token, {
        goodsType: values.goodsType,
        goodsName: values.goodsName,
        goodsInventoryNumber: values.goodsInventoryNumber,
        goodsDescription: values.goodsDescription,
        // goodsPhoto: values.goodsPhoto, 
        goodsConditionDescription: values.goodsConditionDescription,
        goodsDamageDateTime: values.goodsDamageDateTime,
        goodsRelatedObject: values.goodsRelatedObject,
        goodsResponsiblePerson: values.goodsResponsiblePerson,
        goodsStatus: values.goodsStatus,
      });

      await navigateTo(`/goods/${response.good.id}`);
    }

    // Если мы изменяем существующий Good, то в этом месте выполняем запрос на изменение существующего Good
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Team ...
      const response = await updateGood(props.author.token, props.good!.id, {
        goodsType: values.goodsType,
        goodsName: values.goodsName,
        goodsInventoryNumber: values.goodsInventoryNumber,
        goodsDescription: values.goodsDescription,
        // goodsPhoto: values.goodsPhoto, 
        goodsConditionDescription: values.goodsConditionDescription,
        goodsDamageDateTime: values.goodsDamageDateTime,
        goodsRelatedObject: values.goodsRelatedObject,
        goodsResponsiblePerson: values.goodsResponsiblePerson,
        goodsStatus: values.goodsStatus,
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


// Получаем Goods Types
// Формирование URL для запроса Goods Types
const getGoodsTypesApiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/goods-types`);

  return url.toString();
});

// Делаем запрос на получение Goods Types
const { data: goodsTypesData, pending: goodsTypesPending } =
  useFetch(getGoodsTypesApiUrl, {
    method: 'GET',
  });

console.log(goodsTypesData, 'shshshs')


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
          v-model="goodsName"
          name="goodsName"
          type="text"
          placeholder="Название"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsName }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="goodsInventoryNumber"
          name="goodsInventoryNumber"
          type="text"
          placeholder="Инвентарный номер"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsInventoryNumber }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="goodsDescription"
          name="goodsDescription"
          type="text"
          placeholder="Описание"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsDescription }}</span>
      </div>
      <!-- <div class="mb-4">
        <input
          v-model="goodsPhoto"
          name="goodsPhoto"
          type="text"
          placeholder="Фото имущества"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsPhoto }}</span>
      </div> -->
      <div class="mb-4">
        <textarea
          v-model="goodsConditionDescription"
          name="goodsConditionDescription"
          type="text"
          placeholder="Описание состояния имущества"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsConditionDescription }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="goodsDamageDateTime"
          name="goodsDamageDateTime"
          type="date"
          placeholder="Дата поломки имущества"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsDamageDateTime }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="goodsResponsiblePerson"
          name="goodsResponsiblePerson"
          type="text"
          placeholder="Ответственный за имущество"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsResponsiblePerson }}</span>
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
      <div class="mb-4" v-if="!goodsTypesPending">
        <select
          v-model="goodsType"
          name="goodsType"
          placeholder="Выберите Тип Имущества"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          <option value="" disabled selected>Выберите Тип Имущества</option>
          <option v-for="goodsType in goodsTypesData.goodstype" :key="goodsType.id" :value="goodsType.goodsTypeName">{{ goodsType.goodsTypeName }}</option>
        </select>
        <span class="text-red-500">{{ errors.goodsType }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="goodsStatus"
          name="goodsStatus"
          type="text"
          placeholder="Статус имущества"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.goodsStatus }}</span>
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