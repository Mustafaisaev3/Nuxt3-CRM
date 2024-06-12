// Импортируем функцию defineStore из библиотеки pinia для создания хранилища
import { defineStore } from 'pinia'

type ConfirmationModalDataType = {
    text: string,
    action: () => any
}

// Определяем тип состояния для хранилища ui
type uiState = {
  confirmationModalStatus: boolean;
  confirmationModalData: ConfirmationModalDataType  | undefined; 
};

// Начальное состояние хранилища
const defaultState: uiState = {
    confirmationModalStatus: false,
    confirmationModalData: undefined,
};

// Экспортируем хранилище uiStore
export const uiStore = defineStore({
  id: 'ui', // Идентификатор хранилища
  state: () => defaultState, // Начальное состояние хранилища
  getters: {},
  actions: {
    // Открываем confirmation modal и передаем данные в state
    openConfirmationModal(text: string, action: () => any) {
      this.confirmationModalData = {
        text, 
        action
      };
      this.confirmationModalStatus = true;
    },
    // Открываем confirmation modal и cбрасываем данные
    closeConfirmationModal() {
        this.confirmationModalData = undefined;
        this.confirmationModalStatus = false;
    },
  },
  persist: true, // Флаг для сохранения состояния хранилища между перезагрузками страницы
});
