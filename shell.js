/* Study Hub shell: install helper (landing + app) and update prompts (app only). */
(function(){
  const MODE=window.SH_MODE||'app', BASE=MODE==='app'?'../':'./';
  const css=`.upd{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:90;max-width:460px;margin:0 auto;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:16px;padding:16px 18px;box-shadow:0 12px 34px rgba(0,0,0,.25);font-family:var(--body);display:flex;flex-direction:column;gap:8px;max-height:80vh;overflow:auto}
  .upd h3{margin:0;font:800 18px var(--display)}.upd ul,.upd ol{margin:0;padding-left:22px;font-size:15px;line-height:1.5}.upd ul{color:var(--muted)}.upd .r{display:flex;gap:8px;justify-content:flex-end;margin-top:4px}
  .upd button{font:inherit;font-weight:700;border-radius:10px;padding:10px 16px;cursor:pointer;border:1.5px solid #3b2fa3;background:#3b2fa3;color:#fff}.upd button.l{background:transparent;color:var(--fg);border-color:var(--line)}
  .upd small{color:var(--muted)}.upd .inote{font-size:13px;color:var(--muted);margin:0}
  .instpill{position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:45;display:flex;align-items:center;gap:2px;background:#3b2fa3;color:#fff;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.2);font:700 15px var(--body)}
  .instpill button{font:inherit;background:none;border:0;color:inherit;cursor:pointer;padding:11px 6px 11px 16px}.instpill button.x{padding:11px 14px 11px 6px;opacity:.75}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
  function card(html){const old=document.querySelector('.upd');if(old)old.remove();const d=document.createElement('div');d.className='upd';d.setAttribute('role','dialog');d.innerHTML=html;document.body.appendChild(d);return d}
  window.SH_card=card;

  /* ---------- platform + install ---------- */
  const ua=navigator.userAgent, isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const iosSafari=isIOS&&!/CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(ua);
  const isAndroid=/Android/.test(ua), androidChrome=isAndroid&&/Chrome\//.test(ua)&&!/SamsungBrowser|EdgA|OPR|Firefox|YaBrowser|DuckDuckGo|Brave/.test(ua);
  const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  window.SH_platform=isIOS?(iosSafari?'ios':'ios-other'):isAndroid?(androidChrome?'android':'android-other'):'desktop';
  window.SH_standalone=standalone;
  let deferred=null;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;if(MODE==='app')pill();document.dispatchEvent(new Event('sh-installable'))});
  addEventListener('appinstalled',()=>{const p=document.getElementById('instPill');if(p)p.remove();document.dispatchEvent(new Event('sh-installed'))});
  function pill(){
    if(MODE!=='app'||standalone()||document.getElementById('instPill')) return;
    try{if(localStorage.getItem('studyhub.installHide')==='1') return}catch(e){}
    const p=document.createElement('div');p.className='instpill';p.id='instPill';
    p.innerHTML='<button id="instGo">⬇ Install app</button><button class="x" id="instX" aria-label="Hide install button">✕</button>';
    document.body.appendChild(p);
    p.querySelector('#instGo').onclick=install;
    p.querySelector('#instX').onclick=()=>{p.remove();try{localStorage.setItem('studyhub.installHide','1')}catch(e){}};
  }
  async function install(){
    if(deferred&&(!isAndroid||androidChrome)){deferred.prompt();const r=await deferred.userChoice.catch(()=>null);deferred=null;if(r&&r.outcome==='accepted'){const p=document.getElementById('instPill');if(p)p.remove()}return}
    const link=new URL(BASE,location.href).href;
    let h;
    if(iosSafari) h=`<h3>Install on iPhone or iPad</h3><ol><li>Tap the <b>Share</b> button (the square with an arrow pointing up) in Safari's toolbar.</li><li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. Study Hub appears on your home screen.</li></ol><p class="inote">Open it from the home screen icon from now on. That copy keeps its own scores.</p>`;
    else if(isIOS) h=`<h3>Open this in Safari first</h3><p class="inote">On iPhone and iPad, only Safari can install apps.</p><ol><li>Tap <b>Copy link</b> below.</li><li>Open <b>Safari</b> and paste the link.</li><li>Tap <b>Share</b> → <b>Add to Home Screen</b> → <b>Add</b>.</li></ol>`;
    else if(androidChrome) h=`<h3>Install on Android</h3><ol><li>Tap <b>⋮</b> (top right of Chrome).</li><li>Tap <b>Add to Home screen</b> (or <b>Install app</b>).</li><li>Tap <b>Install</b>.</li></ol><p class="inote">If Android ever says the app was built for an older version, pick <b>Create shortcut</b> instead. It works exactly the same and Android won't block it.</p>`;
    else if(isAndroid) h=`<h3>Use Google Chrome to install</h3><p class="inote">Browsers like Samsung Internet, Edge and Firefox can make an app package that newer Android blocks for safety. Chrome makes a safe one.</p><ol><li>Tap <b>Copy link</b> below, open <b>Chrome</b> and paste it.</li><li>Tap <b>⋮</b> → <b>Add to Home screen</b> → <b>Install</b>.</li></ol><p class="inote">Staying in this browser? Use its <b>Add page to → Home screen</b> or <b>shortcut</b> option, not <b>Apps</b> or <b>Install</b>. A shortcut works the same and won't be blocked.</p>`;
    else h=`<h3>Install on this computer</h3><ol><li>In <b>Chrome</b> or <b>Edge</b>, click the install icon at the right end of the address bar.</li><li>Or use <b>⋮</b> → <b>Cast, save and share</b> → <b>Install page as app</b>.</li></ol><p class="inote">Safari on Mac: <b>File</b> → <b>Add to Dock</b>.</p>`;
    const d=card(h+`<div class="r">${isIOS&&!iosSafari||isAndroid&&!androidChrome?'<button class="l" id="instCopy">Copy link</button>':''}<button id="instOk">Got it</button></div>`);
    d.querySelector('#instOk').onclick=()=>d.remove();
    const c=d.querySelector('#instCopy');if(c)c.onclick=async()=>{try{await navigator.clipboard.writeText(link);c.textContent='Copied ✓'}catch(e){prompt('Copy this link:',link)}};
  }
  window.SH_install=install;
  if(MODE==='app') addEventListener('load',()=>setTimeout(pill,600));

  /* ---------- service worker + updates ---------- */
  if(MODE==='app'){
    let last=null;try{last=localStorage.getItem('studyhub.appVersion');localStorage.setItem('studyhub.appVersion',APP_VERSION)}catch(e){}
    if(last&&last!==APP_VERSION){addEventListener('load',()=>{const d=card(`<h3>Updated to version ${esc(APP_VERSION)}</h3><ul>${APP_NOTES.map(n=>'<li>'+esc(n)+'</li>').join('')}</ul><div class="r"><button>Nice</button></div>`);d.querySelector('button').onclick=()=>d.remove();setTimeout(()=>d.remove(),12000)})}
  }
  if(!('serviceWorker' in navigator)) return;
  let shown=false, reloading=false;
  async function offer(reg){
    if(MODE!=='app'){reg.waiting&&reg.waiting.postMessage('skipWaiting');return}
    if(shown||!reg.waiting) return; shown=true;
    let info={version:'',notes:[]};try{info=await (await fetch(BASE+'version.json',{cache:'no-store'})).json()}catch(e){}
    const d=card(`<small>App update</small><h3>Update available${info.version?' · version '+esc(info.version):''}</h3>${info.notes&&info.notes.length?'<ul>'+info.notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul>':''}<div class="r"><button class="l" id="updLater">Later</button><button id="updNow">Update now</button></div>`);
    d.querySelector('#updLater').onclick=()=>d.remove();
    d.querySelector('#updNow').onclick=()=>{d.querySelector('#updNow').textContent='Updating…';reg.waiting&&reg.waiting.postMessage('skipWaiting')};
  }
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading)return;reloading=true;location.reload()});
  addEventListener('load',async()=>{
    try{
      const reg=await navigator.serviceWorker.register(BASE+'sw.js',{scope:BASE});
      const watch=()=>{const w=reg.installing;if(w)w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller)offer(reg)})};
      reg.addEventListener('updatefound',watch);
      if(reg.waiting&&navigator.serviceWorker.controller) offer(reg);
      reg.update().catch(()=>{});
      document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{})});
    }catch(e){}
  });
})();
