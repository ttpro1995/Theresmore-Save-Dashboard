# 2026-02-14 - Change Default View to Charts

## Task
Change default view from "Raw" to "Charts" (visualization).

## Changes Made
- Modified `src/contexts/SaveFileContext.tsx` line 30
- Changed `viewMode: 'raw'` to `viewMode: 'visualization'` in the initialSettings

## Result
The application now defaults to the Charts/Visualization view instead of Raw JSON view when loading a save file.
