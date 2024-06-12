// Импорт константы API_BASE_URL из файла constants
import { API_BASE_URL } from '~/constants'
// Импорт путей API из файла openapi.gen
import type { paths } from '~/openapi.gen'

// Типы ответов на запросы к API для получения Имущества по ID
export type GetGoodsResponse =
  paths['/goods']['get']['responses']['200']['content']['application/json'];
export type GetGoodResponse =
  paths['/goods/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания Имущества и обновления Имущества
type CreateGoodsRequest =
  paths['/goods']['post']['requestBody']['content']['application/json'];
type UpdateGoodsRequest =
  paths['/goods/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Имущества и обновлении Имущества
export type CreateGoodsResponse =
paths['/goods']['post']['responses']['201']['content']['application/json'];
export type UpdateGoodsResponse =
paths['/goods/{id}']['put']['responses']['200']['content']['application/json'];


// Типы ответов на запросы к API для получения Goods Types по ID
export type GetGoodsTypeResponse =
  paths['/goods-types']['get']['responses']['200']['content']['application/json'];
export type GetGoodTypeResponse =
  paths['/goods-types/{id}']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания и обновления Goods Types
type CreateGoodsTypesRequest =
paths['/goods-types']['post']['requestBody']['content']['application/json'];
type UpdateGoodsTypesRequest =
paths['/goods-types/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создания и обновления Goods Types
export type CreateGoodsTypeseResponse =
  paths['/goods-types']['post']['responses']['201']['content']['application/json'];
export type UpdateGoodsTypesResponse =
  paths['/goods-types/{id}']['put']['responses']['200']['content']['application/json'];



// Функция для создания новой Имущества
export const createGood = (
    token: string,
    // gto: CreateGoodsRequest
    gto: any
  ) => {
    return $fetch<CreateGoodsResponse>(`${API_BASE_URL}/goods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { good: gto },
    });
  };

// Функция для обновления данных Имущества
export const updateGood = (
    token: string,
    id: string | number,
    gto: UpdateGoodsRequest['good']
  ) => {
    return $fetch<UpdateGoodsResponse>(`${API_BASE_URL}/goods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { good: gto },
    });
  };

// Функция для удаления Имущества
export const removeGood = (
    token: string,
    goodId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/goods/${goodId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
  };


// Функция для создания новой Goods Type
export const createGoodsType = (
  token: string,
  gtso: CreateGoodsTypesRequest
) => {
  return $fetch<CreateGoodsTypeseResponse>(`${API_BASE_URL}/goods-types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { goodtype: gtso },
  });
};

// Функция для обновления данных Goods Type
export const updateGoodsType = (
  token: string,
  id: string | number,
  gtso: UpdateGoodsTypesRequest['goods_type']
) => {
  return $fetch<UpdateGoodsTypesResponse>(`${API_BASE_URL}/goods-types/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { goods_type: gtso },
  });
};

// Функция для удаления Goods Type
export const removeGoodsType = (
  token: string,
  goodsTypeId: string
) => {
  return $fetch(
    `${API_BASE_URL}/goods-types/${goodsTypeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
};