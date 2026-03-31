# JS-Practice-Hub

**JS-Practice-Hub** — это веб-приложение для тренировки знаний по JavaScript и подготовки к техническим интервью. Платформа содержит интерактивные задания, включая drag-and-drop вопросы на правильный порядок выполнения кода, тестовые вопросы с выбором одного или нескольких правильных ответов, а также практические упражнения для закрепления ключевых концепций языка.

В приложении реализованы уровни сложности, что позволяет постепенно углублять знания — от базовых тем до продвинутых концепций. Также предусмотрено хранение статистики для отслеживания прогресса пользователя и анализа результатов. Проект направлен на развитие глубокого понимания асинхронности, работы event loop, замыканий, прототипов и других ключевых механизмов JavaScript.

## Ссылка на deploy

- https://js-practice-hub-frontend.onrender.com/
- https://blshop.github.io/JS-Practice-Hub/ (запасная, только клиент)

## 👨‍💻 Состав команды

- **Nikita Erechtchenko** — https://github.com/Blshop
- **Roman Shamaluk**— https://github.com/GorodeN
- **Dmitry Astapenko** — https://github.com/DmitryAstapenko

## 🎓 Ментор

- **Alina Husarava** — https://github.com/spadarynjaALINA

## 🏫 Организация

- **The Rolling Scopes (@rollingscopes)** — https://github.com/rollingscopes

## 📹 Видео-доказательство функциональности (Страница 404, Loading state, Обработка ошибок API)

Демонстрация корректной работы приложения:

- Страница 404 при переходе на несуществующий URL
- Loading state при загрузке данных
- Обработка ошибок API

**Ссылка на видео:** https://youtu.be/P-2lO-0YiLI


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
- Заполнить реальными данными (см. раздел "Переменные окружения")

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

> 💡 Для одновременного запуска можно использовать npm run dev:all (установите concurrently).


### Переменные окружения сервера (файл `server/.env`)

| Переменная | Описание | Пример |
|------------|----------|--------|
| `PORT` | Порт сервера | `5000` |
| `MONGO_URI` | Строка подключения MongoDB | `mongodb+srv://...` |
| `JWT_ACCESS_SECRET` | Секрет для access токенов | `...` |
| `JWT_REFRESH_SECRET` | Секрет для refresh токенов | `...` |
| `CLIENT_URL` | URL клиента (для CORS) | `http://localhost:5173` |

Для клиента: файл `.env` в корне с `VITE_API_URL=http://localhost:5000/api`.

> 💡 `JWT_ACCESS_SECRET` и `JWT_REFRESH_SECRET` можно сгенерировать с помощью `openssl rand -base64 32` в терминале (создаст строку типа `4HcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H@McQ`).


### Swagger (Документация API)
- Запустить сервер
- Перейти по адресу http://localhost:5000/api-docs/
