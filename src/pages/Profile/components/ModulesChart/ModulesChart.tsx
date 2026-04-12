import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const chartData = moduleStats.map((module) => ({
    name: module.title,
    completed: module.completedTests,
    remaining: module.totalTests - module.completedTests,
  }));

  const maxTestsInModule = Math.max(...moduleStats.map((m) => m.totalTests), 0);

  return (
    <div className={styles.chartContainer}>
      <Text tag="h3" className={styles.chartTitle}>
        {t('profile.charts.progressByModule')}
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={150} />
          <YAxis allowDecimals={false} domain={[0, maxTestsInModule]} />
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
            name={t('profile.charts.completedTests')}
          />
          <Bar
            dataKey="remaining"
            stackId="a"
            fill="#afafaf"
            stroke="#333333"
            strokeWidth={2}
            name={t('profile.charts.remainingTests')}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

ModulesChart.displayName = 'ModulesChart';

export default ModulesChart;
