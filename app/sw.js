// Quem instalou a versão lite no endereço antigo tem um service worker aqui.
// Esta versão apaga o cache, se desregistra e leva as abas abertas ao endereço novo.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const nome of await caches.keys()) await caches.delete(nome);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: "window" })) {
      c.navigate(c.url.replace("/metro-fortaleza-horarios", "/metro-ceara-horarios"));
    }
  })());
});
