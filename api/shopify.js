export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, variables } = req.body;
  const SHOP = process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

  if (!SHOP || !TOKEN) {
    return res.status(500).json({ error: 'Shopify configuration missing on server' });
  }

  try {
    const response = await fetch(`https://${SHOP}/api/2024-04/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Accept-Language': req.headers['accept-language'] || 'it'
      },
      body: JSON.stringify({ query, variables })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({ error: 'Failed to connect to Shopify' });
  }
}
