# JS-Practice-Hub

**JS-Practice-Hub** - веб-приложение для изучения JavaScript и подготовки к техническим интервью, построенное на React, TypeScript и MobX. Платформа предоставляет интерактивные квизы с различными типами вопросов, систему отслеживания прогресса и детальную аналитику результатов.

## Основные возможности

- **Интерактивные квизы** - вопросы с единичным и множественным выбором, задания на определение вывода кода, охватывающие ключевые концепции JavaScript
- **Система уровней сложности** - структурированное обучение от базовых концепций до продвинутых тем (замыкания, прототипы, асинхронность, event loop)
- **Аналитика и статистика** - детальное отслеживание прогресса с визуализацией данных через графики и таблицы, расчёт процента успешности по модулям и урокам
- **Аутентификация и персонализация** - JWT-авторизация с refresh-токенами, сохранение прогресса пользователя на сервере
- **Адаптивный UI** - современный интерфейс с поддержкой темной темы, анимациями и звуковыми эффектами

## 📹 Видео презентация приложения

**Ссылка на видео:** https://youtu.be/p-2Oy2sQlVc

## 📌 Чем гордимся

- **Красивый и современный дизайн, с анимациями и адаптивностью**
- **Законченное приложение поможет получить новые и закрепить уже имеющиеся знания по многим темам JavaScript, облегчит подготовку к техническим интервью и собеседованиям**
- **Надежная аутентификация** - собственная реализация бэка, JWT с refresh‑токенами и httpOnly cookie.
- **Реактивный UI на MobX** - состояние сессии автоматически синхронизируется с компонентами, а PrivateRoute корректно обрабатывает загрузку и сетевые ошибки.
- **Тестовая дисциплина** - unit‑тесты и интеграционные тесты.

## 🗂 Доска (Trello)

- Ссылка: (https://trello.com/b/BFPlnOWW/tandem)
- Скриншот текущего состояния:  
  ![Trello board](https://github.com/user-attachments/assets/d2fff516-efbc-404d-b9ba-c2240d57e17f)

## 📝 Meeting Notes

- [2026-02-16](https://github.com/Blshop/JS-Practice-Hub/blob/main/meeting-notes/2026-02-16.md)
- [2026-02-22](https://github.com/Blshop/JS-Practice-Hub/blob/main/meeting-notes/2026-02-22.md)
- [2026-03-01](https://github.com/Blshop/JS-Practice-Hub/blob/main/meeting-notes/2026-03-01.md)
- [2026-03-22](https://github.com/Blshop/JS-Practice-Hub/blob/main/meeting-notes/2026-03-22.md)
- [2026-03-31](https://github.com/Blshop/JS-Practice-Hub/blob/main/meeting-notes/2026-03-31.md)

## 🔍 Лучшие PR

1. **[#4 - feat: basic UI components (Button, Text, Input, Checkbox, Radio, Select)](https://github.com/Blshop/JS-Practice-Hub/pull/4)** - Набор базовых UI-компонентов для проекта, включая компоненты Button, Text, Input, Checkbox, Radio и Select с полной поддержкой стилизации и вариантов отображения.
2. **[#46 - Авторизация/Регистрация. Storage](https://github.com/Blshop/JS-Practice-Hub/pull/46)** - Добавлена библиотека MobX для централизованного управления состоянием приложения.
3. **[#87 - Страница с тестами](https://github.com/Blshop/JS-Practice-Hub/pull/87)** - Добавлен полноценный модуль Quiz с поддержкой динамической загрузки вопросов, отображением различных типов заданий, проверкой ответов, прогресс‑баром, объяснениями и удобным пользовательским интерфейсом.
4. **[#107 - Сохранение прогресса тестов](https://github.com/Blshop/JS-Practice-Hub/pull/107)** - Отправка данных о прохождении квиза на сервер, сохранение результатов.

## 🚀 Ссылка на deploy

- https://js-practice-hub-frontend.onrender.com/
- https://blshop.github.io/JS-Practice-Hub/ (запасная, только клиент)

## 👨‍💻 Состав команды

- **Nikita Erechtchenko** - https://github.com/Blshop
- **Roman Shamaluk**- https://github.com/GorodeN
- **Dmitry Astapenko** - https://github.com/DmitryAstapenko

## 🎓 Ментор

- **Alina Husarava** - https://github.com/spadarynjaALINA

## 📔 Дневники разработчиков

- [Dmitry Astapenko (DmitryAstapenko)](https://github.com/Blshop/JS-Practice-Hub/tree/8ffff94d87a5e0b092c7e92dadc5ef787f315f01/development-notes/dmitryastapenko)
- [Roman Shamaluk (GorodeN)](https://github.com/Blshop/JS-Practice-Hub/tree/8ffff94d87a5e0b092c7e92dadc5ef787f315f01/development-notes/GorodeN)
- [Nikita Erechtchenko (Blshop)](https://github.com/Blshop/JS-Practice-Hub/tree/8ffff94d87a5e0b092c7e92dadc5ef787f315f01/development-notes/Blshop)

## 🏫 Организация

- **The Rolling Scopes (@rollingscopes)** - https://github.com/rollingscopes

## 🚀 Локальный запуск

### Требования

- Node.js (версия 18+)
- npm (версия 9+)
- MongoDB (локальная или облачная)

> ⚠️ MongoDB блокирует доступ к своим облачным сервисам (MongoDB Atlas) для пользователей из Беларуси и России

### Установка и запуск

1. Клонировать репозиторий:

   ```bash
   git clone https://github.com/Blshop/JS-Practice-Hub.git
   cd JS-Practice-Hub
   ```

2. Установить зависимости клиента:

   ```bash
   npm install
   ```

3. Перейти в папку сервера и установить его зависимости:

   ```bash
   cd server
   npm install
   cd ..
   ```

4. Создать файл окружения для сервера:

- Скопировать `server/.env.example` в `server/.env`
- Заполнить реальными данными (см. раздел "Переменные окружения" ниже)

5. Запустить сервер (в отдельном терминале, из корня):

   ```bash
   cd server
   npm run dev
   ```

   или

   ```bash
   npm run dev:server
   ```

6. Запустить клиент (в другом терминале, из корня):

   ```bash
   npm run dev
   ```

7. Открыть браузер по адресу `http://localhost:5173`

> 💡 Для одновременного запуска можно использовать `npm run dev:all` (предварительно установите concurrently `npm install -D concurrently`).

### Переменные окружения

#### Cервера (файл `server/.env`)

| Переменная           | Описание                                                 | Пример                                   |
| -------------------- | -------------------------------------------------------- | ---------------------------------------- |
| `PORT`               | Порт сервера                                             | `5000` (по умолч.)                       |
| `MONGO_URI`          | Строка подключения MongoDB                               | `mongodb+srv://...`                      |
| `JWT_ACCESS_SECRET`  | Секрет для access токенов                                | `...`                                    |
| `JWT_REFRESH_SECRET` | Секрет для refresh токенов                               | `...`                                    |
| `CLIENT_URL`         | URL клиента (для CORS)                                   | `http://localhost:5173`                  |
| `NODE_ENV`           | Устанавливает параметры cookie в зависимости от значения | `development` (по умолч.) / `production` |

> 💡 `JWT_ACCESS_SECRET` и `JWT_REFRESH_SECRET` можно сгенерировать с помощью `openssl rand -base64 32` в терминале (создаст строку вида `4HcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H@McQ`).

#### Клиента (файл `.env` в корне)

| Переменная     | Описание    | Пример                                  |
| -------------- | ----------- | --------------------------------------- |
| `VITE_API_URL` | URL для API | `http://localhost:5000/api` (по умолч.) |

### Swagger (Документация API)

**Деплой:** https://js-practice-hub.onrender.com/api-docs/

**Локально:**

- Запустить сервер
- Перейти на `{SERVER_URL}/api-docs/` (по умолч. `http://localhost:5000/api-docs/`)

## 📹 Видео-доказательство функциональности (Страница 404, Loading state, Обработка ошибок API)

Демонстрация корректной работы приложения:

- Страница 404 при переходе на несуществующий URL
- Loading state при загрузке данных
- Обработка ошибок API

**Ссылка на видео:** https://youtu.be/P-2lO-0YiLI
