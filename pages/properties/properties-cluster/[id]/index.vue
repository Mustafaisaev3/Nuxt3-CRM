<script setup lang="ts">
import { useFetch, useRoute } from '#imports'
import PropertiesClusterForm from '~/components/properties/properties-cluster/PropertiesClusterForm.vue'
import Modal from '~/components/ui/modal/Modal.vue'
import { API_BASE_URL } from '~/constants'
import { removePropertiesCluster } from '~/lib/api/properties'
import { authStore } from '~/stores/auth'
import { uiStore } from '~/stores/ui'
import { FormMode } from '~/types'

const route = useRoute();
const id = route.params.id as string;
const auth = authStore();
const { openConfirmationModal } = uiStore();


const { data: propertiesClusterData, pending: propertiesClusterPending } =
  useFetch(
    new URL(`${API_BASE_URL}/properties-cluster/${id}`).toString(),
    {
      method: 'GET',
    },
  );
console.log(propertiesClusterData)
// Функция для удаления Cluster
const handleDeletePropertiesCluster = () => {
  openConfirmationModal(`Вы уверенны что хотите удалить Cluster?`, async () => {
    await removePropertiesCluster(auth.currentUser!.token, id)
    await navigateTo(`/properties/properties-cluster`)
  })
}

// Состояние Модального окна
const modal = ref(null)

const openModal = () => {
  modal.value.openModal()
}
</script>

<template>
  <div>
    <Head>
      <title>
        {{
          propertiesClusterData && propertiesClusterData.cluster
            ? propertiesClusterData.cluster.buildingName
            : 'Loading the Properties Cluster...'
        }}
      </title>
    </Head>

    <TenantJumbotron
      v-if="propertiesClusterData && propertiesClusterData.cluster"
      :tenant="propertiesClusterData.cluster.buildingName"
    />

    <TheContainer>
      <section class="bg-white dark:bg-gray-900">
        <p v-if="propertiesClusterPending" class="mb-8">Loading the Properties Cluster...</p>
        <div
          class="py-8 px-4 mx-auto max-w-2xl lg:py-16"
          v-else-if="propertiesClusterData && propertiesClusterData.cluster"
        >
          <p
            class="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white"
          >
            <a
              :href="`/@${encodeURIComponent(
                propertiesClusterData.cluster.author.username,
              )}`"
            >
              <img
                :data-src="propertiesClusterData.cluster.author.image"
                :src="propertiesClusterData.cluster.author.image"
                alt="изображение профиля автора"
                class="inline-block align-middle h-8 w-8 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              />
              @{{ propertiesClusterData.cluster.author.username }}
            </a>
          </p>
          <h2
            class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white"
          >
            <!-- {{ tenantData.tenant.tradeName }} -->
          </h2>
          <dl class="flex items-center space-x-6">
            <div>
              <dt
                class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
              >
                Регион
              </dt>
              <dd
                class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
              >
                {{ propertiesClusterData.cluster.clusterRegion }}
              </dd>
            </div>
            <div>
              <dt
                class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
              >
                Город
              </dt>
              <dd
                class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
              >
                {{ propertiesClusterData.cluster.clusterCity }}
              </dd>
            </div>
          </dl>

          <div class="flex items-center space-x-4">
            <button
              @click="openModal"
              type="button"
              class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                aria-hidden="true"
                class="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Изменить
            </button>
            <button
              @click="handleDeletePropertiesCluster"
              type="button"
              class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 mr-1.5 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Удалить
            </button>
          </div>

        </div>
      </section>
    </TheContainer>
    <!-- Модальное окно для изменения Properties Cluster -->
    <Modal ref="modal">
      <PropertiesClusterForm :author="auth.currentUser" :propertiesCluster="propertiesClusterData.cluster" :mode="FormMode.UPDATE"/>
    </Modal>
    <!-- Модальное окно для изменения Properties Cluster -->
  </div>
</template>