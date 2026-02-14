import { 
  GameDataSection,
  ProcessedResource, 
  ProcessedPopulation, 
  ProcessedBuilding, 
  ProcessedTechnology, 
  ProcessedArmyUnit 
} from '../types';

// Extract resources with production/consumption data
export function extractResources(data: GameDataSection): ProcessedResource[] {
  if (!data.resources || !Array.isArray(data.resources)) return [];
  
  // Get capacity from caps if available
  const capsMap: Record<string, number> = {};
  if (data.caps && Array.isArray(data.caps)) {
    data.caps.forEach(cap => {
      capsMap[cap.id] = cap.value;
    });
  }
  
  return data.resources.map(resource => ({
    id: resource.id,
    name: formatResourceName(resource.id),
    value: resource.value,
    production: calculateProduction(resource),
    consumption: calculateConsumption(resource),
    percentage: resource.perc || 0,
    cap: capsMap[resource.id] || 0
  }));
}

// Extract population by type
export function extractPopulation(data: GameDataSection): ProcessedPopulation[] {
  if (!data.population || !Array.isArray(data.population)) return [];
  const totalPopulation = data.population.reduce((sum, pop) => sum + pop.value, 0);
  
  // Get capacity from caps if available
  const capsMap: Record<string, number> = {};
  if (data.caps && Array.isArray(data.caps)) {
    data.caps.forEach(cap => {
      capsMap[cap.id] = cap.value;
    });
  }
  
  return data.population.map(pop => ({
    id: pop.id,
    name: formatProfessionName(pop.id),
    count: pop.value,
    capacity: capsMap[pop.id] || 0,
    percentage: totalPopulation > 0 ? parseFloat(((pop.value / totalPopulation) * 100).toFixed(1)) : 0
  }));
}

// Extract buildings with counts
export function extractBuildings(data: GameDataSection): ProcessedBuilding[] {
  if (!data.buildings || !Array.isArray(data.buildings)) return [];
  return data.buildings
    .filter(building => building.value > 0)
    .map(building => ({
      id: building.id,
      name: formatBuildingName(building.id),
      count: building.value
    }));
}

// Extract technologies with research status
export function extractTechnologies(data: GameDataSection): ProcessedTechnology[] {
  if (!data.techs || !Array.isArray(data.techs)) return [];
  return data.techs.map(tech => ({
    id: tech.id,
    name: formatTechName(tech.id),
    researched: tech.value === 1
  }));
}

// Extract army composition
export function extractArmy(data: GameDataSection): ProcessedArmyUnit[] {
  if (!data.army || !Array.isArray(data.army)) return [];
  return data.army.map(unit => ({
    id: unit.id,
    name: formatUnitName(unit.id),
    total: unit.value,
    away: unit.away || 0,
    home: unit.value - (unit.away || 0)
  }));
}

// Extract modifiers by type
export function extractModifiers(data: GameDataSection) {
  if (!data.modifiers || !Array.isArray(data.modifiers)) return {};
  const modifiersByType: Record<string, typeof data.modifiers> = {};
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

function formatProfessionName(id: string): string {
  return id.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatTechName(id: string): string {
  return id.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function formatUnitName(id: string): string {
  return id.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Helper functions for calculation
function calculateProduction(resource: any): number {
  // Production calculation based on game mechanics
  // For now, we'll use a placeholder calculation
  return Math.max(0, resource.timern) || 0;
}

function calculateConsumption(resource: any): number {
  // Consumption calculation based on game mechanics
  // For now, we'll use a placeholder calculation
  return Math.max(0, -resource.timern) || 0;
}
