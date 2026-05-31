/**
 * pwa.js — Shared PWA logic
 * Handles: Service Worker registration + Install prompt button
 * Usage: <script src="js/pwa.js"></script>  (plain script, no module needed)
 * Expects: a button with id="installBtn" (hidden by default) somewhere on the page.
 */

(function () {
  /* ── Service Worker ── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('./sw.js', { scope: '/anime-prompt-studio/' })
        .catch(function (e) { console.warn('SW registration failed:', e); });
    });
  }

  /* ── Install Prompt ── */
  var _installPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    _installPrompt = e;
    var btn = document.getElementById('installBtn');
    if (btn) btn.style.display = '';
  });

  window.addEventListener('appinstalled', function () {
    var btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'none';
    _installPrompt = null;
  });

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('installBtn');
    if (!btn) return;
    btn.addEventListener('click', async function () {
      if (!_installPrompt) return;
      _installPrompt.prompt();
      var result = await _installPrompt.userChoice;
      if (result.outcome === 'accepted') btn.style.display = 'none';
      _installPrompt = null;
    });
  });
})();
