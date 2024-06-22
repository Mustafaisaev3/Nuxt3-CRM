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
// -------------  Properties ENTRANCE ------------ //
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
// -------------  Properties ENTRANCE ------------ //
// ----------------------------------------------- //


// ----------------------------------------------- //
// --------------  Properties FLOOR -------------- //
// ----------------------------------------------- //

// Типы ответов на запросы к API для получения Properties Floor по ID
export type GetPropertiesFloorsResponse =
  paths['/properties-floor']['get']['responses']['200']['content']['application/json'];
export type GetPropertiesFloorResponse =
  paths['/properties-floor/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Properties Floor и обновления Properties Floor
type CreatePropertiesFloorsRequest =
  paths['/properties-floor']['post']['requestBody']['content']['application/json'];
type UpdatePropertiesFloorRequest =
  paths['/properties-floor/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Properties Floor и обновлении Properties Floor
export type CreatePropertiesFloorResponse =
paths['/properties-floor']['post']['responses']['201']['content']['application/json'];
export type UpdatePropertiesFloorResponse =
paths['/properties-floor/{id}']['put']['responses']['200']['content']['application/json'];


// Функция для создания нового Properties Floor
export const createPropertiesFloor = (
    token: string,
    // pfo: CreatePropertiesFloorsRequest
    pfo: any
  ) => {
    return $fetch<CreatePropertiesFloorResponse>(`${API_BASE_URL}/properties-floor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { floor: pfo },
    });
  };

// Функция для обновления данных Properties Floor
export const updatePropertiesFloor = (
    token: string,
    id: string | number,
    pfo: UpdatePropertiesFloorRequest['properties-floor']
  ) => {
    return $fetch<UpdatePropertiesFloorResponse>(`${API_BASE_URL}/properties-floor/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { floor : pfo },
    });
  };

// Функция для удаления Properties Floor
export const removePropertiesFloor = (
    token: string,
    propertiesFloorId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-floor/${propertiesFloorId}`,
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
// --------------  Properties FLOOR -------------- //
// ----------------------------------------------- //


// ----------------------------------------------- //
// --------------  Properties ROOM --------------- //
// ----------------------------------------------- //

// Типы ответов на запросы к API для получения Properties Room по ID
export type GetPropertiesRoomsResponse =
  paths['/properties-room']['get']['responses']['200']['content']['application/json'];
export type GetPropertiesRoomResponse =
  paths['/properties-room/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Properties Room и обновления Properties Room
type CreatePropertiesRoomsRequest =
  paths['/properties-room']['post']['requestBody']['content']['application/json'];
type UpdatePropertiesRoomRequest =
  paths['/properties-room/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Properties Room и обновлении Properties Room
export type CreatePropertiesRoomResponse =
paths['/properties-room']['post']['responses']['201']['content']['application/json'];
export type UpdatePropertiesRoomResponse =
paths['/properties-room/{id}']['put']['responses']['200']['content']['application/json'];


// Функция для создания нового Properties Room
export const createPropertiesRoom = (
    token: string,
    // pro: CreatePropertiesRoomsRequest
    pro: any
  ) => {
    return $fetch<CreatePropertiesRoomResponse>(`${API_BASE_URL}/properties-room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { room: pro },
    });
  };

// Функция для обновления данных Properties Room
export const updatePropertiesRoom = (
    token: string,
    id: string | number,
    pro: UpdatePropertiesRoomRequest['properties-room']
  ) => {
    return $fetch<UpdatePropertiesRoomResponse>(`${API_BASE_URL}/properties-room/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { room : pro },
    });
  };

// Функция для удаления Properties Room
export const removePropertiesRoom = (
    token: string,
    propertiesRoomId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-room/${propertiesRoomId}`,
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
// --------------  Properties ROOM --------------- //
// ----------------------------------------------- //


// ----------------------------------------------- //
// ---------  Properties PURPOSEPREMISES --------- //
// ----------------------------------------------- //

// Типы ответов на запросы к API для получения Properties Purposepremises по ID
export type GetPropertiesPurposespremisesResponse =
  paths['/properties-purposepremises']['get']['responses']['200']['content']['application/json'];
export type GetPropertiesPurposepremisesResponse =
  paths['/properties-purposepremises/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Properties Purposepremises и обновления Properties Purposepremises
type CreatePropertiesPurposespremisesRequest =
  paths['/properties-purposepremises']['post']['requestBody']['content']['application/json'];
type UpdatePropertiesPurposepremisesRequest =
  paths['/properties-purposepremises/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Properties Purposepremises и обновлении Properties Purposepremises
export type CreatePropertiesPurposepremisesResponse =
paths['/properties-purposepremises']['post']['responses']['201']['content']['application/json'];
export type UpdatePropertiesPurposepremisesResponse =
paths['/properties-purposepremises/{id}']['put']['responses']['200']['content']['application/json'];


// Функция для создания нового Properties Purposepremises
export const createPropertiesPurposepremises = (
    token: string,
    ppo: CreatePropertiesPurposespremisesRequest
  ) => {
    return $fetch<CreatePropertiesPurposepremisesResponse>(`${API_BASE_URL}/properties-purposepremises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { purposepremises: ppo },
    });
  };

// Функция для обновления данных Properties Purposepremises
export const updatePropertiesPurposepremises = (
    token: string,
    id: string | number,
    ppo: UpdatePropertiesPurposepremisesRequest['properties-purposepremises']
  ) => {
    return $fetch<UpdatePropertiesPurposepremisesResponse>(`${API_BASE_URL}/properties-purposepremises/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { purposepremises : ppo },
    });
  };

// Функция для удаления Properties Purposepremises
export const removePropertiesPurposepremises = (
    token: string,
    propertiesPurposepremisesId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-purposepremises/${propertiesPurposepremisesId}`,
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
// ---------  Properties PURPOSEPREMISES --------- //
// ----------------------------------------------- //


// ----------------------------------------------- //
// ------------  Properties TERRITORY ------------ //
// ----------------------------------------------- //

// Типы ответов на запросы к API для получения Properties Territory по ID
export type GetPropertiesTerritoriesResponse =
  paths['/properties-territory']['get']['responses']['200']['content']['application/json'];
export type GetPropertiesTerritoryResponse =
  paths['/properties-territory/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Properties Territory и обновления Territory Room
type CreatePropertiesTerritoriesRequest =
  paths['/properties-territory']['post']['requestBody']['content']['application/json'];
type UpdatePropertiesTerritoryRequest =
  paths['/properties-territory/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Properties Territory и обновлении Properties Territory
export type CreatePropertiesTerritoryResponse =
paths['/properties-territory']['post']['responses']['201']['content']['application/json'];
export type UpdatePropertiesTerritoryResponse =
paths['/properties-territory/{id}']['put']['responses']['200']['content']['application/json'];


// Функция для создания нового Properties Territory
export const createPropertiesTerritory = (
    token: string,
    pto: CreatePropertiesTerritoriesRequest
  ) => {
    return $fetch<CreatePropertiesTerritoryResponse>(`${API_BASE_URL}/properties-territory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { territory: pto },
    });
  };

// Функция для обновления данных Properties Territory
export const updatePropertiesTerritory = (
    token: string,
    id: string | number,
    pto: UpdatePropertiesTerritoryRequest['properties-territory']
  ) => {
    return $fetch<UpdatePropertiesPurposepremisesResponse>(`${API_BASE_URL}/properties-territory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { territory : pto },
    });
  };

// Функция для удаления Properties Territory
export const removePropertiesTerritory = (
    token: string,
    propertiesTerritoryId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/properties-territory/${propertiesTerritoryId}`,
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
// ------------  Properties TERRITORY ------------ //
// ----------------------------------------------- //