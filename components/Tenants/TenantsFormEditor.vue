<script setup lang="ts">
import { useFetch } from '#imports'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { API_BASE_URL } from '~/constants'
import type { GetTenantResponse } from '~/lib/api/tenant'
import type { User } from '~/types'

const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
});

const route = useRoute();
const id = route.params.id as string;

// Получите данные из API
const { data: tenantData, pending: tenantPending } =
  useFetch<GetTenantResponse>(
    new URL(`${API_BASE_URL}/tenants/${id}`).toString(),
    {
      method: 'GET',
    },
  );

const isSubmitting = ref(false);

const token = props.author.token; // Предположим, что у вас есть доступ к токену

// Обработчик отправки формы
const onSubmit = async () => {
  isSubmitting.value = true;

  try {
    const updatedTenant = {
      ...tenantData.value, // Копируем существующие данные арендатора
      authorId: props.author.id, // Добавляем информацию об авторе
    };

    const response = await fetch(`${API_BASE_URL}/tenants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(props.author.token)}`,
      },
      body: JSON.stringify({ tenant: updatedTenant }), // Обернуть данные в словарь с ключом "tenant"
      
    });

    if (!response.ok) {
      throw new Error('Ошибка при сохранении данных');
    }

    // Выводим сообщение об успешном сохранении данных
    console.log('Данные успешно сохранены');
  } catch (error) {
    // Выводим сообщение об ошибке сохранения данных
    console.error('Ошибка при сохранении данных:', error);
  } finally {
    // Сбрасываем флаг isSubmitting после выполнения запроса
    isSubmitting.value = false;
  }
};

</script>

<template>
  <div>
    <Head>
      <title>
        {{
          tenantData && tenantData.tenant
            ? `Изменить арендатор - ${tenantData.tenant.tradeName}`
            : 'Loading the tenant...'
        }}
      </title>
    </Head>


    <TheContainer>
      <section class="bg-white dark:bg-gray-900">
        <p v-if="tenantPending" class="mb-8">Loading the tenant...</p>
        <div
          class="py-8 px-4 mx-auto max-w-2xl lg:py-16"
          v-else-if="tenantData && tenantData.tenant"
        >
          <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Название задачи -->
    <div class="mb-4">
          <h2
            class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white"
          >
          Изменить сведеней
          </h2>

          <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Торговое наименование </span>
            <input v-model="tenantData.tenant.tradeName" type="text" placeholder="Торговое наименование" />
          </div>
      
    <!-- Тип арендатора -->
    <div class="mb-4">
      <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Тип арендатора </span>
      <select v-model="tenantData.tenant.tenantType">
        <option value="individual">Физическое лицо</option>
        <option value="legal_entity">Юридическое лицо</option>
      </select>
    </div>
          <!-- Тип организации -->
    <div class="mb-4">
      <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Тип организации </span>
      <select v-model="tenantData.tenant.organizationType">
        <option value="NULL">-------</option>
        <option value="llc">ООО (Общество с ограниченной ответственностью)</option>
        <option value="jsc">ЗАО (Закрытое акционерное общество)</option>
        <option value="ojsc">ОАО (Открытое акционерное общество)</option>
        <option value="sole_proprietorship">ИП (Индивидуальный предприниматель)</option>
        <option value="self_employed">Самозанятый</option>
        <!-- Добавьте другие опции по мере необходимости -->
      </select>
    </div>
    
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Имя арендатора </span>
            <input v-model="tenantData.tenant.tenantName" type="text" placeholder="Имя арендатора" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Фамилия арендатора </span>
            <input v-model="tenantData.tenant.tenantSurname" type="text" placeholder="Фамилия арендатора" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Отчество арендатора </span>
            <input v-model="tenantData.tenant.tenantPatronymic" type="text" placeholder="Отчество арендатора" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Серия паспорта </span>
            <input v-model="tenantData.tenant.tenantPassportSeries" type="text" placeholder="Серия паспорта" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Номер паспорта </span>
            <input v-model="tenantData.tenant.tenantPassportNumber" type="text" placeholder="Номер паспорта" />
          </div>
    <div class="mb-4">
      <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Кем выдан паспорт </span>
      <input v-model="tenantData.tenant.tenantPassportIssuedBy" type="text" placeholder="Кем выдан паспорт" />
    </div>
    <div class="mb-4">
      <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Прописка </span>
      <input v-model="tenantData.tenant.tenantRegistration" type="text" placeholder="Прописка" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Название организации </span>
            <input v-model="tenantData.tenant.tenantCompanyName" type="text" placeholder="Название организации" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">ИНН </span>
            <input v-model="tenantData.tenant.tenantInn" type="text" placeholder="ИНН" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">КПП </span>
            <input v-model="tenantData.tenant.KPP" type="text" placeholder="КПП" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">ОГРН </span>
            <input v-model="tenantData.tenant.tenantOgrn" type="text" placeholder="ОГРН" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Реквизиты банка </span>
            <input v-model="tenantData.tenant.bankDetails" type="text" placeholder="Реквизиты банка" />
          </div>
    <div class="mb-4">
            <span class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Дополнительная информация </span>
            <input v-model="tenantData.tenant.additionalInfo" type="text" placeholder="Дополнительная информация" />
          </div>



    </div>
    <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-3 text-base text-white bg-gray-500 border border-gray rounded-md hover:bg-gray-600"
                :class="{ 'bg-gray-300 cursor-not-allowed': isSubmitting }"
                @click="console.log('Кнопка Сохранить нажата')"
              >
                Сохранить
              </button>
        </form>

          <div class="flex items-center space-x-4">
            
              <!-- Добавьте остальные поля формы для других данных, если необходимо -->
              
          </div>


          <hr class="my-4 border-t border-gray-200" />
        </div>
      </section>
    </TheContainer>
  </div>
</template>