/**
 * 4:20 SOMEWHERE - Main App Component
 *
 * This is the heart of the app! It:
 * 1. Shows which city currently has (or most recently had) 4:20 PM
 * 2. Displays a fun fact about that city
 * 3. Shows a countdown to the next 4:20 somewhere
 * 4. Sends a push notification when a new city hits 4:20 PM
 *
 * HOW REACT NATIVE WORKS (for beginners):
 * - React Native uses "components" to build the UI
 * - Components are like building blocks - they can contain other components
 * - We use "state" to store data that can change (like the countdown)
 * - When state changes, React automatically updates the screen
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  AppState,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import our custom utilities and services
import {
  findCurrent420City,
  findNext420City,
  formatCountdown,
  getMostRecent420City,
  getRandomFunFact,
} from './utils/timezoneUtils';
import {
  requestNotificationPermissions,
  send420Notification,
  addNotificationReceivedListener,
  addNotificationResponseListener,
} from './services/notifications';

/**
 * Main App Component
 *
 * This is the main component that gets rendered on screen.
 * Everything you see in the app comes from here!
 */
export default function App() {
  // ============================================
  // STATE VARIABLES
  // ============================================
  // useState is how React tracks data that can change
  // When these values change, the screen updates automatically

  // The city currently (or most recently) at 4:20 PM
  const [currentCity, setCurrentCity] = useState(null);

  // A fun fact about the current city
  const [currentFact, setCurrentFact] = useState('');

  // The next city to hit 4:20 PM
  const [nextCity, setNextCity] = useState(null);

  // Seconds until the next 4:20 (for the countdown)
  const [countdown, setCountdown] = useState(0);

  // Whether we have permission to send notifications
  const [notificationPermission, setNotificationPermission] = useState(false);

  // Whether we're currently in a 4:20 minute (for special styling)
  const [is420Now, setIs420Now] = useState(false);

  // ============================================
  // REFS (References)
  // ============================================
  // useRef is for values that persist but don't trigger re-renders
  // We use it to track the last city that got a notification

  const lastNotifiedCity = useRef(null);
  const appState = useRef(AppState.currentState);

  // ============================================
  // THE MAIN UPDATE FUNCTION
  // ============================================
  /**
   * Updates all the city and countdown information
   *
   * This function runs every second and:
   * 1. Checks if any city currently has 4:20 PM
   * 2. If yes, shows that city and sends a notification
   * 3. If no, shows the most recent 4:20 city
   * 4. Always updates the countdown to the next 4:20
   *
   * useCallback is an optimization that prevents this function
   * from being recreated unnecessarily
   */
  const updateCityInfo = useCallback(() => {
    // Check if any city currently has 4:20 PM
    const city420Now = findCurrent420City();

    if (city420Now) {
      // YES! A city has 4:20 right now!
      setIs420Now(true);
      setCurrentCity(city420Now);

      // Only send a notification if we haven't already for this city
      // (We check every second, but only want one notification per city)
      if (lastNotifiedCity.current !== city420Now.name) {
        lastNotifiedCity.current = city420Now.name;

        // Get a new random fact for this city
        const fact = getRandomFunFact(city420Now);
        setCurrentFact(fact);

        // Send the push notification if we have permission
        if (notificationPermission) {
          send420Notification(city420Now);
        }
      }
    } else {
      // No city has 4:20 right now
      setIs420Now(false);

      // Show the most recent city that had 4:20
      const recent = getMostRecent420City();
      setCurrentCity(recent.city);
      setCurrentFact(recent.fact);
    }

    // Find the next city and update countdown
    const next = findNext420City();
    setNextCity(next.city);
    setCountdown(next.secondsUntil);
  }, [notificationPermission]);

  // ============================================
  // SETUP EFFECTS (run when app starts)
  // ============================================

  /**
   * Effect 1: Request notification permissions when app starts
   *
   * useEffect runs code when the component "mounts" (appears on screen)
   * The empty array [] means this only runs once, when the app starts
   */
  useEffect(() => {
    async function setupNotifications() {
      const hasPermission = await requestNotificationPermissions();
      setNotificationPermission(hasPermission);
    }
    setupNotifications();
  }, []);

  /**
   * Effect 2: Set up the update timer
   *
   * This creates an interval that runs updateCityInfo every second
   * We also listen for when the app comes back from the background
   */
  useEffect(() => {
    // Run immediately when the app starts
    updateCityInfo();

    // Then run every second (1000 milliseconds)
    const intervalId = setInterval(updateCityInfo, 1000);

    // Listen for app state changes (background/foreground)
    const appStateSubscription = AppState.addEventListener('change', (nextAppState) => {
      // If app is coming back to foreground, update immediately
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        updateCityInfo();
      }
      appState.current = nextAppState;
    });

    // Cleanup function - runs when component unmounts
    // This prevents memory leaks
    return () => {
      clearInterval(intervalId);
      appStateSubscription.remove();
    };
  }, [updateCityInfo]);

  /**
   * Effect 3: Set up notification listeners
   *
   * These let us react when notifications are received or tapped
   */
  useEffect(() => {
    // When a notification is received while app is open
    const receivedListener = addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    // When user taps on a notification
    const responseListener = addNotificationResponseListener((response) => {
      console.log('Notification tapped:', response);
    });

    // Cleanup listeners when component unmounts
    return () => {
      receivedListener();
      responseListener();
    };
  }, []);

  // ============================================
  // RENDER THE UI
  // ============================================
  /**
   * The return statement contains JSX - a mix of JavaScript and HTML-like syntax
   * This defines what appears on screen
   *
   * COMMON REACT NATIVE COMPONENTS:
   * - View: Like a <div> in web - a container for other elements
   * - Text: Displays text (you MUST use Text for any text in React Native)
   * - SafeAreaView: Adds padding for notches on modern phones
   * - ScrollView: Makes content scrollable
   * - TouchableOpacity: A button that dims when pressed
   */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ========== HEADER ========== */}
        <View style={styles.header}>
          <Text style={styles.emoji}>
            {is420Now ? '🎉' : '🌿'}
          </Text>
          <Text style={styles.title}>It's 4:20 Somewhere</Text>
          <Text style={styles.subtitle}>
            {is420Now ? "IT'S HAPPENING NOW!" : 'Around the world, every hour'}
          </Text>
        </View>

        {/* ========== CURRENT CITY CARD ========== */}
        <View style={[styles.card, is420Now && styles.cardHighlight]}>
          <Text style={styles.cardLabel}>
            {is420Now ? '🔥 RIGHT NOW 🔥' : 'Most Recent'}
          </Text>

          {currentCity ? (
            <>
              <Text style={styles.cityName}>{currentCity.name}</Text>
              <Text style={styles.countryName}>{currentCity.country}</Text>

              {/* Fun Fact Box */}
              <View style={styles.factBox}>
                <Text style={styles.factLabel}>Fun Fact:</Text>
                <Text style={styles.factText}>{currentFact}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>Finding cities...</Text>
          )}
        </View>

        {/* ========== COUNTDOWN CARD ========== */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Next 4:20</Text>

          {nextCity ? (
            <>
              <Text style={styles.countdownTime}>
                {formatCountdown(countdown)}
              </Text>
              <Text style={styles.countdownLabel}>
                until 4:20 PM in
              </Text>
              <Text style={styles.nextCityName}>
                {nextCity.name}, {nextCity.country}
              </Text>
            </>
          ) : (
            <Text style={styles.loadingText}>Calculating...</Text>
          )}
        </View>

        {/* ========== INFO SECTION ========== */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            This app tracks 4:20 PM across 24 cities around the world.
            Every hour (give or take), it's 4:20 somewhere new!
          </Text>

          {/* Notification Status */}
          <View style={styles.notificationStatus}>
            <Text style={styles.notificationIcon}>
              {notificationPermission ? '🔔' : '🔕'}
            </Text>
            <Text style={styles.notificationText}>
              {notificationPermission
                ? 'Notifications enabled'
                : 'Notifications disabled'}
            </Text>
          </View>
        </View>

        {/* ========== FOOTER ========== */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with 💚 for learning React Native
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================
// STYLES
// ============================================
/**
 * StyleSheet.create() is how we style components in React Native
 *
 * It's similar to CSS but:
 * - Uses camelCase (backgroundColor instead of background-color)
 * - Values are usually numbers (no 'px' needed)
 * - Flexbox is the default layout system
 *
 * TIPS FOR BEGINNERS:
 * - flex: 1 makes a component fill available space
 * - alignItems centers children horizontally
 * - justifyContent centers children vertically
 * - padding adds space inside the component
 * - margin adds space outside the component
 */
const styles = StyleSheet.create({
  // Main container - fills the whole screen
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e', // Dark purple-blue background
  },

  // ScrollView content container
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },

  // ========== HEADER STYLES ==========
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    marginTop: 5,
    textAlign: 'center',
  },

  // ========== CARD STYLES ==========
  card: {
    backgroundColor: '#16213e', // Slightly lighter than background
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 8,
  },
  cardHighlight: {
    // Special styling when it's currently 4:20
    backgroundColor: '#1e3a2f', // Greenish tint
    borderWidth: 2,
    borderColor: '#4CAF50', // Green border
  },
  cardLabel: {
    fontSize: 14,
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 15,
  },

  // ========== CITY DISPLAY STYLES ==========
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  countryName: {
    fontSize: 18,
    color: '#4CAF50', // Green accent
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },

  // ========== FUN FACT STYLES ==========
  factBox: {
    backgroundColor: '#0f0f23', // Darker background
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  factLabel: {
    fontSize: 12,
    color: '#4CAF50',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  factText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },

  // ========== COUNTDOWN STYLES ==========
  countdownTime: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#4CAF50', // Green
    textAlign: 'center',
    fontVariant: ['tabular-nums'], // Monospace numbers for smooth countdown
  },
  countdownLabel: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 10,
  },
  nextCityName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 5,
  },

  // ========== INFO SECTION STYLES ==========
  infoSection: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 22,
  },

  // ========== NOTIFICATION STATUS ==========
  notificationStatus: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#2a2a4a',
  },
  notificationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  notificationText: {
    fontSize: 14,
    color: '#a0a0a0',
  },

  // ========== FOOTER STYLES ==========
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#555555',
  },

  // ========== LOADING STATE ==========
  loadingText: {
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
  },
});
