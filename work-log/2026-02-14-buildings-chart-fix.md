# Buildings Chart Category Fix - 2026-02-14

## Task
Fix the "Top Buildings" chart in Charts section - buildings were grouped into incorrect categories.

## Problem
The `BUILDING_CATEGORIES` mapping in `src/components/BuildingsChart.tsx` was:
1. **Incomplete** - Many buildings from the reference file were missing
2. **Incorrect** - Several buildings were in wrong categories

## Changes Made
Updated `src/components/BuildingsChart.tsx` with the complete and correct building category mappings based on `plans/building-categories.md`:

### Key Corrections Made:
- `monument`: Wonder → **Living Quarter**
- `city_hall`: Commercial Area → **Living Quarter**
- `ancient_vault`: Wonder → **Storage**
- `library_of_theresmore`: Wonder → **Knowledge Area**
- `valley_of_plenty`: Wonder → **Commercial Area**
- `machines_of_gods`: Wonder → **Producing and Crafting**
- `titan_work_area`: Wonder → **Producing and Crafting**
- `statue_atamar`, `statue_firio`, `statue_lurezia`: Wonder → **Knowledge Area**
- `fortune_grove`: Wonder → **Faith and Magic**
- `oracle_b`: Wonder → **Faith and Magic**
- `magic_circle`: Commercial Area → **Faith and Magic**
- `large_warehouse`: Commercial Area → **Storage**
- `sacred_den_b`: Faith and Magic → **Producing and Crafting**
- `cathedral`, `cathedral_unit`: Faith and Magic → **Wonder**

### Categories Now Properly Supported:
- Living Quarter (17 buildings)
- Producing and Crafting (40 buildings)
- Wonder (56 buildings)
- Commercial Area (15 buildings)
- Knowledge Area (25 buildings)
- Army and Defense (41 buildings)
- Faith and Magic (30 buildings)
- Storage (13 buildings)

## Status
✅ Complete - Buildings are now properly categorized according to the reference file.
