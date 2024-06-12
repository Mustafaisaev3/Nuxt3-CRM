<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createСonsumableType, updateСonsumableType } from '~/lib/api/consumable'
import type { ConsumableType, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  consumableType: {
    type: Object as () => ConsumableType,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

// Формируем обьект Consumable Type полученный из props родительского компонента, в случае если мы изменяем Consumable Type
const defaultValues = {
  consumableTypeName: props.consumableType?.consumableTypeName,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    consumableTypeName: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Consumable Type, в случае если мы изменяем Consumable Type
});

const { value: consumableTypeName } = useField('consumableTypeName')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  console.log(values, 'sjsjsjssjsj')
  try {

    // Если мы создаем новый Consumable Type, то в этом месте выполняем запрос на создание нового Consumable Type
    if (props.mode == FormMode.CREATE) {
      const response = await createСonsumableType(props.author.token, {
        consumableTypeName: values.consumableTypeName,
      });

      await navigateTo(`/consumable/consumable_types/${response.goodsType.id}`);
    }

    // Если мы изменяем существующий Consumable Type, то в этом месте выполняем запрос на изменение существующего Consumable Type
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Team ...
      const response = await updateСonsumableType(props.author.token, props.consumableType!.id, {
        consumableTypeName: values.consumableTypeName,
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
          v-model="consumableTypeName"
          name="consumableTypeName"
          type="text"
          placeholder="Название типа Расходного материала"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.consumableTypeName }}</span>
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