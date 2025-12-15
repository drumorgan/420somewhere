/**
 * NOTIFICATION SERVICE
 *
 * This file handles all push notification functionality:
 * 1. Requesting permission to send notifications
 * 2. Sending local notifications when a city hits 4:20 PM
 *
 * IMPORTANT NOTE FOR BEGINNERS:
 * - Push notifications work differently on iOS vs Android
 * - On iOS, you MUST ask for permission before sending any notifications
 * - On Android, notifications are allowed by default (but we ask anyway to be safe)
 * - In Expo Go, notifications will appear as local notifications
 *
 * WHAT ARE "LOCAL" NOTIFICATIONS?
 * - Local notifications are created and triggered by your app directly
 * - They don't require a server or internet connection
 * - They're different from "remote" push notifications sent from a server
 * - For this app, local notifications are perfect!
 */

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

/**
 * Configure how notifications appear when the app is in the foreground
 *
 * By default, iOS doesn't show notifications when your app is open.
 * This configuration tells the system to show them anyway.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // Show an alert popup
    shouldShowAlert: true,
    // Play a sound
    shouldPlaySound: true,
    // Update the app badge number (iOS only)
    shouldSetBadge: false,
    // Determines priority on Android
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

/**
 * Requests permission to send push notifications
 *
 * @returns {Promise<boolean>} - true if permission was granted, false otherwise
 *
 * WHY WE NEED THIS:
 * iOS requires explicit user permission for notifications.
 * If the user denies, we can't send any notifications at all.
 */
export async function requestNotificationPermissions() {
  // Check if we're on a real device (not a simulator)
  // Notifications don't work properly on simulators
  if (!Device.isDevice) {
    console.log('Push notifications require a physical device');
    return false;
  }

  // Check current permission status
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  // If we don't have permission yet, ask for it
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // Return whether we got permission
  if (finalStatus !== 'granted') {
    console.log('Permission for notifications was denied');
    return false;
  }

  // Android requires a notification channel for Android 8.0+
  // This is like a "category" for your notifications
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('420-alerts', {
      name: '4:20 Alerts',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#4CAF50', // Green color
    });
  }

  return true;
}

/**
 * Sends a local notification when a city hits 4:20 PM
 *
 * @param {object} city - The city object with name, country, and funFacts
 *
 * HOW IT WORKS:
 * We schedule an "immediate" notification (triggers in 1 second)
 * with the city name and a fun fact about it
 */
export async function send420Notification(city) {
  // Pick a random fun fact to include in the notification
  const randomFact = city.funFacts[Math.floor(Math.random() * city.funFacts.length)];

  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    // The content that appears in the notification
    content: {
      // The title (shown in bold)
      title: `It's 4:20 in ${city.name}!`,
      // The body text (shown below the title)
      body: randomFact,
      // Data you can access when the user taps the notification
      data: {
        city: city.name,
        country: city.country,
      },
    },
    // When to trigger the notification
    trigger: {
      // Trigger after 1 second (essentially immediately)
      seconds: 1,
      // Android channel ID we set up earlier
      channelId: '420-alerts',
    },
  });

  console.log(`Notification sent for ${city.name}`);
}

/**
 * Cancels all pending notifications
 *
 * Useful if you want to stop all scheduled notifications
 * (we don't really need this for our app, but it's good to have)
 */
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Sets up a listener for when a notification is received
 *
 * @param {function} callback - Function to call when a notification arrives
 * @returns {function} - A function to remove the listener when done
 *
 * WHY WE NEED THIS:
 * This lets us react when a notification comes in while the app is open.
 * We use it to update the UI immediately when 4:20 happens.
 */
export function addNotificationReceivedListener(callback) {
  const subscription = Notifications.addNotificationReceivedListener(callback);

  // Return a cleanup function
  return () => subscription.remove();
}

/**
 * Sets up a listener for when a user taps on a notification
 *
 * @param {function} callback - Function to call when user taps notification
 * @returns {function} - A function to remove the listener when done
 */
export function addNotificationResponseListener(callback) {
  const subscription = Notifications.addNotificationResponseReceivedListener(callback);

  // Return a cleanup function
  return () => subscription.remove();
}
