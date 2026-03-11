import React, { useState } from 'react';
import styles from './Reference.module.scss';

interface ReferenceTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  example: string;
}

const referenceTopics: ReferenceTopic[] = [
  {
    id: 'typeof',
    title: 'Оператор typeof',
    description: 'Возвращает строку, указывающую тип операнда. NaN имеет тип "number".',
    icon: '🔍',
    example: 'typeof 42 // "number"\ntypeof "hello" // "string"\ntypeof NaN // "number"',
  },
  {
    id: 'equality',
    title: 'Операторы сравнения',
    description: '== выполняет приведение типов, === проверяет строгое равенство.',
    icon: '⚖️',
    example: '5 == "5" // true\n5 === "5" // false\nnull == undefined // true',
  },
  {
    id: 'truthy-falsy',
    title: 'Truthy и Falsy значения',
    description: 'Falsy: false, 0, "", null, undefined, NaN. Все остальное - truthy.',
    icon: '✅',
    example: '!!0 // false\n!!"" // false\n!![] // true\n!!{} // true',
  },
  {
    id: 'hoisting',
    title: 'Hoisting (Поднятие)',
    description: 'var поднимается и инициализируется undefined. let/const в TDZ.',
    icon: '⬆️',
    example:
      'console.log(x); // undefined\nvar x = 5;\n\nconsole.log(y); // ReferenceError\nlet y = 10;',
  },
  {
    id: 'closures',
    title: 'Замыкания (Closures)',
    description: 'Функция имеет доступ к переменным из внешней области видимости.',
    icon: '🔒',
    example:
      'function outer() {\n  let x = 1;\n  return function() {\n    console.log(x);\n  };\n}',
  },
  {
    id: 'this-binding',
    title: 'Контекст this',
    description: 'Стрелочные функции наследуют this из лексического окружения.',
    icon: '👆',
    example:
      'const obj = {\n  name: "test",\n  arrow: () => this.name, // undefined\n  regular: function() { return this.name; }\n};',
  },
  {
    id: 'event-loop',
    title: 'Event Loop',
    description: 'Синхронный код → микрозадачи (Promise) → макрозадачи (setTimeout).',
    icon: '🔄',
    example:
      'console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// 1, 4, 3, 2',
  },
  {
    id: 'optional-chaining',
    title: 'Optional Chaining',
    description: 'Безопасное обращение к свойствам объекта с помощью ?.',
    icon: '🔗',
    example:
      'const user = { profile: null };\nuser?.profile?.name // undefined\nuser?.profile?.name ?? "anonymous" // "anonymous"',
  },
];

const Reference: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <div className={styles.reference}>
        <button className={styles.referenceButton} onClick={handleOpen}>
          <span className={styles.referenceButton__icon}>📚</span>
          <span>Справочник</span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.modal} onClick={handleBackdropClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeader__title}>
                <span>📚</span>
                Справочник JavaScript
              </h2>
              <button className={styles.modalHeader__close} onClick={handleClose}>
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.topicsList}>
                {referenceTopics.map((topic) => (
                  <div key={topic.id} className={styles.topicCard}>
                    <div className={styles.topicCard__header}>
                      <span className={styles.topicCard__icon}>{topic.icon}</span>
                      <h3 className={styles.topicCard__title}>{topic.title}</h3>
                    </div>

                    <p className={styles.topicCard__description}>{topic.description}</p>

                    <pre className={styles.topicCard__example}>{topic.example}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reference;
