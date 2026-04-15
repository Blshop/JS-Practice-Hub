# Self-Assessment: Roman Shamaluk (GorodeN)

## PR

Ссылка на PR: [PR #112](https://github.com/Blshop/JS-Practice-Hub/pull/112)

## Таблица фич

| Фича                                                                                                                                                                                                                                                                                                                                                                                         | Баллы     | Ссылки на код / PR                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Complex Component:** `PrivateRoute` (условный роутинг + обработка загрузки/ошибок)                                                                                                                                                                                                                                                                                                         | +25       | [PR #72](https://github.com/Blshop/JS-Practice-Hub/pull/72) / [файл](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/components/PrivateRoute/PrivateRoute.tsx) |
| **Rich UI Screen:** Страница `Auth` (layout, переключение форм `LoginForm` и `RegisterForm`)                                                                                                                                                                                                                                                                                                 | +20       | [PR #34](https://github.com/Blshop/JS-Practice-Hub/pull/34) / [файл](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/pages/Auth/Auth.tsx)                      |
| **Сложный бэкенд-сервис:** Полноценный Auth Service (Express + JWT + refresh tokens + MongoDB)                                                                                                                                                                                                                                                                                               | +30       | [PR #94](https://github.com/Blshop/JS-Practice-Hub/pull/94) / [server/src/](https://github.com/Blshop/JS-Practice-Hub/tree/main/server/src)                            |
| **Custom Auth** (без BaaS, JWT + bcrypt + middleware)                                                                                                                                                                                                                                                                                                                                        | +20       | [PR #94](https://github.com/Blshop/JS-Practice-Hub/pull/94)                                                                                                            |
| **Custom Backend:** MongoDB (Mongoose), REST API, JWT, httpOnly cookie, модели, контроллер, Middleware, сервисы и Swagger                                                                                                                                                                                                                                                                    | +30       | [PR #94](https://github.com/Blshop/JS-Practice-Hub/pull/94)                                                                                                            |
| **Backend Framework:** Express                                                                                                                                                                                                                                                                                                                                                               | +10       | [server/package.json](https://github.com/Blshop/JS-Practice-Hub/blob/main/server/package.json)                                                                         |
| **API Documentation:** Swagger                                                                                                                                                                                                                                                                                                                                                               | +5        | [server/src/config/swagger.js](https://github.com/Blshop/JS-Practice-Hub/blob/main/server/src/config/swagger.js)                                                       |
| **Unit Tests (Basic & Full):** 11 тестов валидации + 10 тестов AuthStore (покрытие >50%)                                                                                                                                                                                                                                                                                                     | +10 & +10 | [PR #58](https://github.com/Blshop/JS-Practice-Hub/pull/58), [PR #109](https://github.com/Blshop/JS-Practice-Hub/pull/109)                                             |
| **State Manager:** MobX (AuthStore)                                                                                                                                                                                                                                                                                                                                                          | +10       | [PR #46](https://github.com/Blshop/JS-Practice-Hub/pull/46) / [src/store/AuthStore.ts](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/store/AuthStore.ts)     |
| **API Layer:** изоляция `api.ts` + `authService.ts`                                                                                                                                                                                                                                                                                                                                          | +10       | [src/services/](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/services)                                                                                      |
| **Design Patterns:** Store (MobX - централизованное состояние), Service (`authService` - изоляция бизнес-логики от UI), Repository (Mongoose модели - абстракция доступа к данным), Factory (generateAccessToken, generateRefreshToken - создание токенов), Observer (MobX + observer - реактивное обновление UI), Middleware (Express middleware authenticate - цепочка обработки запросов) | +10       | [PR #94](https://github.com/Blshop/JS-Practice-Hub/pull/94), [PR #46](https://github.com/Blshop/JS-Practice-Hub/pull/46)                                               |
| **Auto-deploy:** совместная настройка деплоя на gh-pages, настройка деплоя клиента и сервера на Render.com                                                                                                                                                                                                                                                                                   | +5        | [README](https://github.com/Blshop/JS-Practice-Hub#readme), [package.json](https://github.com/Blshop/JS-Practice-Hub/blob/main/package.json)                           |
| **React**                                                                                                                                                                                                                                                                                                                                                                                    | +5        | [package.json](https://github.com/Blshop/JS-Practice-Hub/blob/main/package.json)                                                                                       |
| **UI & Interaction:** Responsive                                                                                                                                                                                                                                                                                                                                                           | +5        | -                                                                                                                                                                      |
| **UI & Interaction:** Theme Switcher. Переключение тем Light/Dark через MobX store                                                                                                                                                                                                                                                                                                           | +10       | [ThemeStore](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/store/ThemeStore.ts)                                                                              |
| **UI & Interaction** i18n. Локализация (русский/английский)                                                                                                                                                                                                                                                                                                                                  | +10       | [i18n](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/i18n), [Locales](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/i18n/locales)                  |
| **Итого (заявлено)**                                                                                                                                                                                                                                                                                                                                                                         | **225**   | -                                                                                                                                                                      |

> _Максимум 250 баллов._

## Описание моей работы

### Роль в проекте

Разработка полной системы аутентификации (клиент + сервер), настройка инфраструктуры (роутинг, стейт-менеджмент, тесты, деплой), организация процессов (доска, GitHub, структура, архитектура, code review).

### Организационный вклад

- Участвовал в обсуждении тематики проекта, предложил направление **Core JS Interview** и стек.
- Делился опытом использования React-библиотек (Framer Motion, react-hook-form, react-toastify и др.).
- Создал и настроил **Trello‑доску** (колонки, метки, автоматизация).
- Организовал структуру проекта (папки, алиасы, примеры).
- Настроил роутинг (React Router, BrowserRouter с basename для GitHub Pages).
- Помогал с деплоем, рефакторил чужой код, дополнял README.
- Вел Issues и тикеты, занимался code review.

### Техническая реализация

#### Клиентская часть аутентификации

- Формы `LoginForm` и `RegisterForm` с валидацией через `react-hook-form` + `zod`.
- Страница `Auth` (layout с баннером и переключением маршрутов).
- MobX‑стор `AuthStore` (хранит пользователя, токен, состояния загрузки/ошибки, восстанавливает сессию).
- Компонент `PrivateRoute` для разграничения доступа (с учетом `isLoading` и `sessionError`).
- Кастомная страница `NotFound`.
- Уведомления `react-toastify`.

#### Серверная часть (с нуля)

- Express + MongoDB (Mongoose) - собственная база данных.
- Модели `User` и `RefreshToken`.
- JWT access/refresh токены, httpOnly cookie для refresh.
- Контроллеры: регистрация, логин, обновление токена, логаут, профиль.
- Middleware аутентификации (`authenticate`).
- Swagger документация (доступна по `/api-docs` / `https://js-practice-hub.onrender.com/api-docs/`).

#### Тестирование

- Настроил Jest для клиента (алиасы, CSS‑модули, поддержка TypeScript).
- Написал 11 unit‑тестов для схем валидации (loginSchema, registerSchema).
- Написал 10 unit‑тестов для `AuthStore` (моки сервисов, проверка состояний).
- Настроил интеграционные тесты для сервера:
  - Использовал `mongodb‑memory-server` (изолированная БД в памяти).
  - `supertest` для эмуляции HTTP‑запросов.
  - Покрыл все эндпоинты (`/register`, `/login`, `/refresh`, `/logout`, `/profile`).

#### Инфраструктура и деплой

- Захостил клиент и сервер на Render.com (автодеплой из GitHub).
- Настроил переменные окружения и `getCookieOptions()` для работы cookie в development/production.
- Обеспечил возможность локального запуска одной командой (`npm run dev:all`).

### Сложности и их решение

1. **Потеря авторизации после перезагрузки страницы**
   - _Проблема:_ access‑токен хранился только в памяти, при перезагрузке сессия сбрасывалась.
   - _Решение:_ реализовал в `AuthStore` метод `restoreSession()`, который вызывает `/refresh` и обновляет access‑токен. Добавил интерцептор в `axios` для автоматического повторного запроса при 401.

2. **Переход от моков к реальному auth flow**
   - _Проблема:_ моки работали синхронно и не покрывали сценарии с истечением токенов, сетевыми ошибками.
   - _Решение:_ переписал `AuthStore` на реальные вызовы `authService`, добавил обработку ошибок, состояние `sessionError` и кнопку повтора.

3. **Cookie в разных окружениях**
   - _Проблема:_ на `localhost` нельзя использовать `secure: true, sameSite: none`, а на production нужно.
   - _Решение:_ вынес настройки в `getCookieOptions()` в зависимости от `NODE_ENV`.

4. **Настройка Jest для сервера**
   - _Проблема:_ сервер написан на ES‑модулях, а Jest по умолчанию работает с CommonJS.
   - _Решение:_ настроил `babel-jest` с пресетом `@babel/preset-env` (modules: 'commonjs'), отдельный `jest.config.cjs` для сервера.

5. **Тестирование кода с `import.meta.glob` (Vite)**
   - _Проблема:_ Jest не поддерживает `import.meta.glob`.
   - _Решение:_ создал ручной мок для хука `useQuestions` в `src/hooks/__mocks__/`.

### Инструменты и технологии

**Frontend:** React 19, TypeScript, MobX, React Hook Form, Zod, Axios, React Router, Vite, SCSS‑modules, Jest, React Testing Library.  
**Backend:** Express, MongoDB, Mongoose, JWT, bcrypt, cookie-parser, Swagger, supertest, mongodb‑memory-server.  
**DevOps:** Render.com, GitHub Actions, Trello, Git (Conventional Commits, PR review).

## Два личных Feature Component

### 1. **Auth UI + валидация + PrivateRoute**

- **Что включает:**
  - `LoginForm`, `RegisterForm` (React Hook Form + Zod)
  - Страница `Auth` (layout с баннером, маршрутизация `/auth/login` и `/auth/register`)
  - `PrivateRoute` (разграничение доступа с обработкой загрузки/ошибок)
  - `NotFound` (404 страница)
- **Почему это сильная часть:**  
  Прошел путь от простых локальных форм до устойчивого пользовательского сценария с валидацией, сообщениями об ошибках, корректной навигацией и защитой маршрутов.
- **Ссылки:**  
  [LoginForm](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/pages/Auth/components/LoginForm/LoginForm.tsx),
  [RegisterForm](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/pages/Auth/components/RegisterForm/RegisterForm.tsx),  
  [Auth](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/pages/Auth/Auth.tsx),
  [PrivateRoute](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/components/PrivateRoute/PrivateRoute.tsx)

### 2. **AuthStore + backend auth flow**

- **Что включает:**
  - MobX‑стор `AuthStore` (состояние, методы login/register/logout, восстановление сессии)
  - API‑слой (`api.ts` с интерцепторами, `authService.ts`)
  - Полноценный бэкенд на Express с JWT, refresh‑токенами, MongoDB
- **Почему это сильная часть:**  
  Здесь есть архитектура (Store, Service, Repository), работа с асинхронным состоянием, жизненный цикл токенов и безопасное хранение (httpOnly cookie).
- **Ссылки:**  
  [AuthStore](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/store/AuthStore.ts),  
  [Backend controllers](https://github.com/Blshop/JS-Practice-Hub/blob/main/server/src/controllers/authController.js)

> **Примечание:** Оба компонента тесно связаны и вместе образуют законченный auth‑сценарий.
