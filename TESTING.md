# TESTING.md

---

## Testing

Фреймворк: jest, vitest

### Как запустить

```bash
npm test # однократный запуск
npm run test:watch # запуск в watch-режиме
npm run test:coverage # запуск с отчетом о покрытии
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

Что тестирую: валидация форм (схем валидации) Авторизации/Регистрации

| Файл                                                  | Описание                                                                                       |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/pages/Auth/schemas/__tests__/validation.test.ts` | Проверка email, пароля (длина, заглавная буква, цифра), обязательность username (пустых полей) |

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
