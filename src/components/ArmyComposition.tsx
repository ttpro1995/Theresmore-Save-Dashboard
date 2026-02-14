import { ProcessedArmyUnit } from '../types';

interface ArmyCompositionProps {
  data: ProcessedArmyUnit[];
}

export default function ArmyComposition({ data }: ArmyCompositionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((unit) => (
        <div key={unit.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="font-semibold text-gray-800 dark:text-gray-200">
            {unit.name}
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {unit.total.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
