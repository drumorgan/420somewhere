/**
 * TIMEZONE UTILITIES
 *
 * This file contains the core logic for:
 * 1. Finding which city currently has 4:20 PM
 * 2. Calculating the countdown to the next 4:20 somewhere
 * 3. Getting the current time in any timezone
 *
 * HOW IT WORKS:
 * - JavaScript's Intl.DateTimeFormat API lets us get the time in any timezone
 * - We check all 24+ cities to see which one is closest to 4:20 PM
 * - The "4:20 window" is when a city is between 4:20:00 and 4:20:59 PM
 */

import cities from '../data/cities';

/**
 * Gets the current hour and minute in a specific timezone
 *
 * @param {string} timezone - IANA timezone string (e.g., "America/New_York")
 * @returns {object} - { hours, minutes, seconds } in that timezone
 *
 * EXPLANATION:
 * We use Intl.DateTimeFormat to format the current time in the target timezone,
 * then parse out the hours, minutes, and seconds
 */
export function getTimeInTimezone(timezone) {
  const now = new Date();

  // Create a formatter for the specific timezone
  // We ask for hour, minute, second in numeric format
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, // Use 24-hour format so 4:20 PM = 16:20
  });

  // Format returns something like "16:20:30"
  const timeString = formatter.format(now);

  // Split the string to get individual parts
  const parts = timeString.split(':');

  return {
    hours: parseInt(parts[0], 10),
    minutes: parseInt(parts[1], 10),
    seconds: parseInt(parts[2], 10),
  };
}

/**
 * Checks if it's currently 4:20 PM in a specific timezone
 *
 * @param {string} timezone - IANA timezone string
 * @returns {boolean} - true if it's 4:20 PM (between 4:20:00 and 4:20:59)
 */
export function is420InTimezone(timezone) {
  const { hours, minutes } = getTimeInTimezone(timezone);
  // 4:20 PM = 16:20 in 24-hour format
  return hours === 16 && minutes === 20;
}

/**
 * Finds the city where it's currently 4:20 PM
 *
 * @returns {object|null} - The city object if found, or null if no city has 4:20 PM right now
 *
 * WHY MIGHT THIS RETURN NULL?
 * Because our list has 24 cities but timezones have 30-minute and 45-minute offsets too
 * (like India at UTC+5:30), there could be gaps where no city in our list has 4:20 PM
 */
export function findCurrent420City() {
  for (const city of cities) {
    if (is420InTimezone(city.timezone)) {
      return city;
    }
  }
  return null;
}

/**
 * Calculates seconds until 4:20 PM in a specific timezone
 *
 * @param {string} timezone - IANA timezone string
 * @returns {number} - Seconds until 4:20 PM (0 if already past today, counts to tomorrow)
 */
export function secondsUntil420InTimezone(timezone) {
  const { hours, minutes, seconds } = getTimeInTimezone(timezone);

  // Target time: 16:20:00 (4:20 PM)
  const targetHours = 16;
  const targetMinutes = 20;

  // Convert current time to total seconds since midnight
  const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Convert target time to total seconds since midnight
  const targetTotalSeconds = targetHours * 3600 + targetMinutes * 60;

  // Calculate difference
  let diff = targetTotalSeconds - currentTotalSeconds;

  // If 4:20 PM has already passed today in this timezone, add 24 hours
  // to get the time until 4:20 PM tomorrow
  if (diff <= 0) {
    diff += 24 * 3600; // Add 24 hours in seconds
  }

  return diff;
}

/**
 * Finds the next city to hit 4:20 PM and how long until it happens
 *
 * @returns {object} - { city, secondsUntil }
 *
 * HOW IT WORKS:
 * We loop through all cities, calculate seconds until 4:20 PM for each,
 * and find the one with the shortest wait time
 */
export function findNext420City() {
  let nextCity = null;
  let minSeconds = Infinity;

  for (const city of cities) {
    const secondsUntil = secondsUntil420InTimezone(city.timezone);

    // We want the city with the SMALLEST wait time
    // (but not 0 or negative, which would mean it's already 4:20)
    if (secondsUntil > 0 && secondsUntil < minSeconds) {
      minSeconds = secondsUntil;
      nextCity = city;
    }
  }

  return {
    city: nextCity,
    secondsUntil: minSeconds,
  };
}

/**
 * Formats seconds into a human-readable countdown string
 *
 * @param {number} totalSeconds - Total seconds to format
 * @returns {string} - Formatted string like "1:23:45" (hours:minutes:seconds)
 */
export function formatCountdown(totalSeconds) {
  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Pad with zeros so "5" becomes "05"
  const pad = (num) => num.toString().padStart(2, '0');

  // Return formatted string
  return `${hours}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Gets a random fun fact about a city
 *
 * @param {object} city - The city object with a funFacts array
 * @returns {string} - A random fun fact
 */
export function getRandomFunFact(city) {
  if (!city || !city.funFacts || city.funFacts.length === 0) {
    return "It's 4:20 somewhere!";
  }

  // Pick a random index from the funFacts array
  const randomIndex = Math.floor(Math.random() * city.funFacts.length);
  return city.funFacts[randomIndex];
}

/**
 * Gets the most recent city that had 4:20 PM (for showing as "current" when between 4:20s)
 *
 * @returns {object} - { city, fact } - The most recent 4:20 city and a fun fact
 */
export function getMostRecent420City() {
  let mostRecentCity = null;
  let smallestPastTime = Infinity;

  for (const city of cities) {
    const { hours, minutes, seconds } = getTimeInTimezone(city.timezone);

    // Convert to seconds since midnight
    const currentSeconds = hours * 3600 + minutes * 60 + seconds;
    const target420Seconds = 16 * 3600 + 20 * 60; // 4:20 PM

    // Calculate how long ago 4:20 was (if it already happened today)
    if (currentSeconds >= target420Seconds) {
      const secondsSince420 = currentSeconds - target420Seconds;

      // Find the city where 4:20 was most recent
      if (secondsSince420 < smallestPastTime) {
        smallestPastTime = secondsSince420;
        mostRecentCity = city;
      }
    }
  }

  // If no city has had 4:20 yet today (very early morning UTC-12),
  // use the last city in our list (it would have had 4:20 yesterday)
  if (!mostRecentCity) {
    mostRecentCity = cities[cities.length - 1]; // Auckland, NZ
  }

  return {
    city: mostRecentCity,
    fact: getRandomFunFact(mostRecentCity),
  };
}
