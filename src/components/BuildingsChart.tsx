import { ProcessedBuilding } from '../types';

interface BuildingsChartProps {
  data: ProcessedBuilding[];
}

// Building categories mapping based on plans/building-categories.md
const BUILDING_CATEGORIES: Record<string, string> = {
  // Living Quarter
  common_house: 'Living Quarter',
  house_workers: 'Living Quarter',
  monument: 'Living Quarter',
  hall_of_the_dead: 'Living Quarter',
  city_hall: 'Living Quarter',
  amusement_quarter_b: 'Living Quarter',
  mansion: 'Living Quarter',
  residential_block: 'Living Quarter',
  ministry_interior: 'Living Quarter',
  gan_eden: 'Living Quarter',
  ministry_development: 'Living Quarter',
  colony_hall: 'Living Quarter',
  elf_village: 'Living Quarter',
  elf_town: 'Living Quarter',
  beacon_light: 'Living Quarter',
  underground_house: 'Living Quarter',
  light_square_b: 'Living Quarter',
  
  // Producing and Crafting
  farm: 'Producing and Crafting',
  granary: 'Producing and Crafting',
  lumberjack_camp: 'Producing and Crafting',
  sawmill: 'Producing and Crafting',
  lucky_grove_b: 'Producing and Crafting',
  quarry: 'Producing and Crafting',
  stonemason: 'Producing and Crafting',
  mine: 'Producing and Crafting',
  titan_work_area: 'Producing and Crafting',
  stable: 'Producing and Crafting',
  sacred_den_b: 'Producing and Crafting',
  undead_herd: 'Producing and Crafting',
  fiefdom: 'Producing and Crafting',
  foundry: 'Producing and Crafting',
  machines_of_gods: 'Producing and Crafting',
  carpenter_workshop: 'Producing and Crafting',
  grocery: 'Producing and Crafting',
  steelworks: 'Producing and Crafting',
  guild_of_craftsmen: 'Producing and Crafting',
  alchemic_laboratory: 'Producing and Crafting',
  builder_district: 'Producing and Crafting',
  natronite_refinery: 'Producing and Crafting',
  industrial_plant: 'Producing and Crafting',
  factory: 'Producing and Crafting',
  builders_complex: 'Producing and Crafting',
  artisans_complex: 'Producing and Crafting',
  alchemist_complex: 'Producing and Crafting',
  lumix_plant: 'Producing and Crafting',
  extensive_cultivation_b: 'Producing and Crafting',
  steel_mills_b: 'Producing and Crafting',
  crystal_farm_b: 'Producing and Crafting',
  dock: 'Producing and Crafting',
  refinery: 'Producing and Crafting',
  estates: 'Producing and Crafting',
  gathering_area: 'Producing and Crafting',
  mining_area: 'Producing and Crafting',
  lumix_refinery: 'Producing and Crafting',
  
  // Wonder
  city_center: 'Wonder',
  city_center_unit: 'Wonder',
  great_fair: 'Wonder',
  great_fair_unit: 'Wonder',
  cathedral: 'Wonder',
  cathedral_unit: 'Wonder',
  academy_of_freethinkers: 'Wonder',
  academy_of_freethinkers_part: 'Wonder',
  great_bombard: 'Wonder',
  great_bombard_part: 'Wonder',
  refugee_district: 'Wonder',
  refugee_district_part: 'Wonder',
  stock_exchange: 'Wonder',
  stock_exchange_part: 'Wonder',
  tower_mana: 'Wonder',
  tower_mana_part: 'Wonder',
  mana_pit: 'Wonder',
  mana_pit_part: 'Wonder',
  hall_heroic_deeds: 'Wonder',
  hall_heroic_deeds_part: 'Wonder',
  harbor_district: 'Wonder',
  harbor_district_part: 'Wonder',
  city_lights: 'Wonder',
  city_lights_part: 'Wonder',
  steel_palace_b: 'Wonder',
  steel_palace_b_part: 'Wonder',
  ivory_tower_b: 'Wonder',
  ivory_tower_b_part: 'Wonder',
  automated_complex: 'Wonder',
  automated_complex_part: 'Wonder',
  kobu_crystal: 'Wonder',
  kobu_crystal_part: 'Wonder',
  arch_triumph: 'Wonder',
  arch_triumph_part: 'Wonder',
  statue_virtue: 'Wonder',
  statue_virtue_part: 'Wonder',
  fortified_citadel: 'Wonder',
  fortified_citadel_part: 'Wonder',
  holy_site: 'Wonder',
  holy_site_part: 'Wonder',
  signal_machine: 'Wonder',
  signal_machine_part: 'Wonder',
  guide_mankind_b: 'Wonder',
  guide_mankind_b_part: 'Wonder',
  
  // Commercial Area
  artisan_workshop: 'Commercial Area',
  marketplace: 'Commercial Area',
  lucky_well_b: 'Commercial Area',
  canava_trading: 'Commercial Area',
  valley_of_plenty: 'Commercial Area',
  bank: 'Commercial Area',
  allied_embassy: 'Commercial Area',
  tax_revenue_checkpoints: 'Commercial Area',
  the_vaults: 'Commercial Area',
  credit_union: 'Commercial Area',
  railway_station: 'Commercial Area',
  genetic_hub: 'Commercial Area',
  gold_factory: 'Commercial Area',
  custom_house: 'Commercial Area',
  financial_center: 'Commercial Area',
  
  // Knowledge Area
  school: 'Knowledge Area',
  eureka_halls_b: 'Knowledge Area',
  hall_of_wisdom: 'Knowledge Area',
  library_of_theresmore: 'Knowledge Area',
  mage_academy_b: 'Knowledge Area',
  university: 'Knowledge Area',
  archeological_dig: 'Knowledge Area',
  statue_atamar: 'Knowledge Area',
  statue_firio: 'Knowledge Area',
  statue_lurezia: 'Knowledge Area',
  library_souls: 'Knowledge Area',
  books: 'Knowledge Area',
  souls: 'Knowledge Area',
  observatory: 'Knowledge Area',
  highschool_magic_b: 'Knowledge Area',
  research_plant: 'Knowledge Area',
  island_outpost: 'Knowledge Area',
  elf_encampment: 'Knowledge Area',
  sanctum_healing: 'Knowledge Area',
  healing_chambers: 'Knowledge Area',
  regenerative_gardens: 'Knowledge Area',
  arcane_school: 'Knowledge Area',
  light_shrine: 'Knowledge Area',
  arcane_shrine: 'Knowledge Area',
  evil_shrine: 'Knowledge Area',
  
  // Army and Defense
  palisade: 'Army and Defense',
  palisade_unit: 'Army and Defense',
  wall: 'Army and Defense',
  wall_unit: 'Army and Defense',
  rampart: 'Army and Defense',
  rampart_unit: 'Army and Defense',
  titanic_walls: 'Army and Defense',
  titanic_walls_part: 'Army and Defense',
  barracks: 'Army and Defense',
  underground_tunnel_b: 'Army and Defense',
  boot_camp: 'Army and Defense',
  castrum_militia: 'Army and Defense',
  recruit_training_center: 'Army and Defense',
  mercenary_outpost: 'Army and Defense',
  watchman_outpost: 'Army and Defense',
  natronite_baloon: 'Army and Defense',
  ballista: 'Army and Defense',
  siege_workshop: 'Army and Defense',
  magical_tower: 'Army and Defense',
  minefield: 'Army and Defense',
  military_academy: 'Army and Defense',
  ministry_war: 'Army and Defense',
  magic_workshop_b: 'Army and Defense',
  officer_training_ground: 'Army and Defense',
  artillery_firing: 'Army and Defense',
  natronite_shield: 'Army and Defense',
  magic_stable_b: 'Army and Defense',
  soulstealer_citadel: 'Army and Defense',
  trench: 'Army and Defense',
  military_camp: 'Army and Defense',
  stronghold: 'Army and Defense',
  colony_recruiting_camp: 'Army and Defense',
  abyss_outpost: 'Army and Defense',
  light_turret: 'Army and Defense',
  probe_system: 'Army and Defense',
  mercenary_camp: 'Army and Defense',
  enhanced_barracks: 'Army and Defense',
  artillery_officer_b: 'Army and Defense',
  
  // Faith and Magic
  harvest_shrine: 'Faith and Magic',
  war_shrine: 'Faith and Magic',
  mind_shrine: 'Faith and Magic',
  temple: 'Faith and Magic',
  oracle_b: 'Faith and Magic',
  fate_shrine_b: 'Faith and Magic',
  altar_of_sacrifices: 'Faith and Magic',
  magic_circle: 'Faith and Magic',
  monastery: 'Faith and Magic',
  fortune_grove: 'Faith and Magic',
  mana_fields_b: 'Faith and Magic',
  pillars_of_mana: 'Faith and Magic',
  glory_gods: 'Faith and Magic',
  matter_transmuter: 'Faith and Magic',
  ministry_worship: 'Faith and Magic',
  conclave: 'Faith and Magic',
  reactivate_portal: 'Faith and Magic',
  reactivate_portal_decryption: 'Faith and Magic',
  mausoleum_gods: 'Faith and Magic',
  spiritual_garden: 'Faith and Magic',
  fountain_prosperity: 'Faith and Magic',
  mana_reactor: 'Faith and Magic',
  mana_factory: 'Faith and Magic',
  pilgrim_camp: 'Faith and Magic',
  church_old_gods: 'Faith and Magic',
  mana_extractors: 'Faith and Magic',
  mana_maker_b: 'Faith and Magic',
  mana_battery: 'Faith and Magic',
  angel_palace_b: 'Faith and Magic',
  
  // Storage
  store: 'Storage',
  ancient_vault: 'Storage',
  large_warehouse: 'Storage',
  storage_facility: 'Storage',
  guarded_storehouse: 'Storage',
  guarded_facility: 'Storage',
  natronite_depot: 'Storage',
  logistic_center: 'Storage',
  shed: 'Storage',
  large_shed: 'Storage',
  containment_cell: 'Storage',
  underground_store: 'Storage',
  launch_silos: 'Storage',
};

const CATEGORY_ORDER = [
  'Living Quarter',
  'Producing and Crafting',
  'Wonder',
  'Commercial Area',
  'Knowledge Area',
  'Army and Defense',
  'Faith and Magic',
  'Storage'
];

interface BuildingWithCategory extends ProcessedBuilding {
  category: string;
}

function categorizeBuildings(buildings: ProcessedBuilding[]): Record<string, BuildingWithCategory[]> {
  const categorized: Record<string, BuildingWithCategory[]> = {};
  
  // Initialize categories
  CATEGORY_ORDER.forEach(cat => {
    categorized[cat] = [];
  });
  
  // Categorize buildings
  buildings.forEach(building => {
    const category = BUILDING_CATEGORIES[building.id] || 'Producing and Crafting';
    if (!categorized[category]) {
      categorized[category] = [];
    }
    categorized[category].push({ ...building, category });
  });
  
  // Sort each category by count descending
  Object.keys(categorized).forEach(cat => {
    categorized[cat].sort((a, b) => b.count - a.count);
  });
  
  return categorized;
}

export default function BuildingsChart({ data }: BuildingsChartProps) {
  const categorizedBuildings = categorizeBuildings(data);

  return (
    <div className="space-y-4">
      {CATEGORY_ORDER.map(category => {
        const buildings = categorizedBuildings[category];
        if (buildings.length === 0) return null;
        
        return (
          <div key={category}>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {buildings.map(building => (
                <span 
                  key={building.id} 
                  className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-sm"
                >
                  <span className="font-medium text-gray-800">{building.name}</span>
                  <span className="ml-1 text-gray-500">({building.count})</span>
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
