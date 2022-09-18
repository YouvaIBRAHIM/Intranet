const cacheName = 'static_v1'
const appShell = [
    '/index.html',
    '/sw.js',
    '/manifest.json',
    '/src/assets/icons/logo-32.png',
    '/src/assets/icons/logo-144.png',
    '/src/assets/logo.png',
    '/src/components/Banner.jsx',
    '/src/components/CollaboraterCard.jsx',
    '/src/components/PopupAlert.jsx',
    '/src/components/Search.jsx',
    '/src/components/Loader.jsx',
    '/src/components/UserForm.jsx',
    '/src/customRoutes/IndexPageRoute.jsx',
    '/src/customRoutes/IsAdminRoute.jsx',
    '/src/customRoutes/IsNotOnlineRoute.jsx',
    '/src/customRoutes/PrivateRoute.jsx',
    '/src/features/UserReducer.js',
    '/src/features/CollaboratersReducer.js',
    '/src/services/Storage.service.js',
    '/src/services/Api.service.js',
    '/src/services/Collaboraters.service.js',
    '/src/services/Disconnect.service.js',
    '/src/services/ServiceWorker.service.js',
    '/src/services/Utils.service.js',
    '/src/store/index.js',
    '/src/styles/Banner.module.css',
    '/src/styles/Collaborater.module.css',
    '/src/styles/CollaboraterCard.module.css',
    '/src/styles/CollaboratersList.module.css',
    '/src/styles/Home.module.css',
    '/src/styles/Loader.module.css',
    '/src/styles/LoginPage.module.css',
    '/src/styles/PopupAlert.module.css',
    '/src/styles/Search.module.css',
    '/src/styles/UserForm.module.css',
    '/src/views/Collaborater.jsx',
    '/src/views/CollaboratersList.jsx',
    '/src/views/Home.jsx',
    '/src/views/LoginPage.jsx',
    '/src/views/NewCollaborater.jsx',
    '/src/views/PageNotFound.jsx',
    '/src/views/Profile.jsx',
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

