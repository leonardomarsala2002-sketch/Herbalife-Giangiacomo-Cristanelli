import fs from 'fs';

(async () => {
  const res = await fetch('https://hlshopnow.com/');
  const html = await res.text();
  
  const matches = [...html.matchAll(/<img[^>]*src="([^"]+payment_icons[^"]+)"[^>]*>/gi)];
  matches.forEach(m => console.log(m[1]));
})();
