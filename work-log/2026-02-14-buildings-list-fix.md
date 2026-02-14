# Work Log: Buildings Chart Update

## Date: 2026-02-14

## Task
Changed the "Top Buildings" section from a bar chart to a grouped list view that shows all buildings with their names and counts, organized by category.

## Changes Made

### src/components/BuildingsChart.tsx
- Removed bar chart visualization (Recharts imports)
- Added category mapping for all building types:
  - Living Quarter: common_house, house_workers, mansion, fiefdom
  - Producing and Crafting: farm, lumberjack_camp, quarry, mine, sawmill, foundry, steelworks, carpenter_workshop, artisan_workshop, stable, guild_of_craftsmen
  - Wonder: monument, ancient_vault, library_of_theresmore, valley_of_plenty, machines_of_gods, statue_atamar, statue_firio, statue_lurezia, fortune_grove, titan_work_area, oracle_b
  - Commercial Area: marketplace, canava_trading, store, large_warehouse, grocery, bank, great_fair, great_fair_unit, city_hall, magic_circle, city_center, city_center_unit
  - Knowledge Area: school, university
  - Army and Defense: barracks, palisade, wall, rampart, watchman_outpost, palisade_unit, wall_unit, rampart_unit
  - Faith and Magic: temple, war_shrine, harvest_shrine, mind_shrine, cathedral, cathedral_unit, altar_of_sacrifices, sacred_den_b
  - Storage: guarded_storehouse
- Buildings displayed in inline format (multiple per line) grouped by category
- Each building shows name and count (e.g., "Common House (38)")
- Categories displayed in specified order
- Buildings within each category sorted by count (descending)
