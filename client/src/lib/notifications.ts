/**
 * Push Notifications Utility
 * Handles browser push notification permissions and subscriptions
 */

// Check if push notifications are supported
export function isPushNotificationSupported(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

// Register service worker
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    console.log('[Notifications] Service worker registered:', registration.scope);
    return registration;
  } catch (error) {
    console.error('[Notifications] Service worker registration failed:', error);
    return null;
  }
}

// Subscribe to push notifications
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  if (!isPushNotificationSupported()) {
    console.warn('Push notifications are not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      console.log('[Notifications] Already subscribed');
      return subscription;
    }

    // Subscribe to push notifications
    // Note: In production, you need a valid VAPID public key
    const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib37J8xQmrEcxaY3QFfnK7QIgQxQhQeN6RSzHu9vqphGpdYKqX26k1vQEQU';
    
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
    });

    console.log('[Notifications] Subscribed to push notifications');
    return subscription;
  } catch (error) {
    console.error('[Notifications] Failed to subscribe:', error);
    return null;
  }
}

// Unsubscribe from push notifications
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      console.log('[Notifications] Unsubscribed from push notifications');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('[Notifications] Failed to unsubscribe:', error);
    return false;
  }
}

// Show local notification
export function showLocalNotification(title: string, options?: NotificationOptions): void {
  if (!('Notification' in window)) {
    console.warn('Notifications are not supported');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/geosa-logo.png',
      badge: '/geosa-logo.png',
      ...options,
    });
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Get notification permission status
export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

// Check if notifications are enabled
export function areNotificationsEnabled(): boolean {
  return getNotificationPermission() === 'granted';
}
