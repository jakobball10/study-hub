const CACHE='studyhub-1.12';
const CORE=["./", "./index.html", "./logo.svg", "./og-image.jpg", "./app/", "./app/index.html", "./shell.js", "./manifest.webmanifest", "./version.json", "./icon-192.png", "./icon-512.png", "./icon-180.png", "./shot-home.webp", "./shot-quiz.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skipWaiting')self.skipWaiting()});
const put=(req,r)=>{if(r&&r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r};
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url), inApp=url.pathname.includes('/app/');
  if(url.pathname.endsWith('/version.json')){e.respondWith(fetch(req,{cache:'no-store'}).catch(()=>caches.match('./version.json')));return}
  // landing page: always fresh when online
  if(req.mode==='navigate'&&!inApp){e.respondWith(fetch(req).then(r=>put(req,r)).catch(()=>caches.match(req,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))));return}
  // the app: instant from the saved copy; new versions arrive as updates
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(r=>(url.origin===location.origin||url.host.includes('fonts.g'))?put(req,r):r).catch(()=>req.mode==='navigate'?caches.match('./app/index.html'):undefined)));
});
