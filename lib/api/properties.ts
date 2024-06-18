// Импорт константы API_BASE_URL из файла constants
import { API_BASE_URL } from '~/constants'
// Импорт путей API из файла openapi.gen
import type { paths } from '~/openapi.gen'

// ----------------------------------------------- //
// ------------ Properties BUILDINGS ------------- //
// ----------------------------------------------- //

// Типы ответов на запросы к API для получения Properties Buildings по ID
export type GetPropertiesBuildingsResponse =
  paths['/properties-building']['get']['responses']['200']['content']['application/json'];
export type GetPropertiesBuildingResponse =
  paths['/properties-building/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Properties Building и обновления Properties Building
type CreatePropertiesBuildingRequest =
  paths['/properties-building']['post']['requestBody']['content']['application/json'];
type UpdatePropertiesBuildingRequest =
  paths['/properties-building/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Properties Building и обновлении Properties Building
export type CreatePropertiesBuildingResponse =
paths['/properties-building']['post']['responses']['201']['content']['application/json'];
export type UpdatePropertiesBuildingResponse =
paths['/properties-building/{id}']['put']['responses']['200']['content']['application/json'];


// Функция для создания нового Properties Building
export const createPropertiesBuilding = (
    token: string,
    pgo: CreatePropertiesBuildingRequest
  ) => {
    return $fetch<GetPropertiesBuildingsResponse>(`${API_BASE_URL}/properties-building`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { building: pgo },
    });
  };

// Функция для обновления данных Properties Building
export const updatePropertiesBuilding = (
    token: string,
    id: string | number,
    pgo: UpdatePropertiesBuildingRequest['properties-building']
  ) => {
    return $fetch<UpdatePropertiesBuildingResponse>(`${API_BASE_URL}/properties-building/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { building : pgo },
    });
  };

// Функция для удаления Properties Building
export const removePropertiesBuilding = (
    token: string,
    propertiesBuildingId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-building/${propertiesBuildingId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
  };


// ----------------------------------------------- //
// ------------ Properties BUILDINGS ------------- //
// ----------------------------------------------- //


// ----------------------------------------------- //
// -------------  Properties CLUSTER ------------- //
// ----------------------------------------------- //

// Типы ответов на запросы к API для получения Properties Cluster по ID
export type GetPropertiesClustersResponse =
  paths['/properties-cluster']['get']['responses']['200']['content']['application/json'];
export type GetPropertiesClusterResponse =
  paths['/properties-cluster/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Properties Cluster и обновления Properties Cluster
type CreatePropertiesClusterRequest =
  paths['/properties-cluster']['post']['requestBody']['content']['application/json'];
type UpdatePropertiesClusterRequest =
  paths['/properties-cluster/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Properties Cluster и обновлении Properties Cluster
export type CreatePropertiesClusterResponse =
paths['/properties-cluster']['post']['responses']['201']['content']['application/json'];
export type UpdatePropertiesClusterResponse =
paths['/properties-cluster/{id}']['put']['responses']['200']['content']['application/json'];


// Функция для создания нового Properties Cluster
export const createPropertiesCluster = (
    token: string,
    pco: CreatePropertiesClusterRequest
  ) => {
    return $fetch<CreatePropertiesClusterResponse>(`${API_BASE_URL}/properties-cluster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { cluster: pco },
    });
  };

// Функция для обновления данных Properties Cluster
export const updatePropertiesCluster = (
    token: string,
    id: string | number,
    pco: UpdatePropertiesClusterRequest['properties-cluster']
  ) => {
    return $fetch<UpdatePropertiesClusterResponse>(`${API_BASE_URL}/properties-cluster/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { cluster : pco },
    });
  };

// Функция для удаления Properties Cluster
export const removePropertiesCluster = (
    token: string,
    propertiesClusterId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-cluster/${propertiesClusterId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
  };

// ----------------------------------------------- //
// -------------  Properties CLUSTER ------------- //
// ----------------------------------------------- //


// ----------------------------------------------- //
// -------------  Properties ENTRANCE ------------- //
// ----------------------------------------------- //

// Типы ответов на запросы к API для получения Properties Entrance по ID
export type GetPropertiesEntrancesResponse =
  paths['/properties-entrance']['get']['responses']['200']['content']['application/json'];
export type GetPropertiesEntranceResponse =
  paths['/properties-entrance/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Properties Entrance и обновления Properties Entrance
type CreatePropertiesEntranceRequest =
  paths['/properties-entrance']['post']['requestBody']['content']['application/json'];
type UpdatePropertiesEntranceRequest =
  paths['/properties-entrance/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Properties Entrance и обновлении Properties Entrance
export type CreatePropertiesEntranceResponse =
paths['/properties-entrance']['post']['responses']['201']['content']['application/json'];
export type UpdatePropertiesEntranceResponse =
paths['/properties-entrance/{id}']['put']['responses']['200']['content']['application/json'];


// Функция для создания нового Properties Entrance
export const createPropertiesEntrance = (
    token: string,
    // peo: CreatePropertiesEntranceRequest
    peo: any
  ) => {
    return $fetch<CreatePropertiesEntranceResponse>(`${API_BASE_URL}/properties-entrance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { entrance: peo },
    });
  };

// Функция для обновления данных Properties Entrance
export const updatePropertiesEntrance = (
    token: string,
    id: string | number,
    peo: UpdatePropertiesEntranceRequest['properties-entrance']
  ) => {
    return $fetch<UpdatePropertiesEntranceResponse>(`${API_BASE_URL}/properties-entrance/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { entrance : peo },
    });
  };

// Функция для удаления Properties Entrance
export const removePropertiesEntrance = (
    token: string,
    propertiesEntranceId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-entrance/${propertiesEntranceId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
  };

// ----------------------------------------------- //
// -------------  Properties ENTRANCE ------------- //
// ----------------------------------------------- //