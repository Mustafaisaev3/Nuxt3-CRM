// Импорт константы API_BASE_URL из файла constants
import { API_BASE_URL } from '~/constants'
// Импорт путей API из файла openapi.gen
import type { paths } from '~/openapi.gen'

// Типы запросов для создания Object и обновления Object
type CreateObjectRequest =
  paths['/properties-object']['post']['requestBody']['content']['application/json'];
type UpdateObjectRequest =
  paths['/properties-object/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Object и обновлении Object
export type CreateObjectResponse =
  paths['/properties-object']['post']['responses']['201']['content']['application/json'];
export type UpdateObjectResponse =
  paths['/properties-object/{id}']['put']['responses']['200']['content']['application/json'];



// Функция для создания новой Object
export const createObject = (
    token: string,
    obj: CreateObjectRequest
  ) => {
    return $fetch<CreateObjectResponse>(`${API_BASE_URL}/properties-object`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { object: obj },
    });
  };

// Функция для обновления данных Object
export const updateObject = (
    token: string,
    id: string | number,
    obj: UpdateObjectRequest
  ) => {
    return $fetch<UpdateObjectResponse>(`${API_BASE_URL}/properties-object/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { object: obj },
    });
  };
  
// Функция для удаления Object
export const removeObject = (
    token: string,
    objId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-object/${objId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
  };