import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Heart, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const SHOP = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
      const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

      const query = `
        {
          products(first: 50) {
            edges {
              node {
                id
                title
                productType
                availableForSale
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
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

        const result = await response.json();
        const edges = result.data.products.edges;
        
        const formatted = edges.map(({node}) => ({
          id: node.id,
          name: node.title,
          category: node.productType || 'Nutrizione',
          price: parseFloat(node.variants.edges[0]?.node.price.amount || 0),
          available: node.availableForSale ? 1 : 0,
          image: node.images.edges[0]?.node.url || 'https://via.placeholder.com/400x400',
          featured: true
        }));

        setProducts(formatted);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by types/keywords for categorization
  const categories = [
    {
      title: 'Nutrizione di Base',
      icon: <Heart size={20} />,
      items: products.filter(p => p.name.includes('Complex') || p.name.includes('Aloe') || p.name.includes('Shake'))
    },
    {
      title: 'Energia & Sport',
      icon: <Zap size={20} />,
      items: products.filter(p => p.name.includes('CR7') || p.name.includes('Energising') || p.name.includes('Rebuild'))
    },
    {
      title: 'Cura Personale',
      icon: <Sparkles size={20} />,
      items: products.filter(p => p.name.includes('SKIN') || p.name.includes('Moisturiser') || p.name.includes('Eye Gel'))
    }
  ];

  if (loading) return <div style={{padding: '5rem', textAlign: 'center'}}>Sincronizzazione Prodotti Shopify...</div>;

  return (
    <section className="product-grid-section">
      <div className="container">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-section" style={{marginBottom: '6rem'}}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cat-header"
            >
              <div className="cat-icon-box">{cat.icon}</div>
              <h2 className="cat-title">{cat.title}</h2>
              <div className="cat-line"></div>
              <button className="view-more">Esplora tutto</button>
            </motion.div>

            <div className="grid">
              {cat.items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {cat.items.length === 0 && <p style={{color: '#999'}}>Nessun prodotto in questa categoria.</p>}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cat-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .cat-icon-box {
          width: 48px;
          height: 48px;
          background: var(--primary);
          color: white;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cat-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--black);
          white-space: nowrap;
        }

        .cat-line {
          height: 1px;
          background: var(--gray-100);
          flex-grow: 1;
        }

        .view-more {
          background: transparent;
          color: var(--primary);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
};

export default ProductGrid;
