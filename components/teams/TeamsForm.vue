<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createTeam, updateTeam } from '~/lib/api/team'
import type { Team, User } from '~/types'
import { FormMode } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  team: {
    type: Object as () => Team,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});


// Формируем обьект Team полученный из props родительского компонента, в случае если мы изменяем Team
const defaultValues = {
  teamLastName: props.team?.teamLastName,
  teamFirstName: props.team?.teamFirstName,
  teamMiddleName: props.team?.teamMiddleName,
  teamPosition: props.team?.teamPosition,
  teamWorkStartTime: props.team?.teamWorkStartTime,
  teamWorkEndTime: props.team?.teamWorkEndTime,
  teamMobile: props.team?.teamMobile,
  teamWorkPhone: props.team?.teamWorkPhone,
  teamInternalNumber: props.team?.teamInternalNumber,
  teamEmail: props.team?.teamEmail,
  teamPersonalEmail: props.team?.teamPersonalEmail,
  teamWebsite: props.team?.teamWebsite
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    teamLastName: zod.string().nonempty('This is required'),
    teamFirstName: zod.string().nonempty('This is required'),
    teamMiddleName: zod.string().nonempty('This is required'),
    teamPosition: zod.string().nonempty('This is required'),
    teamWorkStartTime: zod.string(),
    teamWorkEndTime: zod.string(),
    teamMobile: zod.string(),
    teamWorkPhone: zod.string(),
    teamInternalNumber: zod.string(),
    teamEmail: zod.string().email('It should be Email'),
    teamPersonalEmail: zod.string().email('It should be Email'),
    teamWebsite: zod.string(),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Team, в случае если мы изменяем Team
});


const { value: teamLastName } = useField('teamLastName')
const { value: teamFirstName } = useField('teamFirstName');
const { value: teamMiddleName } = useField('teamMiddleName');
const { value: teamPosition } = useField('teamPosition');
const { value: teamWorkStartTime } = useField('teamWorkStartTime');
const { value: teamWorkEndTime } = useField('teamWorkEndTime');
const { value: teamMobile } = useField('teamMobile');
const { value: teamWorkPhone } = useField('teamWorkPhone');
const { value: teamInternalNumber } = useField('teamInternalNumber');
const { value: teamEmail } = useField('teamEmail');
const { value: teamPersonalEmail } = useField('teamPersonalEmail');
const { value: teamWebsite } = useField('teamWebsite');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Team, то в этом месте выполняем запрос на создание  нового Team
    if (props.mode == FormMode.CREATE) {
      const response = await createTeam(props.author.token, {
        teamLastName: values.teamLastName,
        teamFirstName: values.teamFirstName,
        teamMiddleName: values.teamMiddleName,
        teamPosition: values.teamPosition, 
        teamWorkStartTime: values.teamWorkStartTime,
        teamWorkEndTime: values.teamWorkEndTime,
        teamMobile: values.teamMobile,
        teamWorkPhone: values.teamWorkPhone,
        teamInternalNumber: values.teamInternalNumber,
        teamEmail: values.teamEmail,
        teamPersonalEmail: values.teamPersonalEmail,
        teamWebsite: values.teamWebsite,
      });

      await navigateTo(`/teams/${response.team.id}`);
    }

    // Если мы изменяем существующий Team, то в этом месте выполняем запрос на изменение существующего Team
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Team ...
      const response = await updateTeam(props.author.token, props.team!.id, {
        teamLastName: values.teamLastName,
        teamFirstName: values.teamFirstName,
        teamMiddleName: values.teamMiddleName,
        teamPosition: values.teamPosition, 
        teamWorkStartTime: values.teamWorkStartTime,
        teamWorkEndTime: values.teamWorkEndTime,
        teamMobile: values.teamMobile,
        teamWorkPhone: values.teamWorkPhone,
        teamInternalNumber: values.teamInternalNumber,
        teamEmail: values.teamEmail,
        teamPersonalEmail: values.teamPersonalEmail,
        teamWebsite: values.teamWebsite,
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
          v-model="teamFirstName"
          name="teamFirstName"
          type="text"
          placeholder="Имя"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamFirstName }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamLastName"
          name="teamLastName"
          type="text"
          placeholder="Фамилия"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamLastName }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamMiddleName"
          name="teamMiddleName"
          type="text"
          placeholder="Второе имя"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamMiddleName }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamPosition"
          name="teamPosition"
          type="text"
          placeholder="Позиция"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamPosition }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamWorkStartTime"
          name="teamWorkStartTime"
          type="date"
          placeholder="Начало работы"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamWorkStartTime }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamWorkEndTime"
          name="teamWorkEndTime"
          type="date"
          placeholder="Конец работы"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamWorkEndTime }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamMobile"
          name="teamMobile"
          type="text"
          placeholder="Номер телефона команды"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamMobile }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamWorkPhone"
          name="teamWorkPhone"
          type="text"
          placeholder="Рабочий Номер телефона"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamWorkPhone }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamInternalNumber"
          name="teamInternalNumber"
          type="text"
          placeholder="Внутрений Номер"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamInternalNumber }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamEmail"
          name="teamEmail"
          type="email"
          placeholder="Email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamEmail }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamPersonalEmail"
          name="teamPersonalEmail"
          type="email"
          placeholder="Личный Email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamPersonalEmail }}</span>
      </div>
      <div class="mb-4">
        <input
          v-model="teamWebsite"
          name="teamWebsite"
          type="text"
          placeholder="Сайт"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <span class="text-red-500">{{ errors.teamWebsite }}</span>
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