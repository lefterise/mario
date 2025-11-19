const CACHE_NAME = "mario-pwa-v1";

// Use absolute paths (with leading /) for better Firefox compatibility
const FILES_TO_CACHE = [
  "/mario/",
  "/mario/index.html",
  "/mario/manifest.json",
  "/mario/graphics.js",
  "/mario/levels.js",
  "/mario/keyboard.js",
  "/mario/touch.js",
  "/mario/sound.js",
  "/mario/behaviors.js",
  "/mario/actors.js",
  "/mario/graphics/brickPattern.png",
  "/mario/graphics/buttons.png",
  "/mario/graphics/enemies.png",
  "/mario/graphics/grass.png",
  "/mario/graphics/joystick.png",
  "/mario/graphics/levels.png",
  "/mario/graphics/mario.png",
  "/mario/graphics/prisonPattern.png",
  "/mario/graphics/prisonPattern2.png",
  "/mario/graphics/terrain.png",
  "/mario/graphics/tree.png",
  "/mario/graphics/screenshot.png",
  "/mario/graphics/screenshot1280x720.png",
  "/mario/sounds/break.wav",
  "/mario/sounds/bump.wav",
  "/mario/sounds/coin.wav",
  "/mario/sounds/die.wav",
  "/mario/sounds/fireball.wav",
  "/mario/sounds/jump.wav",
  "/mario/sounds/jumplong.wav",
  "/mario/sounds/kick.wav",
  "/mario/sounds/levelstart.wav",
  "/mario/sounds/life.wav",
  "/mario/sounds/mushroom.wav",
  "/mario/sounds/pause.wav",
  "/mario/sounds/pipe.mp3",
  "/mario/sounds/powerdown.wav",
  "/mario/sounds/powerup.wav",
  "/mario/sounds/sprout.wav",
  "/mario/sounds/star.mp3",
  "/mario/sounds/stomp.wav"
];

self.addEventListener("install", (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    }).then(() => {
      console.log('[SW] All files cached successfully');
    }).catch(error => {
      console.error('[SW] Cache installation failed:', error);
    })
  );
  
  self.skipWaiting(); // Force immediate activation
});

self.addEventListener("activate", (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service worker activated');
    })
  );
  
  return self.clients.claim(); // Take control immediately
});

self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Handle HTML navigation specifically
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/mario/index.html", {
        ignoreSearch: true,
        ignoreVary: true
      }).then(response => {
        if (response) {
          console.log('[SW] Serving cached index.html for navigation');
          return response;
        }
        console.log('[SW] Fetching index.html from network');
        return fetch(event.request);
      }).catch(error => {
        console.error('[SW] Error serving navigation:', error);
        return fetch(event.request);
      })
    );
    return;
  }
  
  // Handle all other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true,  // Critical for Firefox
      ignoreVary: true     // Critical for Firefox
    }).then(cached => {
      if (cached) {
        console.log('[SW] Serving from cache:', event.request.url);
        return cached;
      }
      
      console.log('[SW] Fetching from network:', event.request.url);
      return fetch(event.request).then(response => {
        // Optional: Cache new requests dynamically
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    }).catch(error => {
      console.error('[SW] Fetch failed:', error);
      // You could return a fallback offline page here
      return new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});
