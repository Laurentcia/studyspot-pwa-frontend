const CACHE_NAME = 'studyspot-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/categories.html',
  '/detail.html',
  '/about.html',
  '/favorites.html',
  '/style.css',
  '/app.js',
  '/sw-register.js',
  '/manifest.json'
  // Tambahkan link icon jika sudah di-upload (misal: '/icon-192x192.png')
];

// Event: Install (menginstal Service Worker dan menyimpan aset dasar)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event: Activate (menghapus cache lama)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Event: Fetch (mengintersep request dan melayani dari cache jika ada)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, berikan dari cache
        if (response) {
          return response;
        }
        
        // Jika tidak ada di cache, lakukan fetch (ambil dari jaringan)
        return fetch(event.request);
      })
  );
});
