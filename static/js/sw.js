const CACHE_NAME = 'lesson-6-cache';

const cacheUrls = [
    './dist/bundle.js',
    'index.html',
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
    );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {

                if (!navigator.onLine && cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
    );
});
