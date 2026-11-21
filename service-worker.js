// service-worker.js — gerado pelo Mini SK em 21/11/2026, 07:10:43
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-restaurador-universal-21-11-a-';
const CACHE = PREFIXO + 'mwq8z692';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./css/app.css",
  "./favicon.ico",
  "./hub.html",
  "./hub.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-16.png",
  "./icons/icon-32.png",
  "./icons/icon-48.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon.svg",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/maskable.svg",
  "./index.html",
  "./js/00-base.js",
  "./js/80-tela.js",
  "./js/lib/jszip.min.js",
  "./js/lib/reconhecer.js",
  "./js/lib/segredos.js",
  "./js/pecas/10-meus-apps.js",
  "./js/pecas/20-replit-projetos.js",
  "./js/pecas/21-ai-code-studio.js",
  "./js/pecas/22-chatgpt.js",
  "./js/pecas/23-mensagens.js",
  "./js/pecas/30-tabela.js",
  "./js/pecas/90-procurar.js",
  "./LEIA-ME.md",
  "./manifest.json",
  "./montar-arquivo-unico.py",
  "./PLANO.md",
  "./RECEITA.md"
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(GUARDAR.map((u) => c.add(u).catch(() => null)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIXO) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Primeiro a internet (sempre a versão nova); sem internet, a cópia guardada.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      // Igual ao Workbox da Replit: página que não existe (rota do app) abre o index
      if (res.status === 404 && req.mode === 'navigate') return caches.match('./').then((r) => r || fetch('./'));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./') : undefined)))
  );
});
