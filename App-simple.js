/**
 * 4:20 SOMEWHERE - Simple Version (No Notifications)
 *
 * This version works immediately in Expo Snack without any extra setup.
 * Just paste and run!
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 24 cities from around the world, one for each major timezone
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

// Gets current time in a timezone
function getTimeInTimezone(timezone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const parts = formatter.format(now).split(':');
    return {
      hours: parseInt(parts[0], 10),
      minutes: parseInt(parts[1], 10),
      seconds: parseInt(parts[2], 10),
    };
  } catch (e) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
}

// Checks if it's 4:20 PM in a timezone
function is420InTimezone(timezone) {
  const { hours, minutes } = getTimeInTimezone(timezone);
  return hours === 16 && minutes === 20;
}

// Finds city where it's currently 4:20 PM
function findCurrent420City() {
  for (const city of cities) {
    if (is420InTimezone(city.timezone)) {
      return city;
    }
  }
  return null;
}

// Calculates seconds until 4:20 PM in a timezone
function secondsUntil420(timezone) {
  const { hours, minutes, seconds } = getTimeInTimezone(timezone);
  const now = hours * 3600 + minutes * 60 + seconds;
  const target = 16 * 3600 + 20 * 60;
  let diff = target - now;
  if (diff <= 0) diff += 86400;
  return diff;
}

// Finds next city to hit 4:20 PM
function findNext420City() {
  let next = null;
  let min = Infinity;
  for (const city of cities) {
    const secs = secondsUntil420(city.timezone);
    if (secs > 0 && secs < min) {
      min = secs;
      next = city;
    }
  }
  return { city: next, secondsUntil: min };
}

// Formats seconds as H:MM:SS
function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Gets random fun fact
function getRandomFact(city) {
  if (!city?.funFacts?.length) return "It's 4:20 somewhere!";
  return city.funFacts[Math.floor(Math.random() * city.funFacts.length)];
}

// Gets most recent 4:20 city
function getMostRecent420City() {
  let recent = null;
  let smallest = Infinity;
  for (const city of cities) {
    const { hours, minutes, seconds } = getTimeInTimezone(city.timezone);
    const now = hours * 3600 + minutes * 60 + seconds;
    const target = 16 * 3600 + 20 * 60;
    if (now >= target) {
      const since = now - target;
      if (since < smallest) {
        smallest = since;
        recent = city;
      }
    }
  }
  return recent || cities[cities.length - 1];
}

// Main App
export default function App() {
  const [currentCity, setCurrentCity] = useState(null);
  const [currentFact, setCurrentFact] = useState('');
  const [nextCity, setNextCity] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [is420Now, setIs420Now] = useState(false);

  useEffect(() => {
    function update() {
      const now420 = findCurrent420City();
      if (now420) {
        setIs420Now(true);
        setCurrentCity(now420);
        setCurrentFact(getRandomFact(now420));
      } else {
        setIs420Now(false);
        const recent = getMostRecent420City();
        setCurrentCity(recent);
        setCurrentFact(getRandomFact(recent));
      }
      const next = findNext420City();
      setNextCity(next.city);
      setCountdown(next.secondsUntil);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <Text style={styles.emoji}>{is420Now ? '🎉' : '🌿'}</Text>
          <Text style={styles.title}>It's 4:20 Somewhere</Text>
          <Text style={styles.subtitle}>
            {is420Now ? "IT'S HAPPENING NOW!" : 'Around the world, every hour'}
          </Text>
        </View>

        <View style={[styles.card, is420Now && styles.cardGreen]}>
          <Text style={styles.label}>
            {is420Now ? '🔥 RIGHT NOW 🔥' : 'MOST RECENT'}
          </Text>
          {currentCity && (
            <>
              <Text style={styles.city}>{currentCity.name}</Text>
              <Text style={styles.country}>{currentCity.country}</Text>
              <View style={styles.factBox}>
                <Text style={styles.factLabel}>FUN FACT</Text>
                <Text style={styles.fact}>{currentFact}</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>NEXT 4:20</Text>
          <Text style={styles.countdown}>{formatTime(countdown)}</Text>
          <Text style={styles.untilText}>until 4:20 PM in</Text>
          {nextCity && (
            <Text style={styles.nextCity}>{nextCity.name}, {nextCity.country}</Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 💚</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scroll: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    color: '#888',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },
  cardGreen: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  label: {
    color: '#888',
    fontSize: 12,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 15,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  country: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 5,
  },
  factBox: {
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  factLabel: {
    color: '#4CAF50',
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 8,
  },
  fact: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  countdown: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  untilText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  nextCity: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    color: '#555',
    fontSize: 12,
  },
});
