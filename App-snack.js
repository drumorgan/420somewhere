/**
 * 4:20 SOMEWHERE - Expo Snack Version
 *
 * This is a single-file version of the app that works in Expo Snack.
 * All the code (cities, timezone logic, notifications, UI) is combined here.
 *
 * HOW TO USE IN EXPO SNACK:
 * 1. Go to https://snack.expo.dev on your iPad
 * 2. Delete everything in App.js
 * 3. Paste this entire file
 * 4. Tap "Run" or scan the QR code with Expo Go
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// ============================================
// CITIES DATA
// ============================================
// 24 cities from around the world, one for each major timezone
// Each has fun facts that display when it's their 4:20 PM

const cities = [
  {
    name: "Baker Island",
    country: "US Territory",
    timezone: "Etc/GMT+12",
    funFacts: [
      "Baker Island is uninhabited and has no permanent population",
      "It's one of the last places on Earth to see each new day",
      "The island is a wildlife refuge home to seabirds and sea turtles"
    ]
  },
  {
    name: "Pago Pago",
    country: "American Samoa",
    timezone: "Pacific/Pago_Pago",
    funFacts: [
      "Pago Pago has one of the deepest natural harbors in the South Pacific",
      "The name is pronounced 'Pango Pango' - the 'g' is silent!",
      "It receives over 5 meters (200 inches) of rain per year"
    ]
  },
  {
    name: "Honolulu",
    country: "USA",
    timezone: "Pacific/Honolulu",
    funFacts: [
      "Honolulu means 'sheltered harbor' in Hawaiian",
      "It's the only US state capital with a royal palace",
      "The city has hosted the Pro Bowl almost every year since 1980"
    ]
  },
  {
    name: "Anchorage",
    country: "USA",
    timezone: "America/Anchorage",
    funFacts: [
      "Anchorage receives over 19 hours of daylight during summer",
      "About 40% of Alaska's population lives in Anchorage",
      "Moose outnumber people in some Anchorage neighborhoods"
    ]
  },
  {
    name: "Los Angeles",
    country: "USA",
    timezone: "America/Los_Angeles",
    funFacts: [
      "LA's full Spanish name has 55 characters!",
      "The Hollywood sign originally said 'Hollywoodland' in 1923",
      "LA has more museums per capita than any other US city"
    ]
  },
  {
    name: "Denver",
    country: "USA",
    timezone: "America/Denver",
    funFacts: [
      "Denver is exactly one mile above sea level (5,280 feet)",
      "The State Capitol's 13th step is exactly one mile high",
      "Denver has 300 days of sunshine per year!"
    ]
  },
  {
    name: "Chicago",
    country: "USA",
    timezone: "America/Chicago",
    funFacts: [
      "Chicago reversed the flow of its river using engineering in 1900",
      "The first Ferris wheel debuted at Chicago's 1893 World's Fair",
      "Deep-dish pizza was invented in Chicago in 1943"
    ]
  },
  {
    name: "New York",
    country: "USA",
    timezone: "America/New_York",
    funFacts: [
      "New York City has 520 miles of subway track",
      "Over 800 languages are spoken in NYC - most in the world!",
      "Central Park is larger than the country of Monaco"
    ]
  },
  {
    name: "Halifax",
    country: "Canada",
    timezone: "America/Halifax",
    funFacts: [
      "Halifax sent aid to Boston after the 1917 explosion disaster",
      "Boston sends Halifax a Christmas tree every year in thanks",
      "The Titanic victims were brought to Halifax after the sinking"
    ]
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    timezone: "America/Argentina/Buenos_Aires",
    funFacts: [
      "Buenos Aires has the widest avenue in the world",
      "Tango was born in Buenos Aires neighborhoods",
      "The city has more bookstores per capita than any other"
    ]
  },
  {
    name: "South Georgia",
    country: "British Territory",
    timezone: "Atlantic/South_Georgia",
    funFacts: [
      "South Georgia is home to millions of penguins",
      "Explorer Ernest Shackleton is buried on the island",
      "There are no permanent residents, only researchers"
    ]
  },
  {
    name: "Praia",
    country: "Cape Verde",
    timezone: "Atlantic/Cape_Verde",
    funFacts: [
      "Cape Verde was uninhabited until Portuguese arrived in 1456",
      "The islands are named after a peninsula in Senegal",
      "Cesaria Evora, the 'Barefoot Diva,' was from Cape Verde"
    ]
  },
  {
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    funFacts: [
      "Big Ben is actually the name of the bell, not the tower",
      "London has over 170 museums, many of which are free",
      "The London Underground is the oldest metro system (1863)"
    ]
  },
  {
    name: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    funFacts: [
      "The Eiffel Tower was meant to be temporary",
      "Paris has only one stop sign in the entire city",
      "The Louvre would take 200 days to see every artwork for 30 seconds"
    ]
  },
  {
    name: "Cairo",
    country: "Egypt",
    timezone: "Africa/Cairo",
    funFacts: [
      "The Great Pyramid was the tallest structure for 3,800 years",
      "Cairo is the largest city in the Arab world",
      "The city is called 'The City of a Thousand Minarets'"
    ]
  },
  {
    name: "Moscow",
    country: "Russia",
    timezone: "Europe/Moscow",
    funFacts: [
      "Moscow's metro stations are nicknamed 'underground palaces'",
      "The Kremlin is the largest medieval fortress in the world",
      "Moscow has more billionaires than almost any city"
    ]
  },
  {
    name: "Dubai",
    country: "UAE",
    timezone: "Asia/Dubai",
    funFacts: [
      "The Burj Khalifa spans 3 different temperature zones",
      "Dubai's police fleet includes Lamborghinis and Ferraris",
      "There are no income taxes in Dubai"
    ]
  },
  {
    name: "Karachi",
    country: "Pakistan",
    timezone: "Asia/Karachi",
    funFacts: [
      "Karachi is one of the world's largest cities",
      "The city was once a small fishing village called 'Kolachi'",
      "Karachi's port handles 95% of Pakistan's foreign trade"
    ]
  },
  {
    name: "Mumbai",
    country: "India",
    timezone: "Asia/Kolkata",
    funFacts: [
      "Mumbai produces more films per year than Hollywood",
      "The city was built on seven islands now connected",
      "Mumbai's dabbawalas deliver 200,000 lunches daily!"
    ]
  },
  {
    name: "Dhaka",
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
    funFacts: [
      "Dhaka has 400,000 rickshaws - 'City of Rickshaws'",
      "It's one of the most densely populated cities",
      "Bangladesh produces most of the world's clothing"
    ]
  },
  {
    name: "Bangkok",
    country: "Thailand",
    timezone: "Asia/Bangkok",
    funFacts: [
      "Bangkok's full ceremonial name has 169 characters!",
      "The city has over 400 Buddhist temples",
      "Bangkok was called the 'Venice of the East' for its canals"
    ]
  },
  {
    name: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
    funFacts: [
      "Chewing gum has been banned in Singapore since 1992",
      "Singapore is one of only three surviving city-states",
      "Changi Airport has been voted best airport for years"
    ]
  },
  {
    name: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    funFacts: [
      "Shibuya Crossing sees 2,500 people cross per light change",
      "Japan has more vending machines than New Zealand has people",
      "Tokyo has the most Michelin-starred restaurants in the world"
    ]
  },
  {
    name: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
    funFacts: [
      "The Sydney Opera House has over 1 million roof tiles",
      "Sydney Harbour Bridge is nicknamed 'The Coathanger'",
      "Sydney is larger in area than LA and London combined"
    ]
  },
  {
    name: "Auckland",
    country: "New Zealand",
    timezone: "Pacific/Auckland",
    funFacts: [
      "Auckland is built on 50 volcanic cones",
      "It's the 'City of Sails' - more boats per capita than anywhere",
      "Auckland was New Zealand's capital until 1865"
    ]
  }
];

// ============================================
// TIMEZONE UTILITIES
// ============================================

// Gets the current hour, minute, second in a specific timezone
function getTimeInTimezone(timezone) {
  const now = new Date();
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const timeString = formatter.format(now);
    const parts = timeString.split(':');
    return {
      hours: parseInt(parts[0], 10),
      minutes: parseInt(parts[1], 10),
      seconds: parseInt(parts[2], 10),
    };
  } catch (e) {
    // Fallback for any timezone issues
    return { hours: 0, minutes: 0, seconds: 0 };
  }
}

// Checks if it's 4:20 PM (16:20) in a timezone
function is420InTimezone(timezone) {
  const { hours, minutes } = getTimeInTimezone(timezone);
  return hours === 16 && minutes === 20;
}

// Finds the city where it's currently 4:20 PM
function findCurrent420City() {
  for (const city of cities) {
    if (is420InTimezone(city.timezone)) {
      return city;
    }
  }
  return null;
}

// Calculates seconds until 4:20 PM in a timezone
function secondsUntil420InTimezone(timezone) {
  const { hours, minutes, seconds } = getTimeInTimezone(timezone);
  const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
  const targetTotalSeconds = 16 * 3600 + 20 * 60; // 4:20 PM

  let diff = targetTotalSeconds - currentTotalSeconds;
  if (diff <= 0) {
    diff += 24 * 3600; // Add 24 hours if already passed
  }
  return diff;
}

// Finds the next city to hit 4:20 PM
function findNext420City() {
  let nextCity = null;
  let minSeconds = Infinity;

  for (const city of cities) {
    const secondsUntil = secondsUntil420InTimezone(city.timezone);
    if (secondsUntil > 0 && secondsUntil < minSeconds) {
      minSeconds = secondsUntil;
      nextCity = city;
    }
  }
  return { city: nextCity, secondsUntil: minSeconds };
}

// Formats seconds as H:MM:SS
function formatCountdown(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const pad = (num) => num.toString().padStart(2, '0');
  return `${hours}:${pad(minutes)}:${pad(seconds)}`;
}

// Gets a random fun fact
function getRandomFunFact(city) {
  if (!city?.funFacts?.length) return "It's 4:20 somewhere!";
  return city.funFacts[Math.floor(Math.random() * city.funFacts.length)];
}

// Gets the most recent city that had 4:20 PM
function getMostRecent420City() {
  let mostRecentCity = null;
  let smallestPastTime = Infinity;

  for (const city of cities) {
    const { hours, minutes, seconds } = getTimeInTimezone(city.timezone);
    const currentSeconds = hours * 3600 + minutes * 60 + seconds;
    const target420Seconds = 16 * 3600 + 20 * 60;

    if (currentSeconds >= target420Seconds) {
      const secondsSince420 = currentSeconds - target420Seconds;
      if (secondsSince420 < smallestPastTime) {
        smallestPastTime = secondsSince420;
        mostRecentCity = city;
      }
    }
  }

  if (!mostRecentCity) {
    mostRecentCity = cities[cities.length - 1];
  }

  return { city: mostRecentCity, fact: getRandomFunFact(mostRecentCity) };
}

// ============================================
// NOTIFICATION SETUP
// ============================================

// Configure notifications to show when app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permission for notifications
async function requestNotificationPermissions() {
  if (!Device.isDevice) {
    // Running in Snack web preview - notifications won't work there
    // but will work in Expo Go app
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('420-alerts', {
      name: '4:20 Alerts',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  return finalStatus === 'granted';
}

// Send a notification
async function send420Notification(city) {
  const randomFact = city.funFacts[Math.floor(Math.random() * city.funFacts.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `It's 4:20 in ${city.name}!`,
      body: randomFact,
    },
    trigger: { seconds: 1 },
  });
}

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function App() {
  const [currentCity, setCurrentCity] = useState(null);
  const [currentFact, setCurrentFact] = useState('');
  const [nextCity, setNextCity] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [is420Now, setIs420Now] = useState(false);

  const lastNotifiedCity = useRef(null);

  // Main update function - runs every second
  const updateCityInfo = useCallback(() => {
    const city420Now = findCurrent420City();

    if (city420Now) {
      setIs420Now(true);
      setCurrentCity(city420Now);

      if (lastNotifiedCity.current !== city420Now.name) {
        lastNotifiedCity.current = city420Now.name;
        const fact = getRandomFunFact(city420Now);
        setCurrentFact(fact);

        if (notificationPermission) {
          send420Notification(city420Now);
        }
      }
    } else {
      setIs420Now(false);
      const recent = getMostRecent420City();
      setCurrentCity(recent.city);
      setCurrentFact(recent.fact);
    }

    const next = findNext420City();
    setNextCity(next.city);
    setCountdown(next.secondsUntil);
  }, [notificationPermission]);

  // Setup notifications on app start
  useEffect(() => {
    requestNotificationPermissions().then(setNotificationPermission);
  }, []);

  // Update every second
  useEffect(() => {
    updateCityInfo();
    const intervalId = setInterval(updateCityInfo, 1000);
    return () => clearInterval(intervalId);
  }, [updateCityInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>{is420Now ? '🎉' : '🌿'}</Text>
          <Text style={styles.title}>It's 4:20 Somewhere</Text>
          <Text style={styles.subtitle}>
            {is420Now ? "IT'S HAPPENING NOW!" : 'Around the world, every hour'}
          </Text>
        </View>

        {/* Current City Card */}
        <View style={[styles.card, is420Now && styles.cardHighlight]}>
          <Text style={styles.cardLabel}>
            {is420Now ? '🔥 RIGHT NOW 🔥' : 'Most Recent'}
          </Text>
          {currentCity ? (
            <>
              <Text style={styles.cityName}>{currentCity.name}</Text>
              <Text style={styles.countryName}>{currentCity.country}</Text>
              <View style={styles.factBox}>
                <Text style={styles.factLabel}>Fun Fact:</Text>
                <Text style={styles.factText}>{currentFact}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>Finding cities...</Text>
          )}
        </View>

        {/* Countdown Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Next 4:20</Text>
          {nextCity ? (
            <>
              <Text style={styles.countdownTime}>{formatCountdown(countdown)}</Text>
              <Text style={styles.countdownLabel}>until 4:20 PM in</Text>
              <Text style={styles.nextCityName}>{nextCity.name}, {nextCity.country}</Text>
            </>
          ) : (
            <Text style={styles.loadingText}>Calculating...</Text>
          )}
        </View>

        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            This app tracks 4:20 PM across 24 cities around the world.
            Every hour, it's 4:20 somewhere new!
          </Text>
          <View style={styles.notificationStatus}>
            <Text style={styles.notificationText}>
              {notificationPermission ? '🔔 Notifications on' : '🔕 Notifications off'}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 💚 for learning React Native</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },
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
  card: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHighlight: {
    backgroundColor: '#1e3a2f',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  cardLabel: {
    fontSize: 14,
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 15,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  countryName: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  factBox: {
    backgroundColor: '#0f0f23',
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
  countdownTime: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
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
  notificationStatus: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#2a2a4a',
  },
  notificationText: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#555555',
  },
  loadingText: {
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
  },
});
