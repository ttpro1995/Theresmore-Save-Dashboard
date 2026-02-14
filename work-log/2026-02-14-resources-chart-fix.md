# Resources Chart Fix - 2026-02-14

## Task
- Remove bar chart from Resources section (Charts)
- Only show caps (max capacity) instead of current values

## Changes Made

### 1. Updated `src/types/index.ts`
- Added `cap: number` field to `ProcessedResource` interface

### 2. Updated `src/utils/dataExtractors.ts`
- Modified `extractResources()` function to extract cap values from `data.caps`
- Added capsMap to store cap values and include them in processed resources

### 3. Updated `src/components/ResourcesChart.tsx`
- Removed bar chart visualization (recharts)
- Replaced with a simple table showing only resource caps (max capacity)
- Table displays resource name and max capacity value
- Only shows resources that have a cap > 0
- Added fallback message when no caps are available
