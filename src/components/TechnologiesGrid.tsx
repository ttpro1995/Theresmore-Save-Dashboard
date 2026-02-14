import { useState, useMemo } from 'react';
import { ProcessedTechnology } from '../types';

interface TechnologiesGridProps {
  data: ProcessedTechnology[];
}

export default function TechnologiesGrid({ data }: TechnologiesGridProps) {
  const [filter, setFilter] = useState<'all' | 'researched' | 'unresearched'>('all');

  const filteredData = useMemo(() => {
    switch (filter) {
      case 'researched':
        return data.filter(tech => tech.researched);
      case 'unresearched':
        return data.filter(tech => !tech.researched);
      default:
        return data;
    }
  }, [data, filter]);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('researched')}
          className={`px-4 py-2 rounded ${
            filter === 'researched' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Researched
        </button>
        <button
          onClick={() => setFilter('unresearched')}
          className={`px-4 py-2 rounded ${
            filter === 'unresearched' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Unresearched
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredData.map(tech => (
          <div
            key={tech.id}
            className={`p-3 rounded border ${
              tech.researched
                ? 'border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-700'
                : 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600'
            }`}
          >
            <h3 className="font-medium text-sm">{tech.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tech.researched ? 'Researched' : 'Not Researched'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
