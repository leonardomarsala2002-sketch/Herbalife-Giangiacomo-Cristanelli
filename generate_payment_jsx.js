import fs from 'fs';

(async () => {
  let svgs = JSON.parse(fs.readFileSync('svgs.json', 'utf8'));
  let jsx = `import React from 'react';\n\nexport const PaymentIcons = () => (\n  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>\n`;
  
  svgs.forEach((svg, i) => {
    let cleaned = svg
      .replace(/class=/g, 'className=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/xmlns:xlink=/g, 'xmlnsXlink=')
      .replace(/xml:space=/g, 'xmlSpace='); // just in case
    jsx += `    ${cleaned}\n`;
  });
  
  jsx += `  </div>\n);\n`;
  
  fs.writeFileSync('src/components/PaymentIcons.jsx', jsx);
  console.log('PaymentIcons.jsx updated without wrappers.');
})();
