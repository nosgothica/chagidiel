const CACHE='black-madonna-beta-12';
const APP_ICON='/icons/black-madonna-192.png';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/site.webmanifest',APP_ICON,'/icons/black-madonna-512.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={title:'The Black Madonna',body:'Your protagonist is needed.'};try{if(e.data)d={...d,...e.data.json()}}catch(_){try{d.body=e.data.text()}catch(_){}}e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:APP_ICON,badge:APP_ICON,data:d.url||'/'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus'in c)return c.focus()}return clients.openWindow(e.notification.data||'/')}))});
