import fs from 'fs';

(async () => {
  const policies = [
    { name: 'RefundPolicy', url: 'https://hlshopnow.com/policies/refund-policy', path: '/policies/refund-policy' },
    { name: 'PrivacyPolicy', url: 'https://hlshopnow.com/policies/privacy-policy', path: '/policies/privacy-policy' },
    { name: 'TermsOfService', url: 'https://hlshopnow.com/policies/terms-of-service', path: '/policies/terms-of-service' },
    { name: 'DoNotSell', url: 'https://hlshopnow.com/pages/do-not-sell-or-share-my-personal-information', path: '/pages/do-not-sell-or-share-my-personal-information' },
    { name: 'Contact', url: 'https://hlshopnow.com/pages/contact', path: '/pages/contact' }
  ];

  let out = `import React from 'react';\n\n`;
  out += `export const TermsContainer = ({ children }) => (<div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '12rem 2rem 8rem', lineHeight: '1.8' }}>{children}</div>);\n\n`;

  for (let p of policies) {
    const res = await fetch(p.url);
    const html = await res.text();
    let content = "";
    
    // Shopify formatting
    const policyMatch = html.match(/<div class="shopify-policy__container[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
    if (policyMatch) { 
      content = policyMatch[1];
    } else {
      const pageMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
      if (pageMatch) content = pageMatch[1];
    }

    content = content.replace(/Carlos Calcada Bastos e Maria Porta/gi, "Giangiacomo Cristanelli")
                     .replace(/Carlos Calcada Bastos/gi, "Giangiacomo Cristanelli")
                     .replace(/Maria Porta/gi, "Giangiacomo Cristanelli")
                     .replace(/info@hlshopnow\.com/gi, "giangiacomo@example.com") 
                     .replace(/HL Shop Now/gi, "Giangiacomo Cristanelli")
                     .replace(/class=/g, "className=")
                     .replace(/style="[^"]*"/g, ""); 

    out += `export const ${p.name} = () => (\n  <TermsContainer>\n    <div dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />\n  </TermsContainer>\n);\n\n`;
  }

  fs.writeFileSync('src/components/Policies.jsx', out);
  console.log('Policies created');
})();
