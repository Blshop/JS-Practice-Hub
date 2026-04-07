import React from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Tooltip,
  type PieLabelRenderProps,
} from 'recharts';
import Text from 'components/Text';
import styles from './AttemptsChart.module.scss';

interface AttemptsChartProps {
  totalSuccess: number;
  totalFailed: number;
  title?: string;
  labels?: {
    success?: string;
    failed?: string;
  };
}

const COLORS = {
  success: '#bcead0',
  failed: '#ff8f8f',
};

const AttemptsChart: React.FC<AttemptsChartProps> = ({
  totalSuccess,
  totalFailed,
  title = 'Attempts Distribution',
  labels,
}) => {
  const defaultLabels = {
    success: 'Successful',
    failed: 'Failed',
  };

  const finalLabels = { ...defaultLabels, ...labels };

  const data = [
    { name: finalLabels.success, value: totalSuccess, fill: COLORS.success },
    { name: finalLabels.failed, value: totalFailed, fill: COLORS.failed },
  ];

  const renderCustomLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = outerRadius - 35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const cos = Math.cos(-midAngle * RADIAN);
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        fontWeight="bold"
        textAnchor={textAnchor}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (totalSuccess === 0 && totalFailed === 0) {
    return (
      <div className={styles.chartContainer}>
        <Text tag="h3" className={styles.chartTitle}>
          {title}
        </Text>
        <div className={styles.emptyState}>
          <Text muted>No data yet</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <Text tag="h3" className={styles.chartTitle}>
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={90}
            dataKey="value"
            stroke="#333333"
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #333',
              borderRadius: '0.6em',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttemptsChart;
