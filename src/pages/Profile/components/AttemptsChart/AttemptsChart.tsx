import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Text from 'components/Text';
import styles from './AttemptsChart.module.scss';

interface AttemptsChartProps {
  totalSuccess: number;
  totalFailed: number;
}

const COLORS = {
  success: '#bcead0',
  failed: '#ff8f8f',
};

const AttemptsChart: React.FC<AttemptsChartProps> = ({ totalSuccess, totalFailed }) => {
  const data = [
    { name: 'Successful', value: totalSuccess },
    { name: 'Failed', value: totalFailed },
  ];

  if (totalSuccess === 0 && totalFailed === 0) {
    return (
      <div className={styles.chartContainer}>
        <Text tag="h3" className={styles.chartTitle}>
          Attempts Distribution
        </Text>
        <div className={styles.emptyState}>
          <Text muted>No attempts yet</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <Text tag="h3" className={styles.chartTitle}>
        Attempts Distribution
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            stroke="#333333"
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.success : COLORS.failed} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttemptsChart;
