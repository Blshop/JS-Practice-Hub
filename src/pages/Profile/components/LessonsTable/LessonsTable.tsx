import React, { useState, useMemo } from 'react';
import Text from 'components/Text';
import Badge from 'components/Badge';
import ProgressBar from 'components/ProgressBar';
import Input from 'components/Input';
import Select from 'components/Select';
import type { LessonStat } from '../../hooks/useProfileStats';
import styles from './LessonsTable.module.scss';

interface LessonsTableProps {
  lessonStats: LessonStat[];
}

const LessonsTable: React.FC<LessonsTableProps> = ({ lessonStats }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');

  const moduleOptions = useMemo(() => {
    const uniqueModules = Array.from(new Set(lessonStats.map((lesson) => lesson.moduleTitle)));
    return [
      { value: '', label: 'All Modules' },
      ...uniqueModules.map((module) => ({ value: module, label: module })),
    ];
  }, [lessonStats]);

  const filteredLessons = useMemo(() => {
    return lessonStats.filter((lesson) => {
      const matchesTitle = lesson.title.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesModule = !moduleFilter || lesson.moduleTitle === moduleFilter;
      return matchesTitle && matchesModule;
    });
  }, [lessonStats, titleFilter, moduleFilter]);

  if (lessonStats.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <Text tag="h3" className={styles.tableTitle}>
          Lessons Statistics
        </Text>
        <div className={styles.emptyState}>
          <Text muted>No lessons attempted yet</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <Text tag="h3" className={styles.tableTitle}>
        Lessons Statistics
      </Text>

      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search by lesson..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          elementSize="medium"
          className={styles.filterInput}
        />
        <Select
          options={moduleOptions}
          value={moduleFilter}
          onChange={setModuleFilter}
          placeholder="All Modules"
          elementSize="medium"
          className={styles.filterSelect}
        />
      </div>

      {filteredLessons.length === 0 ? (
        <div className={styles.emptyState}>
          <Text muted>No lessons match the selected filters</Text>
        </div>
      ) : (
        <div className={styles.table}>
          {filteredLessons.map((lesson) => (
            <div key={lesson.id} className={styles.lessonRow}>
              <div className={styles.lessonInfo}>
                <Text tag="h4" className={styles.lessonTitle}>
                  {lesson.title}
                </Text>
                <Text tag="p" muted className={styles.moduleTitle}>
                  {lesson.moduleTitle}
                </Text>
              </div>

              <div className={styles.lessonStats}>
                <div className={styles.attempts}>
                  <Badge variant="success" size="small">
                    Failed {lesson.successAttempts}
                  </Badge>
                  <Badge variant="danger" size="small">
                    Successful {lesson.failedAttempts}
                  </Badge>
                </div>

                <ProgressBar
                  current={lesson.successAttempts}
                  total={lesson.totalAttempts}
                  variant="info"
                  label="Test Success Rate"
                  showPercentage={true}
                  positionInfo="bottom"
                  className={styles.progressBar}
                />

                <div className={styles.attempts}>
                  <Badge variant="success" size="small">
                    Correct {lesson.questionsCorrect}
                  </Badge>
                  <Badge variant="danger" size="small">
                    Incorrect {lesson.questionsIncorrect}
                  </Badge>
                </div>

                <ProgressBar
                  current={lesson.questionsCorrect}
                  total={lesson.totalQuestions}
                  variant="info"
                  label="Questions Success Rate"
                  showPercentage={true}
                  positionInfo="bottom"
                  className={styles.progressBar}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

LessonsTable.displayName = 'LessonsTable';

export default LessonsTable;
