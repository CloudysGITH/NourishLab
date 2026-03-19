const CACHE_NAME = 'nourishlab-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './icon-192.svg',
    './icon-512.svg',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install: cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch: cache-first for cached assets, network-first for others
self.addEventListener('fetch', (event) => {
    const requestUrl = event.request.url;

    // Check if this request matches a cached asset
    const isCachedAsset = ASSETS_TO_CACHE.some((asset) => {
        if (asset.startsWith('http')) {
            return requestUrl.startsWith(asset);
        }
        // For relative URLs, resolve against service worker scope
        const resolved = new URL(asset, self.registration.scope).href;
        return requestUrl === resolved;
    });

    if (isCachedAsset) {
        // Cache-first strategy
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then((response) => {
                    if (response && response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    } else {
        // Network-first strategy for everything else
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response && response.status === 200 && event.request.method === 'GET') {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    }
});
