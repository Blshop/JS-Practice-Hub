# TESTING.md

---

## Testing

Фреймворк: jest

### Как запустить

```bash
npm test # однократный запуск
npm run test:watch # запуск в watch-режиме
npm run test:coverage # запуск с отчетом о покрытии
```

### Участники

#### @Blshop

Что тестирую: ...

| Файл       | Описание |
| ---------- | -------- |
| `.test.ts` |          |
| `.test.ts` |          |

PR с тестами: https://github.com/Blshop/JS-Practice-Hub/pull/

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
