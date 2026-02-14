import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProcessedResource } from '../types';

interface ResourcesChartProps {
  data: ProcessedResource[];
}

export default function ResourcesChart({ data }: ResourcesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Amount" fill="#8884d8" />
        <Bar dataKey="production" name="Production" fill="#00C49F" />
        <Bar dataKey="consumption" name="Consumption" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  );
}
