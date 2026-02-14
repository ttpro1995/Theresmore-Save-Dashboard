import { ProcessedResource } from '../types';

interface ResourcesChartProps {
  data: ProcessedResource[];
}

export default function ResourcesChart({ data }: ResourcesChartProps) {
  const resourcesWithCaps = data.filter(r => r.cap > 0);

  return (
    <div className="text-sm text-gray-900 dark:text-gray-100">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 dark:text-gray-400">
            <th className="py-1">Resource</th>
            <th className="py-1 text-right">Max</th>
          </tr>
        </thead>
        <tbody>
          {resourcesWithCaps.map((resource) => (
            <tr key={resource.id} className="border-t border-gray-100 dark:border-gray-700">
              <td className="py-1">{resource.name}</td>
              <td className="py-1 text-right">{resource.cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {resourcesWithCaps.length === 0 && (
        <p className="text-gray-500 text-center py-2">No resource caps available</p>
      )}
    </div>
  );
}
