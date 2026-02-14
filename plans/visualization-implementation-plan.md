# Save File Visualization Implementation Plan

## Project Overview
Enhance the Save File Dashboard to provide beautiful, interactive visualizations for game save file data following the specific structure outlined in `plan/visualize-save.md`.

## Current State
- Basic visualization support exists using Recharts library
- Currently shows raw JSON, tree view, and simple type distribution/bar charts
- Needs specialized visualizations for each game data category

## Implementation Strategy

### 1. Type Definitions
Create comprehensive TypeScript type definitions for the specific save file structure:

```typescript
// Game-specific data types
interface GameData {
  version: string;
  caps: CapEntry[];
  resources: ResourceEntry[];
  buildings: BuildingEntry[];
  population: PopulationEntry[];
  techs: TechEntry[];
  modifiers: ModifierEntry[];
  army: ArmyEntry[];
  armyOrder: ArmyOrder;
  enemies: EnemyEntry[];
  diplomacy: DiplomacyEntry[];
  stocks: StockEntry[];
  prayers: PrayerEntry[];
  spells: string[];
  rewards: RewardEntry[];
  // ... other properties
}

interface CapEntry {
  id: string;
  value: number;
}

interface ResourceEntry {
  id: string;
  value: number;
  manual: number;
  timer: number;
  timern: number;
  perc: number;
}

interface BuildingEntry {
  id: string;
  value: number;
}

interface PopulationEntry {
  id: string;
  value: number;
}

interface TechEntry {
  id: string;
  value: number;
}

interface ModifierEntry {
  id: string;
  type: string;
  mods: Modification[];
}

interface Modification {
  typeOrig?: string;
  idOrig?: string;
  type: string;
  id: string;
  value: number;
  perc: boolean;
}

interface ArmyEntry {
  id: string;
  value: number;
  away: number;
}

interface ArmyOrder {
  away: string[];
  defense: string[];
}

interface EnemyEntry {
  id: string;
  owned: number;
  log: string;
}

interface StockEntry {
  id: string;
  sell_min: number;
  sell_max: number;
  sell_duration: number;
  buy_min: number;
  buy_max: number;
  buy_duration: number;
}

interface PrayerEntry {
  id: string;
  value: number;
}

interface RewardEntry {
  // Definition needed
}

interface DiplomacyEntry {
  // Definition needed
}
```

### 2. Data Extraction Utilities
Create utility functions to extract and transform data for visualization:

```typescript
// src/utils/dataExtractors.ts

// Extract resources with production/consumption data
export function extractResources(data: GameData) {
  return data.resources.map(resource => ({
    id: resource.id,
    name: formatResourceName(resource.id),
    value: resource.value,
    production: calculateProduction(resource),
    consumption: calculateConsumption(resource),
    percentage: resource.perc
  }));
}

// Extract population by type
export function extractPopulation(data: GameData) {
  return data.population.map(pop => ({
    id: pop.id,
    name: formatProfessionName(pop.id),
    count: pop.value,
    percentage: calculatePopulationPercentage(pop, data.population)
  }));
}

// Extract buildings with counts
export function extractBuildings(data: GameData) {
  return data.buildings
    .filter(building => building.value > 0)
    .map(building => ({
      id: building.id,
      name: formatBuildingName(building.id),
      count: building.value
    }));
}

// Extract technologies with research status
export function extractTechnologies(data: GameData) {
  return data.techs.map(tech => ({
    id: tech.id,
    name: formatTechName(tech.id),
    researched: tech.value === 1
  }));
}

// Extract army composition
export function extractArmy(data: GameData) {
  return data.army.map(unit => ({
    id: unit.id,
    name: formatUnitName(unit.id),
    total: unit.value,
    away: unit.away,
    home: unit.value - unit.away
  }));
}

// Extract modifiers by type
export function extractModifiers(data: GameData) {
  const modifiersByType: Record<string, ModifierEntry[]> = {};
  data.modifiers.forEach(mod => {
    if (!modifiersByType[mod.type]) {
      modifiersByType[mod.type] = [];
    }
    modifiersByType[mod.type].push(mod);
  });
  return modifiersByType;
}

// Helper functions for formatting
function formatResourceName(id: string): string {
  return id.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatBuildingName(id: string): string {
  return id.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// ... other formatting functions
```

### 3. Visualization Components
Create specialized React components for each data category using Recharts:

#### Resources Visualization
```typescript
// src/components/ResourcesChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResourcesChartProps {
  data: ResourceData[];
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
```

#### Population Pie Chart
```typescript
// src/components/PopulationChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface PopulationChartProps {
  data: PopulationData[];
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
          label={({ name, percentage }) => `${name} ${percentage}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, 'Workers']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

#### Buildings Bar Chart
```typescript
// src/components/BuildingsChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BuildingsChartProps {
  data: BuildingData[];
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
```

### 4. Main Visualization Dashboard
Enhance the existing DataDisplay component to include specialized views:

```typescript
// src/components/DataDisplay.tsx (enhanced)
import { useMemo } from 'react';
import { useSaveFile } from '../contexts/SaveFileContext';
import ResourcesChart from './ResourcesChart';
import PopulationChart from './PopulationChart';
import BuildingsChart from './BuildingsChart';
import TechnologiesGrid from './TechnologiesGrid';
import ArmyComposition from './ArmyComposition';
import ModifiersTable from './ModifiersTable';
import { extractResources, extractPopulation, extractBuildings, extractTechnologies, extractArmy, extractModifiers } from '../utils/dataExtractors';

export default function DataDisplay() {
  const { state, settings } = useSaveFile();

  const resourcesData = useMemo(() => {
    if (!state.parsed) return [];
    return extractResources(state.parsed);
  }, [state.parsed]);

  const populationData = useMemo(() => {
    if (!state.parsed) return [];
    return extractPopulation(state.parsed);
  }, [state.parsed]);

  const buildingsData = useMemo(() => {
    if (!state.parsed) return [];
    return extractBuildings(state.parsed);
  }, [state.parsed]);

  const technologiesData = useMemo(() => {
    if (!state.parsed) return [];
    return extractTechnologies(state.parsed);
  }, [state.parsed]);

  const armyData = useMemo(() => {
    if (!state.parsed) return [];
    return extractArmy(state.parsed);
  }, [state.parsed]);

  const modifiersData = useMemo(() => {
    if (!state.parsed) return {};
    return extractModifiers(state.parsed);
  }, [state.parsed]);

  if (settings.viewMode === 'visualization') {
    return (
      <div className="space-y-8">
        {/* Resources Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Resources
          </h2>
          <ResourcesChart data={resourcesData} />
        </section>

        {/* Population Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Population Distribution
          </h2>
          <PopulationChart data={populationData} />
        </section>

        {/* Buildings Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Top Buildings
          </h2>
          <BuildingsChart data={buildingsData} />
        </section>

        {/* Technologies Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Technologies
          </h2>
          <TechnologiesGrid data={technologiesData} />
        </section>

        {/* Army Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Army Composition
          </h2>
          <ArmyComposition data={armyData} />
        </section>

        {/* Modifiers Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Modifiers
          </h2>
          <ModifiersTable data={modifiersData} />
        </section>
      </div>
    );
  }

  // ... existing raw and tree view implementations
}
```

### 5. Interactive Features
Implement interactive features for better user experience:

```typescript
// src/components/TechnologiesGrid.tsx - with filtering
import { useState } from 'react';

interface TechnologiesGridProps {
  data: TechnologyData[];
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
```

### 6. Performance Optimization
Implement performance optimizations for large save files:

```typescript
// src/utils/performance.ts
import { useMemo } from 'react';

// Memoize expensive computations
export function useMemoizedDataExtractor<T>(
  extractor: () => T,
  dependencies: any[]
) {
  return useMemo(() => {
    console.time('Data extraction');
    const result = extractor();
    console.timeEnd('Data extraction');
    return result;
  }, dependencies);
}

// Lazy load heavy components
export function lazyLoadComponent(importFn: () => Promise<any>) {
  return React.lazy(importFn);
}

// Virtualization for large data tables
export function virtualizeList<T>(items: T[], itemHeight: number, containerHeight: number) {
  // Implementation for virtual list rendering
}
```

### 7. Testing Strategy
Test the implementation with sample data:

```typescript
// src/tests/dataExtractors.test.ts
import { extractResources, extractPopulation, extractBuildings } from '../utils/dataExtractors';
import sampleSaveData from './sampleSaveData.json';

describe('Data Extractors', () => {
  describe('extractResources', () => {
    it('should extract resources with correct properties', () => {
      const resources = extractResources(sampleSaveData);
      expect(resources).toBeInstanceOf(Array);
      resources.forEach(resource => {
        expect(resource).toHaveProperty('id');
        expect(resource).toHaveProperty('name');
        expect(resource).toHaveProperty('value');
        expect(typeof resource.value).toBe('number');
      });
    });
  });

  describe('extractPopulation', () => {
    it('should calculate population percentages correctly', () => {
      const population = extractPopulation(sampleSaveData);
      const totalPercentage = population.reduce((sum, pop) => sum + pop.percentage, 0);
      expect(totalPercentage).toBeCloseTo(100);
    });
  });

  describe('extractBuildings', () => {
    it('should only include buildings with positive counts', () => {
      const buildings = extractBuildings(sampleSaveData);
      buildings.forEach(building => {
        expect(building.count).toBeGreaterThan(0);
      });
    });
  });
});
```

## Implementation Timeline
1. **Type Definitions**: 1-2 hours
2. **Data Extraction Utilities**: 3-4 hours
3. **Visualization Components**: 6-8 hours
4. **Enhance DataDisplay**: 2-3 hours
5. **Interactive Features**: 3-4 hours
6. **Performance Optimization**: 2-3 hours
7. **Testing**: 2-3 hours

## Dependencies
- Recharts library (already included)
- React 18+ with TypeScript
- Tailwind CSS for styling

## Risks and Mitigation
1. **Large save file performance**: Implement virtualization and lazy loading
2. **Data parsing errors**: Add error handling and validation
3. **Responsive design**: Test on multiple screen sizes
4. **Browser compatibility**: Ensure Recharts works across modern browsers

## Success Metrics
1. All visualization components render correctly with sample data
2. Interactive features (filtering, sorting, tooltips) work properly
3. Application performance remains acceptable with large save files
4. Responsive design works across desktop and mobile devices
5. All tests pass successfully
