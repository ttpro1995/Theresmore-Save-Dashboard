# Work Log: Theresmore Save File Schema

## Date: 2026-02-14

## Task
Provide a schema of the saved file (the JSON after decode) based on the example data file `example-data/Theresmore_2026-02-14_17-23-48.txt` and the decoder in `save-decoder.js`.

## Completed Work

### 1. Analyzed the Save File Structure
- Created a Node.js script to decode the save file using LZString decompression
- Successfully decoded the example save file from Base64 + LZString compression
- Identified the complete structure of the save file

### 2. Created Save File Schema Documentation
- Created `save-file-schema.md` with comprehensive documentation of the save file format
- Documented all 7 main elements of the save array:
  1. Version number (string)
  2. GameData object with index mappings and values
  3. Building history array
  4. Statistics array
  5. Item history array
  6. Battle log array
  7. Additional unknown data

### 3. Updated TypeScript Types
- Updated `src/types/index.ts` with the correct save file structure:
  - Changed `SaveFileData` type from 3 elements to 7 elements
  - Added new interfaces: `BuildingRecord`, `Statistic`, `ItemRecord`, `BattleRecord`
  - Updated `GameDataSection` with correct field names from the actual save data
  - Fixed duplicate `spells` property issue by renaming to `spellsIndex`

## Key Findings

### Save File Structure
The Theresmore save file is a JSON array with 7 elements:
```typescript
type SaveFile = [
  string,              // Version number (e.g., "0.63")
  GameDataSection,     // Main game data with index mappings
  BuildingHistory[],    // Building construction history
  Statistic[],         // Player statistics
  ItemRecord[],        // Item acquisition history
  BattleRecord[],      // Combat history log
  unknown              // Additional data
];
```

### Encoding Method
- Uses LZString compression
- Then encoded as Base64
- Stored in `.txt` files with naming pattern `Theresmore_YYYY-MM-DD_HH-MM-SS.txt`

## Files Created/Modified
- Created: `save-file-schema.md` - Complete schema documentation
- Modified: `src/types/index.ts` - Updated TypeScript types to match actual save file structure

## Notes
- The decoder in `save-decoder.js` first tries LZString decompression, then falls back to plain Base64 if that fails
- The GameDataSection contains both index mappings (like `resources`, `buildings`, `techs` etc.) and their corresponding values (like `resourcesValues`, `buildingsValues`, `techsValues`)
- Battle records contain detailed combat statistics including damage breakdowns, unit losses, and round-by-round logs
