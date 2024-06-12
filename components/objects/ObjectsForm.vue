<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createObject, updateObject } from '~/lib/api/object'
import type { User } from '~/types'
import { FormMode } from '~/types'
import MultiSelect from '../ui/select/MultiSelect.vue'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  // TODO: Поправить типы
  object: {
    type: Object as () => any,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});


// Формируем обьект Object полученный из props родительского компонента, в случае если мы изменяем Object
const defaultValues = {
  objectAddress: props.object?.objectAddress,
  cadastreNumber: props.object?.cadastreNumber,
  buildingType: props.object?.buildingType,
  purposePremises: props.object?.purposePremises,
  technicalFeatures: props.object?.technicalFeatures,
  room: props.object?.room,
  floor: props.object?.floor,
  entrance: props.object?.entrance,
  building: props.object?.building,
  territory: props.object?.territory,
  cluster: props.object?.cluster,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    objectAddress: zod.string().nonempty('This is required'),
    cadastreNumber: zod.string().nonempty('This is required'),
    buildingType: zod.string().nonempty('This is required'),
    purposePremises: zod.string().nonempty('This is required'),
    technicalFeatures: zod.string(),
    room: zod.number().array().min(1),
    floor: zod.number().array().min(1),
    entrance: zod.number().array().min(1),
    building: zod.number().array().min(1),
    territory: zod.number().array().min(1),
    cluster: zod.number().array().min(1),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Team, в случае если мы изменяем Object
});


const { value: objectAddress } = useField('objectAddress')
const { value: cadastreNumber } = useField('cadastreNumber');
const { value: buildingType } = useField('buildingType');
const { value: purposePremises } = useField('purposePremises');
const { value: technicalFeatures } = useField('technicalFeatures');
const { value: room } = useField('room');
const { value: floor } = useField('floor');
const { value: entrance } = useField('entrance');
const { value: building } = useField('building');
const { value: territory } = useField('territory');
const { value: cluster } = useField('cluster');


const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Object, то в этом месте выполняем запрос на создание  нового Object
    if (props.mode == FormMode.CREATE) {
      const response = await createObject(props.author.token, {
        objectAddress: values.objectAddress,
        cadastreNumber: values.cadastreNumber,
        buildingType: values.buildingType,
        purposePremises: values.purposePremises, 
        technicalFeatures: values.technicalFeatures,
        room: values.room,
        floor: values.floor,
        entrance: values.entrance,
        building: values.building,
        territory: values.territory,
        cluster: values.cluster,
      });

      await navigateTo(`/properties-object/${response.object.id}`);
    }

    // Если мы изменяем существующий Object, то в этом месте выполняем запрос на изменение существующего Object
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Object ...
      const response = await updateObject(props.author.token, props.object!.id, {
        objectAddress: values.objectAddress,
        cadastreNumber: values.cadastreNumber,
        buildingType: values.buildingType,
        purposePremises: values.purposePremises, 
        technicalFeatures: values.technicalFeatures,
        room: values.room,
        floor: values.floor,
        entrance: values.entrance,
        building: values.building,
        territory: values.territory,
        cluster: values.cluster,
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

interface roomTypeOption {
  value: string | number;
  label: string;
}

interface floorTypeOption {
  value: string | number;
  label: string;
}

interface entranceTypeOption {
  value: string | number;
  label: string;
}

interface buildingTypeOption {
  value: string | number;
  label: string;
}

interface territoryTypeOption {
  value: string | number;
  label: string;
}

interface clusterTypeOption {
  value: string | number;
  label: string;
}

const roomOptions: roomTypeOption[] = [
  { value: 1, label: 'Комната 1' },
  { value: 2, label: 'Комната 2' }
];

const floorOptions: floorTypeOption[] = [
  { value: 1, label: 'Подвал' },
  { value: 2, label: 'Этаж - 1' },
  { value: 3, label: 'Этаж - 2' },
  { value: 4, label: 'Этаж - 3' },
];

const entranceOptions: entranceTypeOption[] = [
  { value: 1, label: 'Подьезд 1' },
  { value: 2, label: 'Подьезд 2' }
];

const buildingOptions: buildingTypeOption[] = [
  { value: 1, label: 'Строение 1' },
  { value: 2, label: 'Строение 2' }
];

const territoryOptions: territoryTypeOption[] = [
  { value: 1, label: 'Территория 1' },
  { value: 2, label: 'Территория 2' }
];

const clusterOptions: clusterTypeOption[] = [
  { value: 1, label: 'Кластер 1' },
  { value: 2, label: 'Кластер 2' }
];




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
          v-model="objectAddress"
          name="objectAddress"
          type="text"
          placeholder="Адрес обьекта"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.objectAddress }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="cadastreNumber"
          name="cadastreNumber"
          type="text"
          placeholder="Кадастровый номер"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.cadastreNumber }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="buildingType"
          name="buildingType"
          type="text"
          placeholder="Тип здания"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.buildingType }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="purposePremises"
          name="purposePremises"
          type="text"
          placeholder="Назначение помещения"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.purposePremises }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="technicalFeatures"
          name="technicalFeatures"
          type="text"
          placeholder="Технические особенности"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.technicalFeatures }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="room" 
          :options="roomOptions" 
          :optionValueKey="'value'"
          :optionLabelKey="'label'"
          :label="'Выберите Комнату'"
        />
        <span class="text-red-500">{{ errors.room }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="floor" 
          :options="floorOptions" 
          :optionValueKey="'value'"
          :optionLabelKey="'label'"
          :label="'Выберите Этаж'"
        />
        <span class="text-red-500">{{ errors.floor }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="entrance" 
          :options="entranceOptions" 
          :optionValueKey="'value'"
          :optionLabelKey="'label'"
          :label="'Выберите Подьезд'"
        />
        <span class="text-red-500">{{ errors.entrance }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="building" 
          :options="buildingOptions" 
          :optionValueKey="'value'"
          :optionLabelKey="'label'"
          :label="'Выберите Здание'"
        />
        <span class="text-red-500">{{ errors.building }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="territory" 
          :options="territoryOptions" 
          :optionValueKey="'value'"
          :optionLabelKey="'label'"
          :label="'Выберите Территорию'"
        />
        <span class="text-red-500">{{ errors.territory }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="cluster" 
          :options="clusterOptions" 
          :optionValueKey="'value'"
          :optionLabelKey="'label'"
          :label="'Выберите Кластер'"
        />
        <span class="text-red-500">{{ errors.cluster }}</span>
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