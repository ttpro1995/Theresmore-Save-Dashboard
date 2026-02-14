# Technologies Legacies Display - 2026-02-14

## Task
Show unlocked Legacies in Charts -> Technologies section.

## Implementation

### 1. Types (src/types/index.ts)
- Added `LegacyRecord` interface for legacy data with id and date
- Added `ProcessedLegacy` interface for processed legacy display
- Updated `SaveFileData` type to include legacy array at index 5

### 2. Data Extractors (src/utils/dataExtractors.ts)
- Added `extractLegacies()` function to process legacy records
- Added `formatLegacyName()` helper with proper handling for Roman numerals (I, II, III, etc.)

### 3. Data Display (src/components/DataDisplay.tsx)
- Added `legaciesData` useMemo to extract legacies from parsed save file (index 5)
- Added new section to display unlocked legacies with:
  - Count of unlocked legacies
  - Grid display showing legacy name and unlock date
  - Green styling to indicate unlocked status
  - Checkmark icon for each legacy

## Data Structure
Based on decoded save file analysis:
- Index 0: version string ("0.63")
- Index 1: index mappings object
- Index 2: game data (resources, buildings, techs, etc.)
- Index 3: rewards/achievements array
- Index 4: stats array
- Index 5: **Legacies** array (id, date)

## Example Legacy Data
From the example save file, unlocked legacies include:
- charism
- charism_II
- enhanced_axes
- craftmen
- craftmen_II
- deep_pockets
- and more...
