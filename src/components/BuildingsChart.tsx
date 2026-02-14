import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProcessedBuilding } from '../types';

interface BuildingsChartProps {
  data: ProcessedBuilding[];
}

export default function BuildingsChart({ data }: BuildingsChartProps) {
  const topBuildings = data
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topBuildings}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Count" fill="#0088FE" />
      </BarChart>
    </ResponsiveContainer>
  );
}
