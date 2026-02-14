// Save file data types

export interface SaveFileData {
  [key: string]: unknown;
}

export interface SaveFileState {
  encoded: string;
  decoded: string;
  parsed: SaveFileData | null;
  isCompressed: boolean;
  fileName: string;
  error: string | null;
  isLoading: boolean;
}

export interface DecodedDataNode {
  key: string;
  value: unknown;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';
  path: string;
  children?: DecodedDataNode[];
}

export type ViewMode = 'raw' | 'tree' | 'visualization';

export interface AppSettings {
  viewMode: ViewMode;
  autoDecode: boolean;
  theme: 'light' | 'dark';
}

// Game-specific data types
export interface GameData {
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
  flag: number;
  flagb: number;
  flagd: number;
  dfc: number;
  boss: string;
  donation: number;
}

export interface CapEntry {
  id: string;
  value: number;
}

export interface ResourceEntry {
  id: string;
  value: number;
  manual: number;
  timer: number;
  timern: number;
  perc: number;
}

export interface BuildingEntry {
  id: string;
  value: number;
}

export interface PopulationEntry {
  id: string;
  value: number;
}

export interface TechEntry {
  id: string;
  value: number;
}

export interface ModifierEntry {
  id: string;
  type: string;
  mods: Modification[];
}

export interface Modification {
  typeOrig?: string;
  idOrig?: string;
  type: string;
  id: string;
  value: number;
  perc: boolean;
}

export interface ArmyEntry {
  id: string;
  value: number;
  away: number;
}

export interface ArmyOrder {
  away: string[];
  defense: string[];
}

export interface EnemyEntry {
  id: string;
  owned: number;
  log: string;
}

export interface StockEntry {
  id: string;
  sell_min: number;
  sell_max: number;
  sell_duration: number;
  buy_min: number;
  buy_max: number;
  buy_duration: number;
}

export interface PrayerEntry {
  id: string;
  value: number;
}

export interface RewardEntry {
  // Definition needed
}

export interface DiplomacyEntry {
  // Definition needed
}

// Processed data types for visualization
export interface ProcessedResource {
  id: string;
  name: string;
  value: number;
  production: number;
  consumption: number;
  percentage: number;
}

export interface ProcessedPopulation {
  id: string;
  name: string;
  count: number;
  percentage: number;
}

export interface ProcessedBuilding {
  id: string;
  name: string;
  count: number;
}

export interface ProcessedTechnology {
  id: string;
  name: string;
  researched: boolean;
}

export interface ProcessedArmyUnit {
  id: string;
  name: string;
  total: number;
  away: number;
  home: number;
}
