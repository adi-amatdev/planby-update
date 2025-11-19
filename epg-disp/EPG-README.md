# EPG Application

## Quick Start

1. **Run the application:**
   ```bash
   npm run dev
   ```

2. **Update EPG times to current time (to see live bar):**
   ```bash
   npm run update-epg
   ```

## Features

- **5 Channels**: CNN, BBC News, ESPN, Discovery, National Geographic
- **Live Bar**: Shows current time indicator when programs are scheduled around current time
- **Dark/Light Theme**: Automatic theme switching
- **Responsive Design**: Works on different screen sizes

## Usage

- The EPG shows mock data by default
- Run `npm run update-epg` whenever you want to refresh the program times to current system time
- This will make the live bar visible and show which programs are currently "on air"
- Programs are scheduled ±2 hours around current time for testing

## Program Schedule

Each channel has 4 programs scheduled:
- 2 hours ago → 1 hour ago → Current time → 2 hours from now

This ensures you can always see the live indicator and test the EPG functionality.


# ###########################
✅ PART 2 — PATCH PLANBY so that nowDate finally works correctly This is the real fix inside the library. Planby internally ignores your nowDate because it hard-codes: const currentTime = DateTime.local() inside timeline, epg, and useLayout. 


To patch it, here is the exact modification required. 🔧 PATCH: Modify Planby source so nowDate is respected You need to edit the following file: node_modules/planby/lib/hooks/useTimeline.js (or in TS version: src/hooks/useTimeline.ts


) Find this: const getCurrentTime = () => DateTime.local() Replace with: const getCurrentTime = (overrideNow) => {   if (overrideNow) {     return DateTime.fromJSDate(overrideNow);   }   return DateTime.local(); }; Then update the usage: Original: const currentTime = getCurrentTime(); Replace with: const currentTime = getCurrentTime(props.nowDate);


 🟩 PATCH 2 — Fix useEpg() to pass nowDate down into timeline Open: node_modules/planby/lib/hooks/useEpg.js Find where the timeline is created: const timeline = useTimeline({   startDate,   endDate,   hourWidth,   dayWidth, }); Replace with: const timeline = useTimeline({   startDate,   endDate,   hourWidth,   dayWidth,   nowDate: props.nowDate,   // NEW}); 
 
 
 🟩 PATCH 3 — Propagate nowDate through Layout internal props Open: node_modules/planby/lib/components/Layout.js Find: const timelineProps = useTimeline({...}) Ensure nowDate is passed: const timelineProps = useTimeline({   startDate,   endDate,   hourWidth,   dayWidth,   nowDate: props.nowDate, }); 
 
 
 
 🟩 PATCH 4 — Expose nowDate at <Epg> level Open: node_modules/planby/lib/components/Epg.js Add: nowDate: PropTypes.instanceOf(Date) And inside Epg render: <Layout   {...layoutProps}    nowDate={props.nowDate}     // <-- add this/> 
 
 
 
 🟢 END RESULT OF PATCH After patching: useEpg({   ...   nowDate: new Date(2025, 9, 27, 14, 05), }) ➡️ Planby will render the live red line EXACTLY at that time ➡️ It will auto-update when you update the nowDate state
