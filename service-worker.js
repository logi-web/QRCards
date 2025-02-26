---
layout: null
---
// Service Worker for offline capability
const CACHE_NAME = 'qr-code-pwa-v1-{{ site.time | date: "%Y%m%d%H%M%S" }}';
const BASE_URL = '{{ site.baseurl }}';

// Build paths list based on your QR codes
const ASSETS_TO_CACHE = [
  // Core assets
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/styles.css`,
  `${BASE_URL}/script.js`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/offline.html`,
  
  // Icons
  `${BASE_URL}/icons/favicon.ico`,
  `${BASE_URL}/icons/favicon.svg`,
  `${BASE_URL}/icons/favicon-96x96.png`,
  `${BASE_URL}/icons/apple-touch-icon.png`,
  `${BASE_URL}/icons/web-app-manifest-512x512.png`,
  
  // QR Code images
  {% for card in site.data.qrcodes %}
  `${BASE_URL}{{ card.image }}`,
  {% endfor %}
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith('qr-code-pwa-') && cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy: Cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Clone the request since it can only be used once
        const fetchRequest = event.request.clone();
        
        // If not found in cache, fetch from network
        return fetch(fetchRequest)
          .then((response) => {
            // Check if response is valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response since it can only be used once
            const responseToCache = response.clone();
            
            // Add the new resource to the cache
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // If both cache and network fail, return a fallback
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
              return caches.match(`${BASE_URL}/icons/favicon-96x96.png`);
            }
            
            // Return offline page for HTML requests
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match(`${BASE_URL}/offline.html`);
            }
          });
      })
  );
});

// Handle updates
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
