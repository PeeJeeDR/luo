importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

workbox.core.setCacheNameDetails({prefix: "luo"});
workbox.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// Cache assets.
workbox.routing.registerRoute(
  /\.(?:html|css|js|png|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})]
  }),
  'GET'
);

workbox.routing.registerRoute(
  new RegExp('https://firebasestorage.googleapis.com/v0/b/luo-quiz-app.appspot.com/.*'),
  workbox.strategies.staleWhileRevalidate()
);

// Cache content from multiple origins.
workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  new workbox.strategies.StaleWhileRevalidate(),
);

// Firebase messaging.
firebase.initializeApp({
  'messagingSenderId': '836601391574'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
})

