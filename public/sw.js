// Service Worker for Stitch Counter PWA
const CACHE_NAME = 'stitch-counter-v1';
const urlsToCache = [
  '/',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/App.css',
  '/src/styles/variables.css',
  '/src/components/Counter.jsx',
  '/src/components/Counter.css',
  '/src/components/ProjectList.jsx',
  '/src/components/ProjectList.css',
  '/src/components/PatternEditor.jsx',
  '/src/components/PatternEditor.css',
  '/src/hooks/useLocalStorage.js',
  '/src/hooks/useCounter.js',
  '/src/utils/storage.js',
  '/src/utils/templates.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
