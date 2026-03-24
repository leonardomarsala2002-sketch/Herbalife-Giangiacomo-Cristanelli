import { writeFileSync, existsSync, mkdirSync } from 'fs';

const SHOP = 'herbalife-giangiacomo-cristanelli-2.myshopify.com';
const TOKEN = 'd0758ac131b0e21a2adc5f450a3a93b6';

async function testStorefront() {
  console.log('--- Testing Shopify Storefront API ---');
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${SHOP}/api/2024-04/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      return;
    }

    const result = await response.json();
    const products = result.data.products.edges;
    console.log(`Success! Found ${products.length} products.`);
    
    products.forEach(({node}) => {
      const price = node.variants.edges[0]?.node.price.amount || '0';
      console.log(`- Product: ${node.title} (${price}€) - Available: ${node.availableForSale}`);
    });

    if (!existsSync('src/data')) mkdirSync('src/data', { recursive: true });
    writeFileSync('src/data/shopifyProducts.json', JSON.stringify({ products }, null, 2));
    console.log('Saved to src/data/shopifyProducts.json');

  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

testStorefront();
