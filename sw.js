importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  workbox.setConfig({ debug: false });

  const { registerRoute } = workbox.routing;
  const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
  const { precacheAndRoute } = workbox.precaching;
  const { ExpirationPlugin } = workbox.expiration;

  // ── Auto-detect base path from SW location ──
  // Works regardless of repo name or deployment path
  const base = self.location.pathname.replace('/sw.js', '');

  precacheAndRoute([
    { url: base + '/index.html',    revision: 'v5' },
    { url: base + '/app.js',        revision: 'v5' },
    { url: base + '/char-slots.js', revision: 'v5' },
    { url: base + '/style.css',     revision: 'v5' },
    { url: base + '/manifest.json', revision: 'v5' },
    { url: base + '/icon-192.png',  revision: 'v5' },
    { url: base + '/icon-512.png',  revision: 'v5' },
  ]);

  registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com' ||
               url.origin === 'https://fonts.gstatic.com',
    new StaleWhileRevalidate({ cacheName: 'google-fonts' })
  );

  registerRoute(
    ({url}) => url.origin === 'https://cdnjs.cloudflare.com',
    new CacheFirst({
      cacheName: 'cdn-assets',
      plugins: [new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60*60*24*30 })]
    })
  );

  registerRoute(
    ({url}) =>
      url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('gstatic') ||
      url.hostname.includes('googletagmanager'),
    new NetworkFirst({ cacheName: 'firebase-cache' })
  );
}
