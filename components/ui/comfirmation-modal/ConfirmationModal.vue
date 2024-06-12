<template>
  <div v-if="confirmationModalStatus" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal__inner">
        <h2 v-if="confirmationModalData.text" class="text-[#1d1d1d] text-xl font-semibold text-center py-5">{{ confirmationModalData.text }}</h2>
        <div class="flex gap-2 justify-end mt-4">
            <button @click="closeModal" class="inline-flex items-center text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-900">
                Отмена
            </button>
            <button @click="handleConfirmAction" class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                Подтвердить
            </button>
        </div>
      </div>
      <button @click="closeModal" class="modal__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 30 30">
          <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { uiStore } from '~/stores/ui'

const { closeConfirmationModal } = uiStore()
const { confirmationModalStatus, confirmationModalData } = storeToRefs(uiStore())

const closeModal = () => {
  closeConfirmationModal()
}

const handleConfirmAction = () => {
  if (confirmationModalData.value.action) {
    confirmationModalData.value.action()
  }
  closeConfirmationModal()
}

defineExpose({
  closeModal
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal {
  width: auto;
  min-width: 500px;
  height: auto;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  position: relative;
}

.modal__inner {
  width: 100%;
  height: 100%;
  overflow-y: auto
}

.modal__close-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>