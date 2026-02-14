import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProcessedPopulation } from '../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface PopulationChartProps {
  data: ProcessedPopulation[];
}

export default function PopulationChart({ data }: PopulationChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [value, 'Workers']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
