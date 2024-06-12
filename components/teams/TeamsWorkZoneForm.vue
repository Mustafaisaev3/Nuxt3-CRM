<script setup lang="ts">
import { navigateTo, ref, watch } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { API_BASE_URL } from '~/constants'
import { createWorkTeamZone, updateWorkTeamZone } from '~/lib/api/team'
import type { TeamWorkZone, User } from '~/types'
import { FormMode } from '~/types'
import MultiSelect from '../ui/select/MultiSelect.vue'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  teamworkzone: {
    type: Object as () => TeamWorkZone,
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
  object_related: props.teamworkzone?.object_related,
  team_related: props.teamworkzone?.team_related,
};

console.log(defaultValues, 'default')

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    object_related: zod.number(),
    team_related: zod.number().array().min(1),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Team, в случае если мы изменяем Team
});


const { value: object_related } = useField('object_related')
const { value: team_related } = useField('team_related');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {

    // Если мы создаем новый Work Team Zone, то в этом месте выполняем запрос на создание  нового Work Team Zone
    if (props.mode == FormMode.CREATE) {
      const response = await createWorkTeamZone(props.author.token, {
        object_related: values.object_related,
        team_related: values.team_related,
      });

      await navigateTo(`/teams/work_team_zones/${response.teamworkzone.id}`);
    }

    // Если мы изменяем существующий Work Team Zone, то в этом месте выполняем запрос на изменение существующего Work Team Zone
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Team ...
      const response = await updateWorkTeamZone(props.author.token, props.teamworkzone!.id, {
        object_related: values.object_related,
        team_related: values.team_related,
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


// Получаем Teams
// Формирование URL для запроса teams
const getTeamsApiUrl = computed(() => {
  const url = new URL(`${API_BASE_URL}/teams`);

  return url.toString();
});

// Делаем запрос на получение teams
const { data: teamsData, pending: teamsPending } =
  useFetch(getTeamsApiUrl, {
    method: 'GET',
  });

const selected_options = ref([])
watch(team_related, () => {
  console.log(team_related.value, object_related.value, errors)
})

// Меняем Title кнопки в зависимости от mode формы
const FormBtnTitle = computed(() => {
  return props.mode == FormMode.CREATE ? 'Сохранить' : 'Изменить'
})
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-4">

      <div class="mb-4" v-if="!objectsPending">
        <select
          v-model="object_related"
          name="object_related"
          placeholder="Выберите Обьект"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          <option value="" disabled selected>Выберите обьект</option>
          <option v-for="object in objectsData.objects" :key="object.id" :value="object.id">{{ object.objectAddress }}</option>
        </select>
        <span class="text-red-500">{{ errors.object_related }}</span>
      </div>

      <div class="mb-4" v-if="!teamsPending">
        <MultiSelect 
          v-model="team_related" 
          :options="teamsData.teams" 
          :optionValueKey="'id'"
          :optionLabelKey="'teamFirstName'"
          :label="'Выберите участника'"
        />
        <span class="text-red-500">{{ errors.team_related }}</span>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="float-right px-6 py-3 text-base text-white bg-gray-500 border border-gray rounded-md hover:bg-gray-600"
        :class="{ 'bg-gray-300 cursor-not-allowed': isSubmitting }"
      >
        {{ FormBtnTitle }}
      </button>
    </fieldset>
  </form>
</template>