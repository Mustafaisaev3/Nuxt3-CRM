// Импорт константы API_BASE_URL из файла constants
import { API_BASE_URL } from '~/constants'
// Импорт путей API из файла openapi.gen
import type { paths } from '~/openapi.gen'

// Типы запросов для создания Команды и обновления Команды
type CreateTeamRequest =
  paths['/teams']['post']['requestBody']['content']['application/json'];
type UpdateTeamRequest =
  paths['/teams/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создании Команды и обновлении Команды
export type CreateTeamResponse =
  paths['/teams']['post']['responses']['201']['content']['application/json'];
export type UpdateTeamResponse =
  paths['/teams/{id}']['put']['responses']['200']['content']['application/json'];


// Типы запросов для создания Work Team Zone и обновления Work Team Zone
type CreateWorkTeamZoneRequest =
paths['/work-team-zones']['post']['requestBody']['content']['application/json'];
type UpdateWorkTeamZoneRequest =
paths['/work-team-zones/{id}']['put']['requestBody']['content']['application/json'];

// Тип ответа при создания Work Team Zone и обновления Work Team Zone
export type CreateWorkTeamZoneResponse =
  paths['/work-team-zones']['post']['responses']['201']['content']['application/json'];
export type UpdateWorkTeamZoneResponse =
  paths['/work-team-zones/{id}']['put']['responses']['200']['content']['application/json'];




// Функция для создания новой Команды
export const createTeam = (
    token: string,
    tto: CreateTeamRequest
  ) => {
    return $fetch<CreateTeamResponse>(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { team: tto },
    });
  };

// Функция для обновления данных Команды
export const updateTeam = (
    token: string,
    id: string | number,
    tto: UpdateTeamRequest['team']
  ) => {
    return $fetch<UpdateTeamResponse>(`${API_BASE_URL}/teams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
      body: { team: tto },
    });
  };
  
// Функция для удаления Команды
export const removeTeam = (
    token: string,
    teamId: string
  ) => {
    return $fetch(
      `${API_BASE_URL}/teams/${teamId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
  };


// Функция для создания новой Work Team Zone
export const createWorkTeamZone = (
  token: string,
  wtzo: CreateWorkTeamZoneRequest
) => {
  return $fetch<CreateWorkTeamZoneResponse>(`${API_BASE_URL}/work-team-zones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { workteamzone: wtzo },
  });
};

// Функция для обновления данных Work Team Zone
export const updateWorkTeamZone = (
  token: string,
  id: string | number,
  wtzo: UpdateWorkTeamZoneRequest['workteamzone']
) => {
  return $fetch<UpdateWorkTeamZoneResponse>(`${API_BASE_URL}/work-team-zones/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
    body: { workteamzone: wtzo },
  });
};

// Функция для удаления Work Team Zone
export const removeWorkTeamZone = (
  token: string,
  workteamzoneId: string
) => {
  return $fetch(
    `${API_BASE_URL}/work-team-zones/${workteamzoneId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
};