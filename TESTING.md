# TESTING.md

---

## Testing

Фреймворк: jest, vitest

### Как запустить

```bash
npm test # однократный запуск
npm run test:watch # запуск в watch-режиме
npm run test:coverage # запуск с отчетом о покрытии
npm run test:server # однократный запуск тестов сервера из корня проекта
cd server && npm test # однократный запуск тестов сервера из папки server
cd server && npm run test:watch # запуск в watch-режиме из папки server
cd server && npm run test:coverage # запуск с отчетом о покрытии из папки server
```

### Участники

#### @Blshop

Что тестирую: работоспособность страницы с вопросами

| Файл                                              | Описание                                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/pages/Quiz/__tests__/QuizPage.test.tsx`      |Тесты для страницы викторины: проверка рендеринга вопросов разных типов (single, multiple, yes/no,
|                                                   | predict-output), корректной проверки ответов, навигации между вопросами и отображения объяснений. |

PR с тестами: https://github.com/Blshop/JS-Practice-Hub/pull/68

#### @GorodeN

Что тестирую: валидация форм (схем валидации) Авторизации/Регистрации, MobX store (AuthStore)

| Файл                                                  | Описание                                                                                       |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/pages/Auth/schemas/__tests__/validation.test.ts` | Проверка email, пароля (длина, заглавная буква, цифра), обязательность username (пустых полей) |
| `src/store/__tests__/AuthStore.test.ts`               | Тесты для MobX стора: восстановление сессии, логин, регистрация, выход, геттер isAuthenticated, обработка ошибок |
| `server/src/__tests__/auth.test.js`                   | Интеграционные тесты для `/register`, `/login`, `/refresh`, `/logout`, `/profile` с использованием mongodb-memory-server и supertest |

PR с тестами: https://github.com/Blshop/JS-Practice-Hub/pull/58

#### @DmitryAstapenko

Что тестирую: базовые UI-компоненты (Button, Input, Checkbox, Radio, Select, Text)

| Файл                                                  | Описание                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `src/components/Button/__tests__/Button.test.tsx`     | Рендеринг, variant/size классы, состояния (disabled, loading), вызов onClick                |
| `src/components/Input/__tests__/Input.test.tsx`       | Рендеринг с label, type, elementSize, отображение ошибок, aria-invalid                      |
| `src/components/Checkbox/__tests__/Checkbox.test.tsx` | Рендеринг с label, elementSize, состояния (error, disabled), взаимодействие (checked)       |
| `src/components/Radio/__tests__/Radio.test.tsx`       | Рендеринг с label, elementSize, состояния (error, disabled), взаимодействие (checked)       |
| `src/components/Select/__tests__/Select.test.tsx`     | Рендеринг с label/placeholder, elementSize, открытие dropdown, выбор опции, вызов onChange  |
| `src/components/Text/__tests__/Text.test.tsx`         | Рендеринг текста, использование тегов (h1, p, span), применение стилей (muted, bold, error) |

PR с тестами: https://github.com/Blshop/JS-Practice-Hub/pull/64
