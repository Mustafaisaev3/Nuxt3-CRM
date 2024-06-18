// Импортируем типы компонентов из сгенерированного файла openapi.gen
import { components } from '~/openapi.gen'

// Определяем пользовательские типы на основе схем OpenAPI

// Тип пользователя (User) на основе схемы User из OpenAPI
export type User = components['schemas']['User'];
// Тип статьи (Article) на основе схемы Article из OpenAPI
export type Article = components['schemas']['Article'];
// Тип комментария к статье (ArticleComment) на основе схемы Comment из OpenAPI
export type ArticleComment = components['schemas']['Comment'];

// -----  Todos ----- //

// Тип данных для Todos
export type Todo = components['schemas']['Todo'];
// Тип данных для комментария к Todos
export type TodoComment = components['schemas']['Comment'];

// -----  Todos ----- //


// -----  Tenants ----- //

// Тип данных для Tenants
export type Tenant = components['schemas']['Tenant'];
// Тип данных для контакта к арендатоу
export type TenantContact = components['schemas']['Contact'];

// -----  Tenants ----- //


// -----  Teams ----- //

// Тип данных для Teams
export type Team = components['schemas']['Team'];
export type TeamWorkZone = components['schemas']['WorkTeamZone'];

// -----  Teams ----- //


// -----  Object Property ----- //

// Тип данных для Object Property
export type Object = components['schemas']['ObjectProperty'];

// -----  Object Property ----- //


// -----  Goods ----- //

// Тип данных для Goods
export type Good = components['schemas']['Good'];
export type GoodsType = components['schemas']['GoodsType'];

// -----  Goods ----- //


// -----  Consumable ----- //

// Тип данных для Consumable
export type Consumable = components['schemas']['Consumable'];
export type ConsumableType = components['schemas']['ConsumableType'];

// -----  Consumable ----- //


// -----  Properties Building ----- //

// Тип данных для Properties Building
export type PropertiesBuilding = components['schemas']['BuildingProperty'];

// -----  Properties Building ----- //


// -----  Properties Cluster ----- //

// Тип данных для Properties Cluster
export type PropertiesCluster = components['schemas']['ClusterProperty'];

// -----  Properties Cluster ----- //


// -----  Properties Entrance ----- //

// Тип данных для Properties Entrance
export type PropertiesEntrance = components['schemas']['EntranceProperty'];

// -----  Properties Entrance ----- //

// Тип состояния Формы (создвть | изменить)
export enum FormMode {
    CREATE,
    UPDATE
}