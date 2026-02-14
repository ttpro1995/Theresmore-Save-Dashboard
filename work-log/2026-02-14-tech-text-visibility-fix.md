# Tech Text Visibility Fix - 2026-02-14

## Issue
In the Technologies section (Charts/Visualization mode), the text (such as "Agriculture") was blending with the background and not visible until highlighted in dark mode.

## Root Cause
In `src/components/TechnologiesGrid.tsx`, line 61, the technology name `<h3>` element was missing dark mode text color classes:
```jsx
// Before (broken):
<h3 className="font-medium text-sm">{tech.name}</h3>
```

The background was set to `dark:bg-green-900` (dark green) for researched technologies, but the text had no dark mode color, causing it to blend with the dark green background.

## Fix Applied
Added `text-gray-900 dark:text-white` to ensure visibility in both light and dark modes:
```jsx
// After (fixed):
<h3 className="font-medium text-sm text-gray-900 dark:text-white">{tech.name}</h3>
```

This ensures:
- Light mode: dark gray text (`text-gray-900`) on light green background (`bg-green-50`)
- Dark mode: white text (`dark:text-white`) on dark green background (`dark:bg-green-900`)

## Files Modified
- `src/components/TechnologiesGrid.tsx` - Line 61

## Status
✅ Fixed and verified with hot module replacement (HMR)
