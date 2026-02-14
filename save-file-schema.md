# Theresmore Save File Schema

## Overview

The Theresmore save file is a JSON array with 7 main elements that store comprehensive game state information.

## Schema Structure

```typescript
type SaveFile = [
  string,              // Version number
  GameData,           // Main game data object
  BuildingHistory[],  // Building construction history
  Statistic[],        // Player statistics
  ItemHistory[],      // Item acquisition history
  BattleLog[],        // Combat history log
  unknown             // Additional data (type varies)
];
```

## Detailed Schema

### 1. Version Number (Index 0)
**Type:** `string`  
**Example:** `"0.63"`

### 2. GameData (Index 1)
**Type:** `object`  

#### Fields:
- `caps`: Object mapping resource/population type names to numeric IDs
- `resources`: Object mapping resource type names to numeric IDs
- `buildings`: Object mapping building type names to numeric IDs
- `population`: Object mapping population/profession type names to numeric IDs
- `techs`: Object mapping technology type names to numeric IDs
- `modifiers`: Object mapping modifier type names to numeric IDs
- `factions`: Object mapping faction type names to numeric IDs
- `armyCards`: Object mapping army card type names to numeric IDs
- `items`: Object mapping item type names to numeric IDs
- `prayers`: Object mapping prayer type names to numeric IDs
- `quests`: Object mapping quest type names to numeric IDs
- `spells`: Object mapping spell type names to numeric IDs
- `monsters`: Object mapping monster type names to numeric IDs
- `enemies`: Object mapping enemy type names to numeric IDs
- `achievements`: Object mapping achievement type names to numeric IDs
- `armies`: Object containing army composition data
- `resourcesValues`: Array containing current resource values
- `buildingsValues`: Array containing current building counts
- `techsValues`: Array containing unlocked technologies
- `modifiersValues`: Array containing active modifiers
- `factionsValues`: Array containing faction reputation values
- `questsValues`: Array containing active quests
- `prayersValues`: Array containing active prayers
- `spells`: Array containing available spells
- `rewards`: Array containing pending rewards
- `flag`: Numeric flag value
- `flagb`: Numeric flag value
- `flagd`: Numeric flag value
- `dfc`: Numeric value
- `boss`: Current boss information
- `donation`: Donation count

### 3. BuildingHistory (Index 2)
**Type:** `BuildingRecord[]`

```typescript
interface BuildingRecord {
  id: string;
  parent: string;
  date: number;  // Unix timestamp
}
```

### 4. Statistics (Index 3)
**Type:** `Statistic[]`

```typescript
interface Statistic {
  id: string;
  value: number;
}
```

**Common Statistic IDs:**
- `research`: Research points
- `cap_food`: Food capacity
- `cap_wood`: Wood capacity
- `cap_stone`: Stone capacity
- `fame`: Fame points
- `cap_gold`: Gold capacity
- `scout`: Scout count
- `faith`: Faith points
- `attack`: Attack count
- `kill`: Kill count
- `dead`: Casualty count
- `mana`: Mana points
- `spy`: Spy count
- `reset`: Reset count
- `oracle`: Oracle count
- `ng_bonus`: New game bonus level
- `ng_reset`: New game reset count

### 5. ItemHistory (Index 4)
**Type:** `ItemRecord[]`

```typescript
interface ItemRecord {
  id: string;
  date: number;  // Unix timestamp
}
```

### 6. BattleLog (Index 5)
**Type:** `BattleRecord[]`

```typescript
interface BattleRecord {
  id: string;
  timestamp: number;  // Unix timestamp
  enemyName: string;
  enemyId: string;
  fightType: 'attack' | 'defense';
  victory: 0 | 1;  // 0 = defeat, 1 = victory
  rounds: number;  // Number of rounds fought
  summary: {
    armyCasualties: number;
    enemyCasualties: number;
    armyLosses: Record<string, number>;  // Unit type to count
    enemyLosses: Record<string, number>;  // Unit type to count
    splashUnits: number;
    trampleUnits: number;
  };
  statistics: {
    totalDamageDealt: number;
    splashDamage: number;
    trampleDamage: number;
    bonusDamage: number;
    attackBreakdown: {
      normal: number;
      splash: number;
      trample: number;
    };
    topDamageDealer: {
      unit: string;
      damage: number;
    };
    combatEventsCount: number;
    detailedRounds: number;
  };
  detailedLog: string[];  // Round-by-round combat description
  starred: boolean;  // Whether battle is marked as important
}
```

### 7. Additional Data (Index 6)
**Type:** `unknown`  
This field contains additional game state information that varies based on game version and player progress.

## Key Data Types

### Resource Types
Resources are referenced by their string names and have corresponding numeric IDs in the `resources` object:
- Basic resources: `wood`, `stone`, `copper`, `iron`, `gold`, `food`, etc.
- Advanced resources: `steel`, `crystal`, `saltpetre`, `natronite`, etc.
- Special resources: `research`, `faith`, `mana`, `tools`, etc.

### Building Types
Buildings are referenced by their string names and have corresponding numeric IDs in the `buildings` object:
- Production buildings: `farm`, `lumberjack_camp`, `quarry`, `mine`, etc.
- Military buildings: `barracks`, `recruit_training_center`, `military_academy`, etc.
- Research buildings: `school`, `university`, `research_plant`, etc.
- Storage buildings: `store`, `large_warehouse`, `guarded_storehouse`, etc.
- Defensive buildings: `palisade`, `wall`, `rampart`, `watchman_outpost`, etc.

### Unit Types
Military units are referenced in battle logs by string names:
- `shieldbearer`, `warrior`, `priest`, `archer`, `commander`
- `kobold`, `minotaur`, `dragon`, `elemental`, `demon`, etc.

### Technology Types
Technologies are referenced by string names in the `techs` object and include:
- Production upgrades
- Military upgrades
- Research improvements
- Building unlocks
- Resource bonuses

## File Storage

The save file is encoded using LZString compression and stored as a Base64 encoded string in a text file. The typical file format is:
`Theresmore_YYYY-MM-DD_HH-MM-SS.txt`

## Decoding Process

1. Read the Base64 encoded string from the text file
2. Decompress using LZString decompression
3. Parse the resulting JSON string to get the structured data

## Example Usage

```javascript
// Decode save file
import fs from 'fs';
import LZString from 'lz-string';

const encoded = fs.readFileSync('Theresmore_2026-02-14_17-23-48.txt', 'utf8').trim();
const decompressed = LZString.decompressFromBase64(encoded);
const saveData = JSON.parse(decompressed);

// Access version number
console.log('Version:', saveData[0]);

// Access resources
console.log('Resources:', saveData[1].resourcesValues);

// Access statistics
console.log('Statistics:', saveData[3]);

// Access battle log
console.log('Battle Log:', saveData[5]);
```
