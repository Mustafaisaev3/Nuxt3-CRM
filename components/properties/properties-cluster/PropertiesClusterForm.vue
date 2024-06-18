<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createPropertiesCluster, updatePropertiesCluster } from '~/lib/api/properties'
import type { PropertiesCluster, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  propertiesCluster: {
    type: Object as () => PropertiesCluster,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Properties Cluster полученный из props родительского компонента, в случае если мы изменяем Properties Cluster
const defaultValues = {
  clusterRegion: props.propertiesCluster?.clusterRegion,
  clusterCity: props.propertiesCluster?.clusterCity,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    clusterRegion: zod.string().nonempty('This is required'),
    clusterCity: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Properties Cluster, в случае если мы изменяем Properties Cluster
});

const { value: clusterRegion } = useField('clusterRegion')
const { value: clusterCity } = useField('clusterCity')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Properties Cluster, то в этом месте выполняем запрос на создание нового Properties Cluster
    if (props.mode == FormMode.CREATE) {
      const response = await createPropertiesCluster(props.author.token, {
        clusterRegion: values.clusterRegion,
        clusterCity: values.clusterCity,
      });

      console.log(response)

      await navigateTo(`/properties/properties-cluster/${response.cluster.id}`);
    }

    // Если мы изменяем существующий Properties Cluster, то в этом месте выполняем запрос на изменение существующего Properties Cluster
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Cluster ...
      const response = await updatePropertiesCluster(props.author.token, props.propertiesCluster!.id, {
        clusterRegion: values.clusterRegion,
        clusterCity: values.clusterCity,
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
          v-model="clusterRegion"
          name="clusterRegion"
          type="text"
          placeholder="Регион"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.clusterRegion }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="clusterCity"
          name="clusterCity"
          type="text"
          placeholder="Город"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.clusterCity }}</span>
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