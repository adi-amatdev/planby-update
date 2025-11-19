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