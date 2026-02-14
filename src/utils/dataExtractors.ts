import { 
  GameData, 
  ProcessedResource, 
  ProcessedPopulation, 
  ProcessedBuilding, 
  ProcessedTechnology, 
  ProcessedArmyUnit 
} from '../types';

// Extract resources with production/consumption data
export function extractResources(data: GameData): ProcessedResource[] {
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
export function extractPopulation(data: GameData): ProcessedPopulation[] {
  const totalPopulation = data.population.reduce((sum, pop) => sum + pop.value, 0);
  
  return data.population.map(pop => ({
    id: pop.id,
    name: formatProfessionName(pop.id),
    count: pop.value,
    percentage: totalPopulation > 0 ? parseFloat(((pop.value / totalPopulation) * 100).toFixed(1)) : 0
  }));
}

// Extract buildings with counts
export function extractBuildings(data: GameData): ProcessedBuilding[] {
  return data.buildings
    .filter(building => building.value > 0)
    .map(building => ({
      id: building.id,
      name: formatBuildingName(building.id),
      count: building.value
    }));
}

// Extract technologies with research status
export function extractTechnologies(data: GameData): ProcessedTechnology[] {
  return data.techs.map(tech => ({
    id: tech.id,
    name: formatTechName(tech.id),
    researched: tech.value === 1
  }));
}

// Extract army composition
export function extractArmy(data: GameData): ProcessedArmyUnit[] {
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
