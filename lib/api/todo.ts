// Импорт константы API_BASE_URL из файла constants
import { API_BASE_URL } from '~/constants';
// Импорт путей API из файла openapi.gen
import type { paths } from '~/openapi.gen';


// Типы ответов на запросы к API для получения статей и комментариев
export type GetTodosResponse =
  paths['/todos']['get']['responses']['200']['content']['application/json'];
export type GetTodoResponse =
  paths['/todos/{id}']['get']['responses']['200']['content']['application/json'];
export type GetTodoCommentsResponse =
  paths['/todos/{id}/comments']['get']['responses']['200']['content']['application/json'];

// Типы запросов для создания статьи и комментария к статье
type CreateTodosRequest =
  paths['/todos']['post']['requestBody']['content']['application/json'];
export type CreateTodosResponse =
  paths['/todos']['post']['responses']['201']['content']['application/json'];
export type CreateTodoCommentRequest =
  paths['/todos/{id}/comments']['post']['requestBody']['content']['application/json'];
export type CreateTodoCommentResponse =
  paths['/todos/{id}/comments']['post']['responses']['200']['content']['application/json'];

type UpdateTodoRequest =
  paths['/todos/{id}']['put']['requestBody']['content']['application/json'];

// Функция для создания новой статьи
export const createTodo = (
  token: string,
  dto: CreateTodosRequest['todo']
) => {
  return $fetch<CreateTodosResponse>(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { todo: dto },
  });
};

// Функция для обновления todo
export const updateTodo = (
  token: string,
  id: string | number,
  dto: UpdateTodoRequest['todo']
) => {
  return $fetch<UpdateTodoRequest>(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: JSON.stringify({ todo: dto }),
    
  });
};

// Функция для удаления todo
export const removeTodo = (
  token: string,
  todoId: string
) => {
  return $fetch(
    `${API_BASE_URL}/todos/${todoId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
};

// Функция для создания комментария к статье
export const createTodoComment = (
  token: string,
  todoId: number,
  comment: string
) => {
  return $fetch<CreateTodoCommentResponse>(
    `${API_BASE_URL}/todos/${todoId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { comment: { body: comment } },
    }
  );
};

// Функции для добавления статьи в избранного
export type AddTodoToFavoritesRequest =
  paths['/todos/{id}/favorite']['post']['responses']['200']['content']['application/json'];
export const addTodoToFavorites = (token: string, todoId: string) => {
  return $fetch<AddTodoToFavoritesRequest>(
    `${API_BASE_URL}/todos/${todoId}/favorite`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
};

// Функции для удаления статьи из избранного
export type RemoveTodoFromFavoritesRequest =
  paths['/todos/{id}/favorite']['delete']['responses']['200']['content']['application/json'];
export const removeTodoFromFavorites = (
  token: string,
  todoId: string
) => {
  return $fetch<RemoveTodoFromFavoritesRequest>(
    `${API_BASE_URL}/todos/${todoId}/favorite`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
};
