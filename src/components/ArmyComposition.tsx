import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProcessedArmyUnit } from '../types';

interface ArmyCompositionProps {
  data: ProcessedArmyUnit[];
}

export default function ArmyComposition({ data }: ArmyCompositionProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="home" name="Home" stackId="a" fill="#0088FE" />
        <Bar dataKey="away" name="Away" stackId="a" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  );
}
