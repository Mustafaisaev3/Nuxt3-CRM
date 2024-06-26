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
import Select from '../ui/select/Select.vue'
import { API_BASE_URL } from '~/constants'

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
    buildingType: zod.number(),
    purposePremises: zod.number(),
    technicalFeatures: zod.string().nonempty('This is required'),
    room: zod.array(zod.number()),
    floor: zod.array(zod.number()),
    entrance: zod.array(zod.number()),
    building: zod.array(zod.number()),
    territory: zod.array(zod.number()),
    cluster: zod.array(zod.number()),
  })
  
  // -------- Вариант с Объектом (не id) ---------- //
  // zod.object({
  //   objectAddress: zod.string().nonempty('This is required'),
  //   cadastreNumber: zod.string().nonempty('This is required'),
  //   buildingType: zod.string().nonempty('This is required'),
  //   technicalFeatures: zod.string().nonempty('This is required'),
  //   purposePremises: zod.array(zod.record(zod.unknown())),
  //   room: zod.array(zod.record(zod.unknown())),
  //   floor: zod.array(zod.record(zod.unknown())),
  //   entrance: zod.array(zod.record(zod.unknown())),
  //   building: zod.array(zod.record(zod.unknown())),
  //   territory: zod.array(zod.record(zod.unknown())),
  //   cluster: zod.array(zod.record(zod.unknown())),
  // })
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
        building_type: values.buildingType,
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
        building_type: values.buildingType,
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

// Получаем Object Types
const { data: objectTypesData, pending: objectTypesPending } =
  await useFetch(`${API_BASE_URL}/properties-objecttypenew`, {
    method: 'GET',
});

// Получаем Floors
const { data: floorsData, pending: floorsPending } =
  await useFetch(`${API_BASE_URL}/properties-floor`, {
    method: 'GET',
});

// Получаем Clusters
const { data: clustersData, pending: clustersPending } =
  await useFetch(`${API_BASE_URL}/properties-cluster`, {
    method: 'GET',
});

// Получаем Entrance
const { data: entrancesData, pending: entrancesPending } =
  await useFetch(`${API_BASE_URL}/properties-entrance`, {
    method: 'GET',
});

// Получаем Rooms
const { data: roomsData, pending: roomsPending } =
  await useFetch(`${API_BASE_URL}/properties-room`, {
    method: 'GET',
});

// Получаем Purposepremises
const { data: purposepremisesData, pending: purposepremisesPending } =
  await useFetch(`${API_BASE_URL}/properties-purposepremises`, {
    method: 'GET',
});

// Получаем Territories
const { data: territoriesData, pending: territoriesPending } =
  await useFetch(`${API_BASE_URL}/properties-territory`, {
    method: 'GET',
});

// Получаем Buildings
const { data: buildingsData, pending: buildingsPending } =
  await useFetch(`${API_BASE_URL}/properties-building`, {
    method: 'GET',
});


console.log(floorsData ,clustersData ,entrancesData ,roomsData ,purposepremisesData ,territoriesData ,buildingsData)

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
        <Select 
          v-model="buildingType" 
          :options="objectTypesData.objecttypenews" 
          :optionLabelKey="'nameObjectType'"
          :optionValueKey="'id'"
          :label="'Тип здания'"
        />
        <span class="text-red-500">{{ errors.buildingType }}</span>
      </div>
      <div class="mb-4">
        <Select 
          v-model="purposePremises" 
          :options="purposepremisesData.purposepremisess" 
          :optionLabelKey="'namePurposePremises'"
          :optionValueKey="'id'"
          :label="'Назначение объекта'"
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
          :options="roomsData.rooms" 
          :optionLabelKey="'roomNumber'"
          :optionValueKey="'id'"
          :label="'Выберите Комнату'"
        />
        <span class="text-red-500">{{ errors.room }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="floor" 
          :options="floorsData.floors" 
          :optionLabelKey="'floorNumber'"
          :optionValueKey="'id'"
          :label="'Выберите Этаж'"
        />
        <span class="text-red-500">{{ errors.floor }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="entrance" 
          :options="entrancesData.entrances" 
          :optionLabelKey="'entranceNumber'"
          :optionValueKey="'id'"
          :label="'Выберите Подьезд'"
        />
        <span class="text-red-500">{{ errors.entrance }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="building" 
          :options="buildingsData.buildings" 
          :optionLabelKey="'buildingName'"
          :optionValueKey="'id'"
          :label="'Выберите Здание'"
        />
        <span class="text-red-500">{{ errors.building }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="territory" 
          :options="territoriesData.territorys" 
          :optionLabelKey="'territoryDistrict'"
          :optionValueKey="'id'"
          :label="'Выберите Территорию'"
        />
        <span class="text-red-500">{{ errors.territory }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="cluster" 
          :options="clustersData.clusters" 
          :optionLabelKey="'clusterCity'"
          :optionValueKey="'id'"
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

    <!--  Вариант с Объектом (не id) -->
    <!-- <fieldset :disabled="isSubmitting" class="space-y-4">
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
        <MultiSelect 
          v-model="purposePremises" 
          :options="purposepremisesData.purposepremisess" 
          :optionLabelKey="'namePurposePremises'"
          :label="'Назначение объекта'"
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
          :options="roomsData.rooms" 
          :optionLabelKey="'roomNumber'"
          :label="'Выберите Комнату'"
        />
        <span class="text-red-500">{{ errors.room }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="floor" 
          :options="floorsData.floors" 
          :optionLabelKey="'floorNumber'"
          :label="'Выберите Этаж'"
        />
        <span class="text-red-500">{{ errors.floor }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="entrance" 
          :options="entrancesData.entrances" 
          :optionLabelKey="'entranceNumber'"
          :label="'Выберите Подьезд'"
        />
        <span class="text-red-500">{{ errors.entrance }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="building" 
          :options="buildingsData.buildings" 
          :optionLabelKey="'buildingName'"
          :label="'Выберите Здание'"
        />
        <span class="text-red-500">{{ errors.building }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="territory" 
          :options="territoriesData.territorys" 
          :optionLabelKey="'territoryDistrict'"
          :label="'Выберите Территорию'"
        />
        <span class="text-red-500">{{ errors.territory }}</span>
      </div>
      <div class="mb-4">
        <MultiSelect 
          v-model="cluster" 
          :options="clustersData.clusters" 
          :optionLabelKey="'clusterCity'"
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
    </fieldset> -->
  </form>
</template>