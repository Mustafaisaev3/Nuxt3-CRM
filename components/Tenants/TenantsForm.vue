<script setup lang="ts">
import { navigateTo, ref } from '#imports'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { defineProps } from 'vue'
import * as zod from 'zod'
import { createTenant, updateTenant } from '~/lib/api/tenant'
import type { Tenant, User } from '~/types'
import { FormMode } from '~/types'


const props = defineProps({
  author: {
    type: Object as () => User,
    required: true,
  },
  tenant: {
    type: Object as () => Tenant,
    required: false,
  },
  mode: {
    type: Number as PropType<FormMode>,
    required: true,
    default: FormMode.CREATE
  },
});

console.log(props.tenant, 'tenant')

// Формируем обьект Tenant полученный из props родительского компонента, в случае если мы изменяем Tenant
const defaultValues = {
  tradeName: props.tenant?.tradeName,
  tenantType: props.tenant?.tenantType,
  organizationType: props.tenant?.organizationType,
  tenantName: props.tenant?.tenantName,
  tenantSurname: props.tenant?.tenantSurname,
  tenantPatronymic: props.tenant?.tenantPatronymic,
  tenantPassportSeries: props.tenant?.tenantPassportSeries,
  tenantPassportNumber: props.tenant?.tenantPassportNumber,
  tenantPassportIssuedBy: props.tenant?.tenantPassportIssuedBy,
  tenantPassportIssuedDate: props.tenant?.tenantPassportIssuedDate ? new Date(props.tenant?.tenantPassportIssuedDate) : new Date(),
  tenantRegistration: props.tenant?.tenantRegistration,
  tenantCompanyName: props.tenant?.tenantCompanyName,
  tenantInn: props.tenant?.tenantInn,
  KPP: props.tenant?.KPP,
  tenantOgrn: props.tenant?.tenantOgrn,
  bankDetails: props.tenant?.bankDetails,
  additionalInfo: props.tenant?.additionalInfo
};

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    tradeName: zod
      .string()
      .nonempty('This is required')
      .min(4, 'Too short'),
    tenantType: zod.string().nonempty('This is required'),
    organizationType: zod.string().nonempty('This is required'),
    tenantName: zod.string().nonempty('This is required'),
    tenantSurname: zod.string().nonempty('This is required'),
    tenantPatronymic: zod.string().nonempty('This is required'),
    tenantPassportSeries: zod.string().nonempty('This is required'),
    tenantPassportNumber: zod.string().nonempty('This is required'),
    tenantPassportIssuedBy: zod.string().nonempty('This is required'),
    tenantPassportIssuedDate: zod.string(),
    tenantRegistration: zod.string().nonempty('This is required'),
    tenantCompanyName: zod.string().nonempty('This is required'),
    tenantInn: zod.string().nonempty('This is required'),
    KPP: zod.string().nonempty('This is required'),
    tenantOgrn: zod.string().nonempty('This is required'),
    bankDetails: zod.string().nonempty('This is required'),
    additionalInfo: zod.string().nonempty('This is required'),
    //tenantFile: zod.string().nonempty('This is required'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: defaultValues, // Добавляем данные Tenant, в случае если мы изменяем Tenant
});

const { value: tradeName } = useField('tradeName');
const { value: tenantType } = useField('tenantType');
const { value: organizationType } = useField('organizationType');
const { value: tenantName } = useField('tenantName');
const { value: tenantSurname } = useField('tenantSurname');
const { value: tenantPatronymic } = useField('tenantPatronymic');
const { value: tenantPassportSeries } = useField('tenantPassportSeries');
const { value: tenantPassportNumber } = useField('tenantPassportNumber');
const { value: tenantPassportIssuedBy } = useField('tenantPassportIssuedBy');
const { value: tenantPassportIssuedDate } = useField('tenantPassportIssuedDate');
const { value: tenantRegistration } = useField('tenantRegistration');
const { value: tenantCompanyName } = useField('tenantCompanyName');
const { value: tenantInn } = useField('tenantInn');
const { value: KPP } = useField('KPP');
const { value: tenantOgrn } = useField('tenantOgrn');
const { value: bankDetails } = useField('bankDetails');
const { value: additionalInfo } = useField('additionalInfo');
//const { value: tenantFile } = useField('tenantFile');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {
    // Convert the string value to a Date object
    const issuedDate = new Date(values.tenantPassportIssuedDate);
		const issuedDateISO = new Date(values.tenantPassportIssuedDate).toISOString(); // Преобразование в ISO 8601 формат
		const issuedDateFormatted = issuedDateISO.split('T')[0]; // Получение только даты в формате "YYYY-MM-DD"

    // Если мы создаем новый Tenant, то в этом месте выполняем запрос на создание  нового Tenant
    if (props.mode == FormMode.CREATE) {
		  const response = await createTenant(props.author.token, {
        tradeName: values.tradeName,
        tenantType: values.tenantType,
        organizationType: values.organizationType,
        tenantName: values.tenantName,
        tenantSurname: values.tenantSurname,
        tenantPatronymic: values.tenantPassportSeries,
        tenantPassportNumber: values.tenantPassportNumber,
        tenantPassportIssuedBy: values.tenantPassportIssuedBy,
        tenantPassportIssuedDate: issuedDateFormatted, // Assign the Date object
        tenantRegistration: values.tenantRegistration,
        tenantCompanyName: values.tenantCompanyName,
        tenantInn: values.tenantInn,
        KPP: values.KPP,
        tenantOgrn: values.tenantOgrn,
        bankDetails: values.bankDetails,
        additionalInfo: values.additionalInfo,
        //tenantFile: values.tenantFile,
      });

      await navigateTo(`/tenants/${response.tenant.id}`);
    }

    // Если мы изменяем существующий Tenant, то в этом месте выполняем запрос на изменение существующего Tenant
    if (props.mode == FormMode.UPDATE) {
      // Запрос на изменение Tenant ...
      const response = await updateTenant(props.author.token, props.tenant!.id, {
        tradeName: values.tradeName,
        tenantType: values.tenantType,
        organizationType: values.organizationType,
        tenantName: values.tenantName,
        tenantSurname: values.tenantSurname,
        tenantPatronymic: values.tenantPassportSeries,
        tenantPassportNumber: values.tenantPassportNumber,
        tenantPassportIssuedBy: values.tenantPassportIssuedBy,
        tenantPassportIssuedDate: issuedDateFormatted, // Assign the Date object
        tenantRegistration: values.tenantRegistration,
        tenantCompanyName: values.tenantCompanyName,
        tenantInn: values.tenantInn,
        KPP: values.KPP,
        tenantOgrn: values.tenantOgrn,
        bankDetails: values.bankDetails,
        additionalInfo: values.additionalInfo,
        //tenantFile: values.tenantFile,
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

interface tenantTypeOption {
  value: string;
  label: string;
}

interface organizationTypeOption {
  value: string;
  label: string;
}

const tenantTypeOptions: tenantTypeOption[] = [
  { value: 'individual', label: 'Физическое лицо' },
  { value: 'legal_entity', label: 'Юридическое лицо' }
];

const organizationTypeOptions: organizationTypeOption[] = [
  { value: 'NULL', label: '-------' },
  { value: 'llc', label: 'ООО (Общество с ограниченной ответственностью)' },
	{ value: 'jsc', label: 'ЗАО (Закрытое акционерное общество)' },
	{ value: 'ojsc', label: 'ОАО (Открытое акционерное общество)' },
	{ value: 'sole_proprietorship', label: 'ИП (Индивидуальный предприниматель)' },
	{ value: 'self_employed', label: 'Самозанятый' }
];

// Меняем Title кнопки в зависимости от mode формы
const FormBtnTitle = computed(() => {
  return props.mode == FormMode.CREATE ? 'Сохранить' : 'Изменить'
})

</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-4">
      <!-- Название задачи -->
      <div class="mb-4">
        <input
          v-model="tradeName"
          name="tradeName"
          type="text"
          placeholder="Название задачи"
        />
        <span class="text-red-500">{{ errors.tradeName }}</span>
      </div>
      
      <!-- Тип арендатора -->
      <div class="mb-4">
        <select v-model="tenantType" name="tenantType">
          <option value="" disabled selected>Выберите тип арендатора</option>
          <option v-for="option in tenantTypeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <span class="text-red-500">{{ errors.tenantType }}</span>
      </div>
      
      <!-- Тип организации -->
      <div class="mb-4">
        <select v-model="organizationType" name="organizationType">
          <option value="" disabled selected>Выберите тип организации</option>
          <option v-for="option in organizationTypeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <span class="text-red-500">{{ errors.organizationType }}</span>
      </div>
      
      <!-- Имя арендатора -->
      <div class="mb-4">
        <input
          v-model="tenantName"
          name="tenantName"
          type="text"
          placeholder="Имя арендатора"
        />
        <span class="text-red-500">{{ errors.tenantName }}</span>
      </div>

      <!-- Фамилия арендатора -->
      <div class="mb-4">
        <input
          v-model="tenantSurname"
          name="tenantSurname"
          type="text"
          placeholder="Фамилия арендатора"
        />
        <span class="text-red-500">{{ errors.tenantSurname }}</span>
      </div>

      <!-- Отчество арендатора -->
      <div class="mb-4">
        <input
          v-model="tenantPatronymic"
          name="tenantPatronymic"
          type="text"
          placeholder="Отчество арендатора"
        />
        <span class="text-red-500">{{ errors.tenantPatronymic }}</span>
      </div>

      <!-- Серия паспорта -->
      <div class="mb-4">
        <input
          v-model="tenantPassportSeries"
          name="tenantPassportSeries"
          type="text"
          placeholder="Серия паспорта"
        />
        <span class="text-red-500">{{ errors.tenantPassportSeries }}</span>
      </div>

      <!-- Номер паспорта -->
      <div class="mb-4">
        <input
          v-model="tenantPassportNumber"
          name="tenantPassportNumber"
          type="text"
          placeholder="Номер паспорта"
        />
        <span class="text-red-500">{{ errors.tenantPassportNumber }}</span>
      </div>

      <!-- Кем выдан паспорт -->
      <div class="mb-4">
        <input
          v-model="tenantPassportIssuedBy"
          name="tenantPassportIssuedBy"
          type="text"
          placeholder="Кем выдан паспорт"
        />
        <span class="text-red-500">{{ errors.tenantPassportIssuedBy }}</span>
      </div>

      <!-- Дата выдачи паспорта -->
      <div class="mb-4">
        <input
          v-model="tenantPassportIssuedDate"
          name="tenantPassportIssuedDate"
          type="date"
          placeholder="Дата выдачи паспорта"
        />
        <span class="text-red-500">{{ errors.tenantPassportIssuedDate }}</span>
      </div>

      <!-- Прописка -->
      <div class="mb-4">
        <textarea
          v-model="tenantRegistration"
          name="tenantRegistration"
          placeholder="Прописка"
          rows="8"
        ></textarea>
        <span class="text-red-500">{{ errors.tenantRegistration }}</span>
      </div>

      <!-- Название организации -->
      <div class="mb-4">
        <input
          v-model="tenantCompanyName"
          name="tenantCompanyName"
          type="text"
          placeholder="Название организации"
        />
        <span class="text-red-500">{{ errors.tenantCompanyName }}</span>
      </div>

      <!-- ИНН -->
      <div class="mb-4">
        <input
          v-model="tenantInn"
          name="tenantInn"
          type="text"
          placeholder="ИНН"
        />
        <span class="text-red-500">{{ errors.tenantInn }}</span>
      </div>

      <!-- КПП -->
      <div class="mb-4">
        <input
          v-model="KPP"
          name="KPP"
          type="text"
          placeholder="КПП"
        />
        <span class="text-red-500">{{ errors.KPP }}</span>
      </div>

      <!-- ОГРН -->
      <div class="mb-4">
        <input
          v-model="tenantOgrn"
          name="tenantOgrn"
          type="text"
          placeholder="ОГРН"
        />
        <span class="text-red-500">{{ errors.tenantOgrn }}</span>
      </div>

      <!-- Реквизиты банка -->
      <div class="mb-4">
        <textarea
          v-model="bankDetails"
          name="bankDetails"
          placeholder="Реквизиты банка"
          rows="8"
        ></textarea>
        <span class="text-red-500">{{ errors.bankDetails }}</span>
      </div>

      <!-- Дополнительная информация -->
      <div class="mb-4">
        <textarea
          v-model="additionalInfo"
          name="additionalInfo"
          placeholder="Дополнительная информация"
          rows="8"
        ></textarea>
        <span class="text-red-500">{{ errors.additionalInfo }}</span>
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