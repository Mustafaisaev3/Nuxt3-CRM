<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createTodo, updateTodo } from '~/lib/api/todo'
import type { Todo, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  todo: {
    type: Object as () => Todo,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});


// Формируем обьект Todo полученный из props родительского компонента, в случае если мы изменяем Todo
const defaultValues = {
  title: props.todo?.title,
  description: props.todo?.description,
  body: props.todo?.body,
  tags: props.todo?.tagList.toString(),
  status: props.todo?.status,
  priority: props.todo?.priority,
  startTimedAt: props.todo?.startTimedAt ? new Date(props.todo.startTimedAt) : new Date(),
  endTimedAt: props.todo?.endTimedAt ? new Date(props.todo.endTimedAt) : new Date(),
};

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    title: zod
      .string()
      .nonempty('This is required')
      .min(4, { message: 'Too short' }),
    description: zod.string(),
    body: zod.string().nonempty('This is required'),
    tags: zod.string().nullable().optional(),
    status: zod.string().nonempty('This is required'), // Добавлено правило для приоритета
    priority: zod.string().nonempty('This is required'), // Добавлено правило для приоритета
    startTimedAt: zod.date().nullable(), // Добавлено правило для начало задачи
    endTimedAt: zod.date().nullable(), // Добавлено правило окончание задачи
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Todo, в случае если мы изменяем Todo
});


const { value: title } = useField('title')
const { value: description } = useField('description');
const { value: body } = useField('body');
const { value: tags } = useField('tags');
const { value: status } = useField('status'); // Значение статус
const { value: priority } = useField('priority'); // Значение приоритета
const { value: startTimedAt } = useField('startTimedAt');
const { value: endTimedAt } = useField('endTimedAt');
const { value: substacles } = useField('substacles');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {
    const tagList = tags.value.split(',').map((tag: string) => tag.trim());
    // Если мы создаем новый Todo, то в этом месте выполняем запрос на создание  нового Todo
    if (props.mode == FormMode.CREATE) {
      const response = await createTodo(props.author.token, {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: tagList, 
        status: values.status, // Передача выбранного статуса
        priority: values.priority, // Передача выбранного приоритета
        startTimedAt: values.startTimedAt,
        endTimedAt: values.endTimedAt,
        substacles: values.substacles,
      });

      await navigateTo(`/todos/${response.todo.id}`);
    }

    // Если мы изменяем существующий Todo, то в этом месте выполняем запрос на изменение существующего Todo
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Todo ...
      const response = await updateTodo(props.author.token, props.todo!.id, {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: tagList, 
        status: values.status, // Передача выбранного статуса
        priority: values.priority, // Передача выбранного приоритета
        startTimedAt: values.startTimedAt,
        endTimedAt: values.endTimedAt,
        substacles: values.substacles,
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

interface TaskStatusOption {
  value: string;
  label: string;
}

interface TaskPriorityOption {
  value: string;
  label: string;
}

const taskStatusOptions: TaskStatusOption[] = [
  { value: 'New', label: 'Новая' },
  { value: 'Deleted', label: 'Удалено' },
  { value: 'Waiting', label: 'Ожидание' },
  { value: 'Done', label: 'Выполнена' }
];

const priorityOptions: TaskPriorityOption[] = [
  { value: 'Low', label: 'Низкий' },
  { value: 'Medium', label: 'Средний' },
  { value: 'High', label: 'Высокий' }
];

// Меняем Title кнопки в зависимости от mode формы
const FormBtnTitle = computed(() => {
  return props.mode == FormMode.CREATE ? 'Сохранить' : 'Изменить'
})
</script>

<template>
  <form class="media space-y-4" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-4">
      <div class="mb-4">
        <input
          v-model="title"
          name="title"
          type="text"
          placeholder="Название задачи"
        />
        <span class="text-red-500">{{ errors.title }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="description"
          name="description"
          type="text"
          placeholder="Краткое описание задачи?"
        />
        <span class="text-red-500">{{ errors.description }}</span>
      </div>
      <div class="mb-4">
        <textarea
          v-model="body"
          name="body"
          placeholder="Полное описание задачи"
          rows="8"
        ></textarea>
        <span class="text-red-500">{{ errors.body }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="tags"
          name="tags"
          type="text"
          placeholder="Введите tags"
        />
        <span class="text-red-500">{{ errors.tags }}</span>
      </div>
      <div class="mb-4">
        <select
        v-model="status"
        name="status"
        placeholder="Выберите статус"
        >
        <option value="" disabled selected>Выберите статус</option>
        <option v-for="option in taskStatusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <span class="text-red-500">{{ errors.status }}</span>
    </div>
    <div class="mb-4">
        <select
          v-model="priority"
          name="priority"
        >
          <option value="" disabled selected>Выберите приоритет</option>
          <option v-for="option in priorityOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <span class="text-red-500">{{ errors.priority }}</span>
      </div>

      <div class="flex flex-col gap-4 md:flex-row md:gap-4">
        <div class="mb-4 md:mb-0">
          <label for="startTimedAt" class="block text-sm font-medium text-gray-700">Начало</label>
          <VDatePicker
            id="startTimedAt"
            v-model="startTimedAt"
            :show-time="true"
            :placeholder="'Выберите дату и время'"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          ></VDatePicker>
          <span class="text-red-500">{{ errors.startTimedAt }}</span>
        </div>
  
        <div class="mb-4">
          <label for="endTimedAt" class="block text-sm font-medium text-gray-700">Окончание</label>
          <VDatePicker
            id="endTimedAt"
            v-model="endTimedAt"
            :show-time="true"
            :placeholder="'Выберите дату и время'"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          ></VDatePicker>
          <span class="text-red-500">{{ errors.endTimedAt }}</span>
        </div>
      </div>


      <button
        :disabled="isSubmitting"
        class="float-left md:float-right px-6 py-3 md:left-0 text-base text-white bg-gray-500 border border-gray rounded-md hover:bg-gray-600"
        :class="{ 'bg-gray-300 cursor-not-allowed': isSubmitting }"
      >
        {{ FormBtnTitle }}
      </button>
    </fieldset>
  </form>
</template>

<style>
@media only screen and (max-width: 700px) {
  .media {
    /* width: 80%; */
    /* margin-left: auto; */
  }
}
</style>