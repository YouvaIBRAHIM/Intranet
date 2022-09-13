const cacheName = 'static_v1'
const appShell = [
    '/index.html',
    '/sw.js',
    '/manifest.json',
    '/src/components/Banner.jsx',
    '/src/components/PopupAlert.jsx',
    '/src/components/SearchBar.jsx',
    '/src/services/Localstorage.service.js',
    '/src/services/Api.service.js',
    '/src/services/ServiceWorker.service.js',
    '/src/store/index.js',
    '/src/styles/Banner.module.css',
    '/src/views/Home.jsx',
    '/src/App.jsx',
    '/src/main.jsx'
]

self.addEventListener('install', function(event) {
    console.log('Installing...');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(appShell))
        .then(console.log("adding new cache"))
        .then(() => self.skipWaiting())
        .catch(err => console.log("erreur on adding cache : ", err))
    );
});

self.addEventListener('activate', function(event) {
    console.log('Activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }else{
                return fetch(event.request);
            }
        })
    )
});

