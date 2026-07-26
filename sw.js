importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAQBoUDJptubA-qTL5lk2tdSyE26IITsZo",
  authDomain: "masan-dev.firebaseapp.com",
  projectId: "masan-dev",
  storageBucket: "masan-dev.firebasestorage.app",
  messagingSenderId: "334683741155",
  appId: "1:334683741155:web:cbc57d20a0f66dfc74ded6"
});

const messaging = firebase.messaging();

// Notifikasi saat app di background / tertutup
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'MasAn Dev', {
    body: body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'masandev-notif',
    renotify: true,
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(cls => {
    for (const c of cls) { if (c.url && 'focus' in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow('https://masan-develope.github.io');
  }));
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
