# 4:20 Somewhere

A fun React Native app that tells you which city in the world currently has 4:20 PM, complete with fun facts and push notifications!

## What This App Does

- **Tracks 4:20 PM around the world** - Shows which of 24 cities currently has (or most recently had) 4:20 PM
- **Displays fun facts** - Each city has 2-3 interesting facts that appear when it's their 4:20
- **Countdown timer** - Shows how long until the next 4:20 somewhere
- **Push notifications** - Get notified when a new city hits 4:20 PM

## Project Structure (For Beginners)

```
420somewhere/
├── App.js                    # Main app component (the UI)
├── app.json                  # Expo configuration
├── package.json              # Project dependencies
├── data/
│   └── cities.js            # List of 24 cities with fun facts
├── utils/
│   └── timezoneUtils.js     # Timezone logic (finds 4:20 cities)
├── services/
│   └── notifications.js     # Push notification handling
└── assets/                   # App icons and images
```

## Testing on Your iPad with Expo Go

Since you're on an iPad, here's exactly how to test the app:

### Step 1: Install Expo Go

1. Open the **App Store** on your iPad
2. Search for **"Expo Go"**
3. Download and install the free app

### Step 2: Start the Development Server

On your development machine (where you have the code), run:

```bash
cd 420somewhere
npm start
```

This will show a QR code in your terminal.

### Step 3: Connect Your iPad

**Option A: QR Code (Easiest)**
1. Open the Camera app on your iPad
2. Point it at the QR code in your terminal
3. Tap the notification that appears to open Expo Go

**Option B: Manual Entry**
1. Open Expo Go on your iPad
2. Tap "Enter URL manually"
3. Type the URL shown in your terminal (like `exp://192.168.1.100:8081`)

### Step 4: Grant Notification Permission

When the app first opens, it will ask for permission to send notifications. **Tap "Allow"** to get the full experience!

## Troubleshooting (iPad-Friendly - No Console Needed!)

Since you don't have access to a browser console, here's how to debug:

### The App Won't Load
- Make sure your iPad and development machine are on the **same WiFi network**
- Try shaking your iPad to open the Expo developer menu, then tap "Reload"

### Notifications Don't Work
- Go to iPad Settings > Notifications > Expo Go and make sure notifications are enabled
- Notifications only work on **real devices**, not simulators

### The Screen is Blank
- Shake your iPad to open the developer menu
- Look for any red error screens with messages
- Take a screenshot of any error and share it for help

### Testing Notifications Quickly
Want to see a notification without waiting? Here's a trick:

The app sends notifications when any city hits 4:20 PM. Since we have 24 cities across all timezones, there should be a 4:20 somewhere within the next hour!

If you want to test immediately, you can temporarily change line 102 in `utils/timezoneUtils.js`:
```javascript
// Change this:
return hours === 16 && minutes === 20;

// To this (for testing - change back later!):
return hours === 16 && minutes === new Date().getMinutes();
```
This will make "4:20" match the current minute of 4 PM.

## How the Code Works

### The Cities Data (`data/cities.js`)
- Contains 24 cities spanning all major timezones (UTC-12 to UTC+12)
- Each city has a name, country, timezone identifier, and fun facts
- Timezones use IANA format (like "America/New_York")

### The Timezone Logic (`utils/timezoneUtils.js`)
- `getTimeInTimezone()` - Gets current time in any timezone
- `is420InTimezone()` - Checks if it's 4:20 PM in a specific timezone
- `findCurrent420City()` - Finds which city has 4:20 right now
- `findNext420City()` - Calculates which city is next and when
- `formatCountdown()` - Formats seconds into "H:MM:SS" display

### The Notifications (`services/notifications.js`)
- `requestNotificationPermissions()` - Asks user for permission
- `send420Notification()` - Sends a notification with city name and fun fact
- Notifications work even when the app is in the background!

### The Main App (`App.js`)
- Uses React hooks (`useState`, `useEffect`) to manage state
- Checks for 4:20 cities every second
- Updates the countdown in real-time
- Sends notifications only once per city (not every second)

## Key Concepts Explained

### What is State?
State is data that can change over time. When state changes, React automatically updates the screen. We use `useState` to create state variables.

### What is useEffect?
`useEffect` runs code at specific times:
- When the component first appears (empty dependency array `[]`)
- When certain values change (values in the dependency array)
- We use it to set up timers and request permissions

### What is a Timezone?
A timezone is a region that shares the same time. When it's 4:20 PM in New York, it's a different time in Tokyo. We use JavaScript's `Intl.DateTimeFormat` to get the time in any timezone.

## Building for Production

When you're ready to publish your app:

```bash
# Create a build for iOS
npx expo build:ios

# Create a build for Android
npx expo build:android
```

Or use EAS Build for the modern approach:
```bash
npx eas build --platform ios
npx eas build --platform android
```

## Dependencies

- **expo** - The framework that makes React Native easier
- **expo-notifications** - For push notifications
- **expo-device** - To detect if running on a real device
- **expo-constants** - For app configuration values

## License

MIT - Feel free to use this code however you like!

---

**Happy coding!** If you have questions, remember: every expert was once a beginner. Keep experimenting and learning!
