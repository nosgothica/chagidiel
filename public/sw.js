const CACHE='chagidiel-beta-1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/site.webmanifest','/media/ui/motifs/kult_winged_emblem_red.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={title:'Chagidiel',body:'Your protagonist is needed.'};try{if(e.data)d={...d,...e.data.json()}}catch(_){try{d.body=e.data.text()}catch(_){}}e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'/media/ui/motifs/kult_winged_emblem_red.png',badge:'/media/ui/motifs/kult_winged_emblem_red.png',data:d.url||'/'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus'in c)return c.focus()}return clients.openWindow(e.notification.data||'/')}))});
