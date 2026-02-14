import { ProcessedPopulation } from '../types';

interface PopulationChartProps {
  data: ProcessedPopulation[];
}

export default function PopulationChart({ data }: PopulationChartProps) {
  // Sort by count descending
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-wrap gap-2">
      {sortedData.map(pop => (
        <span 
          key={pop.id} 
          className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-sm"
        >
          <span className="font-medium text-gray-800">{pop.name}</span>
          <span className="ml-1 text-gray-500">
            ({pop.count} / {pop.capacity})
          </span>
        </span>
      ))}
    </div>
  );
}
