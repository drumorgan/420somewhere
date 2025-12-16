/**
 * 4:20 SOMEWHERE - Ultra Simple Version
 * Works in Expo Snack with zero dependencies
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

// 24 cities around the world
const cities = [
  { name: "Baker Island", country: "US Territory", timezone: "Etc/GMT+12", funFacts: ["Baker Island is uninhabited", "One of the last places to see each new day"] },
  { name: "Honolulu", country: "USA", timezone: "Pacific/Honolulu", funFacts: ["Honolulu means 'sheltered harbor'", "Only US capital with a royal palace"] },
  { name: "Anchorage", country: "USA", timezone: "America/Anchorage", funFacts: ["19 hours of daylight in summer", "Moose outnumber people in some areas"] },
  { name: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", funFacts: ["Hollywood sign said 'Hollywoodland' in 1923", "More museums than any US city"] },
  { name: "Denver", country: "USA", timezone: "America/Denver", funFacts: ["Exactly one mile above sea level", "300 days of sunshine per year"] },
  { name: "Chicago", country: "USA", timezone: "America/Chicago", funFacts: ["Reversed its river flow in 1900", "Deep-dish pizza invented here in 1943"] },
  { name: "New York", country: "USA", timezone: "America/New_York", funFacts: ["520 miles of subway track", "800+ languages spoken - most in world"] },
  { name: "Halifax", country: "Canada", timezone: "America/Halifax", funFacts: ["Boston sends a Christmas tree yearly", "Titanic victims brought here"] },
  { name: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires", funFacts: ["Widest avenue in the world", "Birthplace of Tango"] },
  { name: "London", country: "UK", timezone: "Europe/London", funFacts: ["Big Ben is the bell, not the tower", "Oldest metro system (1863)"] },
  { name: "Paris", country: "France", timezone: "Europe/Paris", funFacts: ["Eiffel Tower was meant to be temporary", "Only one stop sign in the city"] },
  { name: "Cairo", country: "Egypt", timezone: "Africa/Cairo", funFacts: ["Great Pyramid was tallest for 3,800 years", "Largest city in Arab world"] },
  { name: "Moscow", country: "Russia", timezone: "Europe/Moscow", funFacts: ["Metro stations are 'underground palaces'", "Kremlin is largest medieval fortress"] },
  { name: "Dubai", country: "UAE", timezone: "Asia/Dubai", funFacts: ["Burj Khalifa spans 3 temperature zones", "Police drive Lamborghinis"] },
  { name: "Mumbai", country: "India", timezone: "Asia/Kolkata", funFacts: ["Produces more films than Hollywood", "Built on 7 connected islands"] },
  { name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", funFacts: ["Full name has 169 characters", "Over 400 Buddhist temples"] },
  { name: "Singapore", country: "Singapore", timezone: "Asia/Singapore", funFacts: ["Chewing gum banned since 1992", "One of only 3 city-states"] },
  { name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", funFacts: ["Shibuya: 2,500 people per light change", "Most Michelin stars in world"] },
  { name: "Sydney", country: "Australia", timezone: "Australia/Sydney", funFacts: ["Opera House has 1 million roof tiles", "Larger than LA and London combined"] },
  { name: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland", funFacts: ["Built on 50 volcanic cones", "More boats per capita than anywhere"] },
];

function getTimeInTimezone(timezone) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false,
    });
    const parts = formatter.format(new Date()).split(':');
    return { hours: parseInt(parts[0]), minutes: parseInt(parts[1]), seconds: parseInt(parts[2]) };
  } catch (e) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
}

function findCurrent420City() {
  for (const city of cities) {
    const { hours, minutes } = getTimeInTimezone(city.timezone);
    if (hours === 16 && minutes === 20) return city;
  }
  return null;
}

function findNext420City() {
  let next = null, min = 999999;
  for (const city of cities) {
    const { hours, minutes, seconds } = getTimeInTimezone(city.timezone);
    const now = hours * 3600 + minutes * 60 + seconds;
    const target = 16 * 3600 + 20 * 60;
    let diff = target - now;
    if (diff <= 0) diff += 86400;
    if (diff < min) { min = diff; next = city; }
  }
  return { city: next, seconds: min };
}

function formatTime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return h + ':' + String(m).padStart(2,'0') + ':' + String(sec).padStart(2,'0');
}

function getMostRecent() {
  let recent = cities[0], smallest = 999999;
  for (const city of cities) {
    const { hours, minutes, seconds } = getTimeInTimezone(city.timezone);
    const now = hours * 3600 + minutes * 60 + seconds;
    const target = 16 * 3600 + 20 * 60;
    if (now >= target && (now - target) < smallest) {
      smallest = now - target;
      recent = city;
    }
  }
  return recent;
}

export default function App() {
  const [city, setCity] = useState(null);
  const [fact, setFact] = useState('');
  const [next, setNext] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isNow, setIsNow] = useState(false);

  useEffect(() => {
    function update() {
      const now420 = findCurrent420City();
      if (now420) {
        setIsNow(true);
        setCity(now420);
        setFact(now420.funFacts[0]);
      } else {
        setIsNow(false);
        const recent = getMostRecent();
        setCity(recent);
        setFact(recent.funFacts[0]);
      }
      const n = findNext420City();
      setNext(n.city);
      setCountdown(n.seconds);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.emoji}>{isNow ? '🎉' : '🌿'}</Text>
      <Text style={styles.title}>It's 4:20 Somewhere</Text>
      <Text style={styles.subtitle}>{isNow ? "HAPPENING NOW!" : "Around the world"}</Text>

      <View style={[styles.card, isNow && styles.cardGreen]}>
        <Text style={styles.label}>{isNow ? '🔥 RIGHT NOW 🔥' : 'MOST RECENT'}</Text>
        {city && (
          <>
            <Text style={styles.cityName}>{city.name}</Text>
            <Text style={styles.countryName}>{city.country}</Text>
            <View style={styles.factBox}>
              <Text style={styles.factText}>{fact}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>NEXT 4:20</Text>
        <Text style={styles.countdown}>{formatTime(countdown)}</Text>
        {next && <Text style={styles.nextCity}>{next.name}, {next.country}</Text>}
      </View>

      <Text style={styles.footer}>Made with 💚</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  content: { padding: 20, paddingTop: 60, alignItems: 'center' },
  emoji: { fontSize: 50, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#888', marginBottom: 30 },
  card: { backgroundColor: '#16213e', borderRadius: 20, padding: 25, marginBottom: 20, width: '100%' },
  cardGreen: { borderWidth: 2, borderColor: '#4CAF50' },
  label: { color: '#888', fontSize: 12, textAlign: 'center', marginBottom: 15, letterSpacing: 2 },
  cityName: { fontSize: 30, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  countryName: { fontSize: 16, color: '#4CAF50', textAlign: 'center', marginTop: 5 },
  factBox: { backgroundColor: '#0f0f23', borderRadius: 12, padding: 15, marginTop: 20 },
  factText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  countdown: { fontSize: 44, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center' },
  nextCity: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 10 },
  footer: { color: '#555', marginTop: 20 },
});
