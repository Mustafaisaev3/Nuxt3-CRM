<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
//import { defineProps } from 'vue'
import * as zod from 'zod'
import { createArticle } from '~/lib/api/article'
import type { User } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
});

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
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: title } = useField('title');
const { value: description } = useField('description');
const { value: body } = useField('body');
const { value: tags } = useField('tags');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {
    const tagList = tags.value.split(',').map((tag: string) => tag.trim());

    const response = await createArticle(props.author.token, {
      title: values.title,
      description: values.description,
      body: values.body,
      tagList: tagList,
    });

    await navigateTo(`/article/${response.article.slug}`);
  } catch (error) {
    alert(error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-4">
      <div class="mb-4">
        <input
          v-model="title"
          name="title"
          type="text"
          placeholder="Заголовок"
        />
        <span class="text-red-500">{{ errors.title }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="description"
          name="description"
          type="text"
          placeholder="Краткое описание"
        />
        <span class="text-red-500">{{ errors.description }}</span>
      </div>
      <div class="mb-4">
        <textarea
          v-model="body"
          name="body"
          placeholder="Полное описание"
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
      <button
        :disabled="isSubmitting"
        class="float-right px-6 py-3 text-base text-white bg-gray-500 border border-gray rounded-md hover:bg-gray-600"
        :class="{ 'bg-gray-300 cursor-not-allowed': isSubmitting }"
      >
        Опубликовать новость
      </button>
    </fieldset>
  </form>
</template>
