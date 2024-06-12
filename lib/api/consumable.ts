// Импорт константы API_BASE_URL из файла constants
import { API_BASE_URL } from '~/constants'
// Импорт путей API из файла openapi.gen
import type { paths } from '~/openapi.gen'

// Типы ответов на запросы к API для получения Consumable по ID
export type GetConsumablesResponse =
  paths['/consumable']['get']['responses']['200']['content']['application/json'];
export type GetConsumableResponse =
  paths['/consumable/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Consumable и обновления Consumable
type CreateConsumablesRequest =
  paths['/consumable']['post']['requestBody']['content']['application/json'];
type UpdateConsumablesRequest =
  paths['/consumable/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Consumable и обновлении Consumable
export type CreateConsumablesResponse =
paths['/consumable']['post']['responses']['201']['content']['application/json'];
export type UpdateConsumablesResponse =
paths['/consumable/{id}']['put']['responses']['200']['content']['application/json'];


// Типы ответов на запросы к API для получения Consumable Types по ID
export type GetConsumableTypesResponse =
  paths['/consumable-types']['get']['responses']['200']['content']['application/json'];
export type GetConsumableTypeResponse =
  paths['/consumable-types/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания и обновления Consumable Types
type CreateConsumableTypesRequest =
paths['/consumable-types']['post']['requestBody']['content']['application/json'];
type UpdateConsumableTypesRequest =
paths['/consumable-types/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создания и обновления Consumable Types
export type CreateConsumableTypesResponse =
  paths['/consumable-types']['post']['responses']['201']['content']['application/json'];
export type UpdateConsumableTypesResponse =
  paths['/consumable-types/{id}']['put']['responses']['200']['content']['application/json'];



// Функция для создания новой Consumable
export const createConsumable = (
    token: string,
    cso: CreateConsumablesRequest
  ) => {
    return $fetch<GetConsumablesResponse>(`${API_BASE_URL}/consumable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { consumable: cso },
    });
  };

// Функция для обновления данных Consumable
export const updateConsumable = (
    token: string,
    id: string | number,
    cso: UpdateConsumablesRequest['consumable']
  ) => {
    return $fetch<UpdateConsumablesResponse>(`${API_BASE_URL}/consumable/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { consumable: cso },
    });
  };

// Функция для удаления Consumable
export const removeConsumable = (
    token: string,
    consumableId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/consumable/${consumableId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
  };


// Функция для создания новой Consumable Type
export const createСonsumableType = (
  token: string,
  csto: CreateConsumableTypesRequest
) => {
  return $fetch<CreateConsumableTypesResponse>(`${API_BASE_URL}/consumable-types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { consumabletype: csto },
  });
};

// Функция для обновления данных Consumable Type
export const updateСonsumableType = (
  token: string,
  id: string | number,
  csto: UpdateConsumableTypesRequest['consumables_type']
) => {
  return $fetch<UpdateConsumableTypesResponse>(`${API_BASE_URL}/consumable-types/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { consumabletype: csto },
  });
};

// Функция для удаления Consumable Type
export const removeСonsumableType = (
  token: string,
  consumablesTypeId: string
) => {
  return $fetch(
    `${API_BASE_URL}/consumable-types/${consumablesTypeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
};