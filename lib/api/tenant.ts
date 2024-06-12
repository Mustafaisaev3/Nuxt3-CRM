// Импорт константы API_BASE_URL из файла constants
import { API_BASE_URL } from '~/constants'
// Импорт путей API из файла openapi.gen
import type { paths } from '~/openapi.gen'


// Типы ответов на запросы к API для получения арендаторов и арендатора по ID
export type GetTenantsResponse =
  paths['/tenants']['get']['responses']['200']['content']['application/json'];
export type GetTenantResponse =
  paths['/tenants/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания арендатора и обновления арендатора
type CreateTenantRequest =
  paths['/tenants']['post']['requestBody']['content']['application/json'];
type UpdateTenantRequest =
  paths['/tenants/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании арендатора
export type CreateTenantResponse =
  paths['/tenants']['post']['responses']['201']['content']['application/json'];

// Тип ответа при обновлении арендатора
export type UpdateTenantResponse =
  paths['/tenants/{id}']['put']['responses']['200']['content']['application/json'];

// Функция для создания нового арендатора
export const createTenant = (
  token: string,
  dto: CreateTenantRequest['tenant']
) => {
  console.log('Sending POST request to create a tenant:', dto);
  return $fetch<CreateTenantResponse>(`${API_BASE_URL}/tenants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { tenant: dto },
  });
};

// Функция для обновления данных арендатора
export const updateTenant = (
  token: string,
  id: string | number,
  dto: UpdateTenantRequest['tenant']
) => {
  console.log('Sending PUT request to update a tenant:', dto);
  return $fetch<UpdateTenantResponse>(`${API_BASE_URL}/tenants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { tenant: dto },
  });
};

// Функция для удаления арендатора
export const removeTenant = (
  token: string,
  tenantId: string
) => {
  return $fetch(
    `${API_BASE_URL}/tenants/${tenantId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
};

// Функция для добавления контакта к tenant
export const createTenantContact = (
  token: string,
  tenantId: number,
  cto: any
) => {
  return $fetch(
    `${API_BASE_URL}/tenants/${tenantId}/contacts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { contact: cto },
    }
  );
};

/*

// Типы ответов на запросы к API для получения статей и комментариев
export type GetTenantsResponse =
  paths['/tenants']['get']['responses']['200']['content']['application/json'];
export type GetTenantResponse =
  paths['/tenants/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания статьи и комментария к статье
type CreateTenantsRequest =
  paths['/tenants']['post']['requestBody']['content']['application/json'];
export type CreateTenantsResponse =
  paths['/tenants']['post']['responses']['201']['content']['application/json'];

// Функция для создания новой статьи
export const createTenant = (
  token: string,
  dto: CreateTenantsRequest['tenant']
) => {
  console.log('Sending POST request to create a tenant:', dto); // Добавленный console.log
  return $fetch<CreateTenantsResponse>(`${API_BASE_URL}/tenants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { tenant: dto },
  });
};

*/