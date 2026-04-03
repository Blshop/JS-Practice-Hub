import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Text from 'components/Text';
import type { ModuleStat } from '../../hooks/useProfileStats';
import styles from './ModulesChart.module.scss';

interface ModulesChartProps {
  moduleStats: ModuleStat[];
}

const ModulesChart: React.FC<ModulesChartProps> = ({ moduleStats }) => {
  const hasData = moduleStats.some((module) => module.completedLessons > 0);

  if (!hasData) {
    return (
      <div className={styles.chartContainer}>
        <Text tag="h3" className={styles.chartTitle}>
          Progress by Module
        </Text>
        <div className={styles.emptyState}>
          <Text muted>No progress yet</Text>
        </div>
      </div>
    );
  }

  const chartData = moduleStats.map((module) => ({
    name: module.title,
    completed: module.completedLessons,
    remaining: module.totalLessons - module.completedLessons,
  }));

  return (
    <div className={styles.chartContainer}>
      <Text tag="h3" className={styles.chartTitle}>
        Progress by Module
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #333',
              borderRadius: '0.6em',
            }}
          />
          <Legend />
          <Bar
            dataKey="completed"
            stackId="a"
            fill="#bcead0"
            stroke="#333333"
            strokeWidth={2}
            name="Completed"
          />
          <Bar
            dataKey="remaining"
            stackId="a"
            fill="#e3e3e3"
            stroke="#333333"
            strokeWidth={2}
            name="Remaining"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModulesChart;
