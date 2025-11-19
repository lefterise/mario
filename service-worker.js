const CACHE_NAME = "mario-pwa-v1";

const FILES_TO_CACHE = [
  "index.html",
  "manifest.json",
  "graphics.js",
  "levels.js",
  "keyboard.js",
  "touch.js",
  "sound.js",
  "behaviors.js",
  "actors.js",
  "graphics/brickPattern.png",
  "graphics/buttons.png",
  "graphics/enemies.png",
  "graphics/grass.png",
  "graphics/joystick.png",
  "graphics/levels.png",
  "graphics/mario.png",
  "graphics/prisonPattern.png",
  "graphics/prisonPattern2.png",
  "graphics/terrain.png",
  "graphics/tree.png",
  "graphics/screenshot.png",
  "graphics/screenshot1280x720.png",
  "sounds/break.wav",
  "sounds/bump.wav",
  "sounds/coin.wav",
  "sounds/die.wav",
  "sounds/fireball.wav",
  "sounds/jump.wav",
  "sounds/jumplong.wav",
  "sounds/kick.wav",
  "sounds/levelstart.wav",
  "sounds/life.wav",
  "sounds/mushroom.wav",
  "sounds/pause.wav",
  "sounds/pipe.mp3",
  "sounds/powerdown.wav",
  "sounds/powerup.wav",
  "sounds/sprout.wav",
  "sounds/star.mp3",
  "sounds/stomp.wav"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
