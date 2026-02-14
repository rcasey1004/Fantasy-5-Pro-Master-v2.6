const CACHE_NAME = 'f5-pro-v2-cache';
const assets = [
  './index.html',
  './manifest.json'
];

// 1. Install Service Worker & Cache Files
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// 2. Activate & Clean Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 3. Fetch Data (Allows App to Work Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
