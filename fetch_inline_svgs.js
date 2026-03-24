import fs from 'fs';

(async () => {
  const fetchOptions = {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  };
  const res = await fetch('https://hlshopnow.com/', fetchOptions);
  const html = await res.text();
  
  const matches = [...html.matchAll(/<svg[^>]*class="icon icon--full-color"[^>]*>[\s\S]*?<\/svg>/gi)];
  let svgs = matches.map(m => m[0]);
  if (svgs.length > 0) {
    fs.writeFileSync('svgs.json', JSON.stringify(svgs, null, 2));
    console.log(`Found ${svgs.length} icons.`);
  } else {
    console.log("No SVGs found.");
  }
})();
