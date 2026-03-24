const fs = require('fs');

(async () => {
  const policies = [
    { name: 'RefundPolicy', url: 'https://hlshopnow.com/policies/refund-policy', path: '/policies/refund-policy' },
    { name: 'PrivacyPolicy', url: 'https://hlshopnow.com/policies/privacy-policy', path: '/policies/privacy-policy' },
    { name: 'TermsOfService', url: 'https://hlshopnow.com/policies/terms-of-service', path: '/policies/terms-of-service' },
    { name: 'DoNotSell', url: 'https://hlshopnow.com/pages/do-not-sell-or-share-my-personal-information', path: '/pages/do-not-sell-or-share-my-personal-information' },
    { name: 'Contact', url: 'https://hlshopnow.com/pages/contact', path: '/pages/contact' }
  ];

  let out = `import React from 'react';\n\n`;

  for (let p of policies) {
    const res = await fetch(p.url);
    const html = await res.text();
    // VERY simple extraction: within <div class="shopify-policy__container"> or similar.
    let content = "";
    const policyMatch = html.match(/<div class="shopify-policy__container[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
    if (policyMatch) { 
      content = policyMatch[1];
    } else {
      const pageMatch = html.match(/<div class="page-width[^>]*>([\s\S]*?)<\/div>\s*<\/main>/);
      if (pageMatch) content = pageMatch[1];
    }

    // Unescape and format slightly
    content = content.replace(/Carlos Calcada Bastos e Maria Porta/gi, "Giangiacomo Cristanelli")
                     .replace(/Carlos Calcada Bastos/gi, "Giangiacomo Cristanelli")
                     .replace(/Maria Porta/gi, "Giangiacomo Cristanelli")
                     .replace(/info@hlshopnow\.com/gi, "giangiacomo@example.com") 
                     .replace(/HL Shop Now/gi, "Giangiacomo Cristanelli");

    // Clean up JSX unsafe stuff statically (class -> className, etc.)
    content = content.replace(/class=/g, "className=")
                     .replace(/<br>/g, "<br/>")
                     .replace(/<hr>/g, "<hr/>")
                     .replace(/<img([^>]*)>/g, "<img$1/>")
                     .replace(/<input([^>]*)>/g, "<input$1/>")
                     .replace(/style="[^"]*"/g, ""); // strip styles

    out += `export const ${p.name} = () => (\n  <div className="policy-container" style={{ padding: '12rem 2rem 8rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />\n);\n\n`;
  }

  fs.writeFileSync('src/components/Policies.jsx', out);
  console.log('Policies created');
})();
