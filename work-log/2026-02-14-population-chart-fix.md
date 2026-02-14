# Population Chart Fix - 2026-02-14

## Task
Fix the Population distribution chart to show similar to Buildings chart with "Job (current / capacity)" format instead of pie chart.

## Changes Made

### 1. Updated types/index.ts
- Added `capacity` field to `ProcessedPopulation` interface

### 2. Updated utils/dataExtractors.ts  
- Modified `extractPopulation` function to extract capacity data from `data.caps` field
- Added logic to build capsMap from the caps array

### 3. Updated components/PopulationChart.tsx
- Removed pie chart (Recharts)
- Changed to display as tags/chips similar to BuildingsChart
- Now shows "Job (current / capacity)" format

## Example Output
```
Farmer (150 / 200)  Lumberjack (50 / 50)  Miner (30 / 40)  ...
```
