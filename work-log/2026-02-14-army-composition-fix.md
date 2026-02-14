# Army Composition Fix - 2026-02-14

## Task
Fix Army Composition component:
- Do not show chart
- Only display troop count of each unit
- Don't need to show away/home

## Changes Made

### Modified: `src/components/ArmyComposition.tsx`
- Removed the BarChart visualization
- Removed recharts imports (BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer)
- Changed to display a simple grid of unit cards showing:
  - Unit name
  - Total troop count (formatted with locale string)
- Each unit now displays in a card format with a clean layout

## Technical Details
- Uses the existing `ProcessedArmyUnit` type from `src/types/index.ts`
- Displays only the `total` property, ignoring `away` and `home` values
- Responsive grid layout (2 columns on mobile, 3 on tablet, 4 on desktop)
- Styled with Tailwind CSS classes for dark mode support
