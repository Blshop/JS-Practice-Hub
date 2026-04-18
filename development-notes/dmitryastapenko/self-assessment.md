# Self-Assessment: Dmitry Astapenko

**PR для ревью:** [#120](https://github.com/Blshop/JS-Practice-Hub/pull/120)

## 🎯 Таблица реализованных фич

| Категория            | Фича                                                                               | Баллы | Ссылки на код/PR                                                                                                                                                                                                                                                                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **My Components**    | **Rich UI Screen:** Страница профиля с графиками, таблицами и статистикой          | +20   | [PR #115](https://github.com/Blshop/JS-Practice-Hub/pull/115), [Profile](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/pages/Profile)                                                                                                                                                                                                                                |
| **My Components**    | **Rich UI Screen:** Главная страница с системой обучения                           | +20   | [PR #71](https://github.com/Blshop/JS-Practice-Hub/pull/71), [Main](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/pages/Main)                                                                                                                                                                                                                                        |
| **My Components**    | **Rich UI Screen:** Базовые UI компоненты (Демо-страница)                          | +20   | [PR #4](https://github.com/Blshop/JS-Practice-Hub/pull/4), [PR #32](https://github.com/Blshop/JS-Practice-Hub/pull/32), [Components: Badge, Button, Checkbox, Input, Loader, LoadingOverlay, ProgressBar, Radio, Select, Text](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/components), [Demo](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/pages/Demo) |
| **Backend & Data**   | **Custom Backend:** Разработка API для прогресса пользователя (Node.js + Express)  | +30   | [PR #115](https://github.com/Blshop/JS-Practice-Hub/pull/115), [Progress API](https://github.com/Blshop/JS-Practice-Hub/tree/main/server/src/controllers/progressController.js), [Model](https://github.com/Blshop/JS-Practice-Hub/tree/main/server/src/models/UserProgress.js)                                                                                                |
| **Backend & Data**   | **Backend Framework:** Использование Express.js                                    | +10   | [Server](https://github.com/Blshop/JS-Practice-Hub/tree/main/server/src)                                                                                                                                                                                                                                                                                                       |
| **Backend & Data**   | **API Documentation:** Swagger документация для API                                | +5    | [Swagger Config](https://github.com/Blshop/JS-Practice-Hub/blob/main/server/src/config/swagger.js)                                                                                                                                                                                                                                                                             |
| **UI & Interaction** | **Theme Switcher:** Переключение тем Light/Dark через MobX store                   | +10   | [ThemeStore](https://github.com/Blshop/JS-Practice-Hub/blob/main/src/store/ThemeStore.ts)                                                                                                                                                                                                                                                                                      |
| **UI & Interaction** | **i18n:** Локализация (русский/английский)                                         | +10   | [i18n](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/i18n), [Locales](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/i18n/locales)                                                                                                                                                                                                                          |
| **UI & Interaction** | **Responsive:** Адаптивная верстка от 320px                                        | +5    | [Весь проект](https://github.com/Blshop/JS-Practice-Hub/tree/main/src)                                                                                                                                                                                                                                                                                                         |
| **UI & Interaction** | **Accessibility (a11y):** Оптимизация доступности                                  | +10   | [PR #4](https://github.com/Blshop/JS-Practice-Hub/pull/4), [Components: Badge, Button, Checkbox, Input, Loader, LoadingOverlay, ProgressBar, Radio, Select, Text](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/components)                                                                                                                                          |
| **Quality**          | **Unit Tests (Basic):** Покрытие 20%+ личного кода                                 | +10   | [PR #64](https://github.com/Blshop/JS-Practice-Hub/pull/64), [Components, Main, Profile, ThemeStore, UserProgressStore](https://github.com/Blshop/JS-Practice-Hub/tree/main/src)                                                                                                                                                                                               |
| **Quality**          | **Unit Tests (Full):** Покрытие 50%+ личного кода                                  | +10   | [PR #105](https://github.com/Blshop/JS-Practice-Hub/pull/105), [PR #115](https://github.com/Blshop/JS-Practice-Hub/pull/115), [Components, Main, Profile, ThemeStore, UserProgressStore](https://github.com/Blshop/JS-Practice-Hub/tree/main/src)                                                                                                                              |
| **Architecture**     | **State Manager:** MobX для управления состоянием                                  | +10   | [UserProgressStore](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/store/UserProgressStore.ts), [ThemeStore](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/store/ThemeStore.ts)                                                                                                                                                                             |
| **Architecture**     | **Design Patterns:** Явное применение паттернов (Singleton, Observer, Composition) | +10   | [UserProgressStore](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/store/UserProgressStore.ts), [ThemeStore](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/store/ThemeStore.ts), [LearningPath](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/pages/Main/components/LearningPath/LearningPath.tsx)                                                |
| **Architecture**     | **API Layer:** Выделение слоя работы с API                                         | +10   | [progressService](https://github.com/Blshop/JS-Practice-Hub/tree/main/src/services/progressService.ts)                                                                                                                                                                                                                                                                         |
| **Frameworks**       | **React:** Использование React                                                     | +5    | [Весь проект](https://github.com/Blshop/JS-Practice-Hub/tree/main/src)                                                                                                                                                                                                                                                                                                         |
| **DevOps & Role**    | **Auto-deploy:** Настройка автоматического деплоя (GH Actions, Pello, Render)      | +5    | [GitHub Actions](https://github.com/Blshop/JS-Practice-Hub/tree/main/.github/workflows)                                                                                                                                                                                                                                                                                        |

**ИТОГО:** 200 баллов (из максимальных 250)

---

## 💼 Описание работы над проектом

### Технологии и инструменты

**Frontend:**

- React 18 + TypeScript
- MobX для управления состоянием
- SCSS Modules для стилизации
- Recharts для визуализации данных
- i18next для локализации
- React Router для навигации

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- Swagger для документации API

**Testing & Quality:**

- Jest + React Testing Library
- ESLint + Prettier
- Husky для git hooks

### Что было сложным

1. **Интеграция библиотеки графиков Recharts** - настройка под дизайн, адаптивность, поддержка темной темы, кастомизация тултипов
2. **Select компонент с полной accessibility** - реализация клавиатурной навигации, ARIA-атрибуты, управление фокусом
3. **Система синхронизации прогресса** - сложная логика между localStorage и сервером, валидация данных, обработка конфликтов
4. **Расчет статистики профиля** - множество вычислений по модулям, урокам, вопросам с учетом локализации

### Что сделал с нуля (без AI)

- **9 базовых UI компонентов** - Button, Input, Select, Checkbox, Radio, Text, ProgressBar, Badge, Loader, LoadingOverlay
- **Страница профиля** - полностью от дизайна до реализации с графиками и таблицами
- **Главная страница** - система отображения учебного пути с модулями и уроками

## 🎯 Два личных Feature Component

### Feature #1: Страница профиля пользователя

**Описание:**  
Полноценная страница профиля с визуализацией прогресса обучения, статистикой и детальной информацией по урокам.

**Компоненты:**

- **UserCard** - карточка пользователя с аватаром и основной информацией
- **StatsCards** - 4 карточки со статистикой (попытки, уроки, XP, точность)
- **ModulesChart** - круговая диаграмма прогресса по модулям (Recharts)
- **AttemptsChart** - столбчатая диаграмма попыток по урокам (Recharts)
- **LessonsTable** - таблица всех уроков с фильтрацией по статусу, модулю и сложности

**Технологии:**

- React + TypeScript
- Recharts для графиков
- MobX для состояния (UserProgressStore)
- i18next для локализации
- SCSS Modules

**Сложность:**

- Интеграция и настройка Recharts под дизайн
- Сложные расчеты статистики по всем модулям и урокам
- Поддержка темной темы для всех элементов
- Синхронизация данных с сервером

### Feature #2: Система обучения на главной странице

**Описание:**  
Интерактивная система отображения учебного пути с модулями и уроками, показывающая прогресс пользователя.

**Компоненты:**

- **LearningPath** - контейнер для всей системы обучения
- **ModuleItem** - карточка модуля с прогресс-баром и списком уроков
- **LessonItem** - карточка урока со статусом, сложностью и наградой XP

**Технологии:**

- React + TypeScript
- MobX для состояния (UserProgressStore)
- SCSS Modules

**Сложность:**

- Структура данных для модулей и уроков
- Расчет прогресса по каждому модулю
- Отображение статусов уроков (не начат, в процессе, завершен)
- Интеграция с системой прогресса пользователя
