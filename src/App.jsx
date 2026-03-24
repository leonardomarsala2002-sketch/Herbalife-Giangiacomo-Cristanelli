import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, ArrowUpRight, ChevronDown, Mail, X, ArrowLeft, Phone, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductCard from './components/ProductCard';
import { RefundPolicy, PrivacyPolicy, TermsOfService, DoNotSell, Contact } from './components/Policies';
import { PaymentIcons } from './components/PaymentIcons';
import './App.css';


// Helper for smooth scrolling
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

const Home = ({ products, t, addToCart }) => {
  const dynamicCategories = [...new Set(products.map(p => p.type).filter(type => typeof type === 'string' && type.trim() !== ''))];

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
      <section className="hero-lux" style={{ textAlign: 'center', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hero-title-wrap-lux">
          <div className="hero-bg-icon-lux">
             <motion.img 
                src="/herbalife-official-precise.png" 
                alt="Official Herbalife Logo"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
             />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hero-title-lux"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: '5.28rem', fontWeight: 900, fontStyle: 'italic', textTransform: 'none', padding: '0', lineHeight: 1.05, marginBottom: '0.4rem' }}
            >
              {t('hero_title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase', color: '#555', margin: 0 }}
            >
              Giangiacomo Cristanelli
            </motion.p>
          </div>
        </div>
      </section>


      {dynamicCategories.map((catName) => {
        const catProducts = products.filter(p => p.type === catName);
        if (catProducts.length === 0) return null;
        const id = catName.replace(/\s+/g, '-').toLowerCase();

        return (
          <div key={id} id={id} className="section-wrapper-lux" style={{ marginBottom: '6rem' }}>
            <div className="dynamic-section-title-lux" style={{ marginBottom: '4rem', paddingLeft: '1rem', borderLeft: '4px solid var(--primary)' }}>
              <span className="premium-tag-lux" style={{ color: 'var(--primary)', letterSpacing: '4px', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' }}>{t('premium_formula')}</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginTop: '10px' }}>{t(catName) || catName}</h2>
            </div>
            <div className="grid-lux">
              {catProducts.map(p => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ProductPage = ({ products, loading, t, quantity, setQuantity, addToCart }) => {
  const params = useParams();
  const idValue = params['*'] || params.id || '';
  const navigate = useNavigate();
  const location = useLocation();
  
  // Normalize ID for robust matching
  const normalizeId = (val) => decodeURIComponent(val || '').replace(/\/\//g, '/').toLowerCase();
  const targetId = normalizeId(idValue);
  
  const product = products.find(p => 
    normalizeId(p.id) === targetId || (p.variants && p.variants.some(v => normalizeId(v.id) === targetId))
  );

  const [activeVariant, setActiveVariant] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (product && product.isGrouped) {
      const match = product.variants.find(v => normalizeId(v.id) === targetId);
      setActiveVariant(match || product.variants[0]);
    } else {
      setActiveVariant(null);
    }
  }, [product, targetId]);

  if (loading) return <div style={{ padding: '20rem 2rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700 }}>{t('loading') || 'Loading...'}</div>;
  if (!product) return <div style={{ padding: '20rem 2rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700 }}>{t('not_found') || 'Product not found'}</div>;

  const currentImage = activeVariant ? activeVariant.image : product.image;
  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const currentFlavor = activeVariant ? activeVariant.flavor : null;

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '14rem 5% 4rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', marginBottom: '2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, fontSize: '0.8rem' }}>
        <ArrowLeft size={18} />
        {t('back') || 'Indietro'}
      </button>

      <div className="product-page-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'start' }}>
        <div>
          <div className="product-img-box-lux" style={{ background: '#fff', padding: '2rem', borderRadius: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'center', minHeight: '380px', marginBottom: '2.5rem' }}>
            <img src={currentImage} alt={product.name} style={{ width: '100%', maxWidth: '380px', objectFit: 'contain' }} />
          </div>

          {product.isGrouped && (
            <div className="flavor-group-lux" style={{ marginBottom: '3rem' }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '1.8rem', color: '#000' }}>
                Opzioni / Gusti <span style={{ color: 'var(--primary)' }}>*</span>
              </span>
              <div className="flavor-grid-lux" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
                {product.variants.map(v => {
                  const isActive = activeVariant && activeVariant.id === v.id;
                  return (
                  <div key={v.id} className={`flavor-option-lux ${isActive ? 'active' : ''}`} onClick={() => setActiveVariant(v)} 
                       style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '18px', border: '1px solid #eee', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)', background: isActive ? '#f0fff4' : '#fff', borderColor: isActive ? 'var(--primary)' : '#eee', boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.06)' : 'none' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden', background: '#f9f9f9', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={v.image} alt={v.flavor} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isActive ? '#000' : '#444', lineHeight: 1.2 }}>{v.flavor}</span>
                      {v.price !== product.price && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>£{v.price.toFixed(2)}</span>}
                    </div>
                  </div>
                )})}
              </div>
            </div>
          )}
        </div>

        <div className="product-info-lux">
          <span className="premium-tag-lux" style={{ color: 'var(--primary)', letterSpacing: '4px', fontWeight: 800, fontSize: '0.75rem', display: 'block', marginBottom: '1rem', textTransform: 'uppercase' }}>
            {t(product.type) || product.type}
          </span>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>{product.name}</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '2rem' }}>
            <div className="price-tag-lux" style={{ display: 'inline-block', background: 'var(--primary)', color: '#fff', padding: '10px 20px', borderRadius: '12px', fontSize: '2rem', fontWeight: 800 }}>
              £{currentPrice.toFixed(2)}
            </div>
            
            <div className="qty-section-lux" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#000', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('quantity') || 'Quantità'}</span>
              <div className="qty-picker-lux" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', background: '#f8f8f8', padding: '10px 24px', borderRadius: '50px', border: '1px solid #eee' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.3rem', fontWeight: 300 }}>-</button>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 300 }}>+</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '3rem' }}>
            <button 
              onClick={() => addToCart && addToCart(product, quantity, currentFlavor, false)} 
              className="cart-btn-main-lux" 
              style={{ flex: 1, padding: '1rem', background: '#fff', color: 'var(--primary)', border: '2px solid var(--primary)', borderRadius: '50px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.3s', whiteSpace: 'nowrap' }} 
              onMouseEnter={(e)=>e.currentTarget.style.background='#f0fff4'} 
              onMouseLeave={(e)=>e.currentTarget.style.background='#fff'}
            >
              <ShoppingBag size={20} />
              <span>Aggiungi al carrello</span>
            </button>
            <button 
              onClick={() => addToCart && addToCart(product, quantity, currentFlavor, true)} 
              className="cart-btn-main-lux" 
              style={{ flex: 1, padding: '1rem', background: 'var(--primary)', color: '#fff', border: '2px solid var(--primary)', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.3s', boxShadow: '0 5px 15px var(--primary-glow)', whiteSpace: 'nowrap' }} 
              onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 25px var(--primary-glow)';}} 
              onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 5px 15px var(--primary-glow)';}}
            >
              <span>{t('buy_now') || 'Compra ora'}</span>
              <ArrowUpRight size={20} />
            </button>
          </div>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '2.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.01em' }}>Dettagli Prodotto</h4>
            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.8, maxWidth: '600px' }}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = ({ cartItems, totalItems, totalPrice, navigate, t }) => {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '16rem 5% 8rem' }}>
       <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', marginBottom: '4rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, fontSize: '0.8rem' }}>
        <ArrowLeft size={18} />
        {t('back')}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>{t('checkout_title')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '20px', padding: '20px', background: '#fff', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '80px', height: '80px', background: '#f8f8f8', borderRadius: '12px', padding: '8px', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 800 }}>{item.name}</h4>
                  {item.flavor && <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#666' }}>{item.flavor}</p>}
                  <p style={{ margin: 0, fontWeight: 800 }}>{item.quantity} x £{item.price.toFixed(2)}</p>
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>£{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#f8faf9', padding: '40px', borderRadius: '32px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem' }}>{t('checkout_total')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '2rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: 600 }}>{t('items')} ({totalItems})</span>
              <span style={{ fontWeight: 800 }}>£{totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: 600 }}>{t('checkout_shipping')}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{t('free')}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>
            <span>{t('checkout_total')}</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', color: '#666' }}>{t('secure_payments')}</span>
            <PaymentIcons />
          </div>

          <button style={{ width: '100%', padding: '1.4rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 30px rgba(120, 190, 32, 0.3)', transition: 'all 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'} onClick={() => alert('Redirect a Shopify Checkout...')}>
            {t('pay_now')}
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selFlavors, setSelFlavors] = useState({ shakes: [], teas: [] });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const dynamicCategories = [...new Set(products.map(p => p.type).filter(type => typeof type === 'string' && type.trim() !== ''))];

  const addToCart = (product, qty = 1, flavor = null, buyNow = false) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.flavor === flavor);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty, flavor }];
    });
    if (buyNow) {
      setCartOpen(false);
      navigate('/checkout');
    } else {
      setToastMessage(t('add_to_cart') + ' ✓');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const updateCartQty = (id, flavor, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.flavor === flavor) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id, flavor) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.flavor === flavor)));
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const languages = [
    { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const fetchShopify = async () => {
      const SHOP = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
      const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
      const query = `{
        products(first: 50) {
          edges {
            node {
              id
              title
              description
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
              images(first: 5) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }`;
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
        const PRODUCT_MAP = {
          'Formula 1 Nutritional Shake Mix': 'prod_f1',
          'Formula 1 Shake Mix Sachets': 'prod_f1_sachets',
          'Formula 1 Express Meal Bars': 'prod_bars',
          'Formula 1 Free From': 'prod_free',
          'H24 Achieve Bar': 'prod_h24',
          'High Protein Iced Coffee': 'prod_coffee',
          'Formula 2 Vitamin & Mineral Complex': 'prod_f2',
          'Aloe Concentrate': 'prod_aloe',
          'Herbal Tea Concentrate': 'prod_tea',
          'Protein Drink Mix': 'prod_pdm',
          'Super Shaker': 'prod_shaker',
          'Balanced Breakfast Kit': 'prod_kit_colazione'
        };

        const CAT_MAP = {
          'Kits': 'cat_kits',
          'Formula 1 Shakes': 'cat_shakes',
          'Protein Boosts': 'cat_protein',
          'Teas & Aloe': 'cat_tea_aloe',
          'H24 Sport': 'cat_sport',
          'Skin & Body': 'cat_skin',
          'Protein Snacks': 'cat_snacks',
          'Accessories': 'cat_accessories'
        };

        const rawProducts = result.data.products.edges.map(({ node }) => {
          const mappedNameKey = PRODUCT_MAP[node.title];
          const mappedTypeKey = CAT_MAP[node.productType];
          
          return {
            id: node.id,
            name: (mappedNameKey ? t(mappedNameKey) : node.title),
            originalTitle: node.title,
            description: node.description || t('premium_formula'),
            type: (mappedTypeKey ? t(mappedTypeKey) : t(node.productType) || t('Wellness')),
            price: parseFloat(node.variants.edges[0]?.node.price.amount || 0),
            available: node.availableForSale,
            image: node.images.edges[0]?.node.url || 'https://via.placeholder.com/600',
            gallery: node.images.edges.map(e => e.node.url)
          };
        });

        const BASE_PRODUCTS = Object.keys(PRODUCT_MAP);

        let groupedProducts = [];
        
        rawProducts.forEach(product => {
          let matchedBase = null;
          let variantName = '';
          
          for (let base of BASE_PRODUCTS) {
            if (product.originalTitle.startsWith(base) && product.originalTitle !== base) {
              matchedBase = base;
              variantName = product.originalTitle.substring(base.length).trim();
              break;
            }
          }
          
          if (matchedBase) {
            let existingGrp = groupedProducts.find(p => p.originalTitle === matchedBase && p.price === product.price);
            if (existingGrp) {
              existingGrp.variants.push({
                id: product.id,
                flavor: variantName,
                price: product.price,
                image: product.image,
                gallery: product.gallery
              });
              if (!existingGrp.gallery.includes(product.image)) {
                existingGrp.gallery.push(product.image);
              }
            } else {
              groupedProducts.push({
                ...product,
                name: t(PRODUCT_MAP[matchedBase]) || matchedBase,
                originalTitle: matchedBase,
                isGrouped: true,
                variants: [{
                  id: product.id,
                  flavor: variantName,
                  price: product.price,
                  image: product.image,
                  gallery: product.gallery
                }]
              });
            }
          } else {
            product.isGrouped = false;
            product.variants = [];
            groupedProducts.push(product);
          }
        });

        // Ripristina nome originale come prodotto a sé stante se il gruppo ha 1 sola varainte! (es. pezzo di prezzo/formato unico)
        groupedProducts = groupedProducts.map(grp => {
          if (grp.isGrouped && grp.variants.length === 1) {
            return {
              ...grp,
              name: grp.originalName || grp.name,
              isGrouped: false,
              variants: []
            };
          }
          return grp;
        });

        // For grouped products with range styling, keep the lowest price
        groupedProducts.forEach(g => {
          if (g.isGrouped) {
             g.price = Math.min(...g.variants.map(v => v.price));
          }
        });

        setProducts(groupedProducts || []);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchShopify();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t]);

  // Reset page state on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Chiudi tendina lingue
      if (!event.target.closest('.lang-picker-box') && langOpen) {
        setLangOpen(false);
      }
      // Chiudi tendina ricerca
      if (!event.target.closest('.search-box-wrap') && searchOpen) {
        setSearchOpen(false);
      }
      // Chiudi tendina categorie
      if (!event.target.closest('.cat-picker-lux') && catOpen) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langOpen, searchOpen, catOpen]);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="app">
      {/* GLOBAL FULL-WIDTH ANNOUNCEMENT BANNER */}
      <div className={`global-announcement-lux ${scrolled ? 'hide' : ''}`}>
        <div className="announcement-row top-ann">
          {t('announcement_top_row')}
        </div>
        <div className="announcement-row bot-ann">
          {t('announcement_bottom_row')}
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="logo-container" style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <img src="/herbalife-logo.png" alt="Herbalife Logo" className="logo-lux" style={{ height: scrolled ? '35px' : '48px', transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }} />
        </Link>

        <div className="nav-actions-lux">
          {/* CATEGORIES DROPDOWN MOVATO QUI A SINISTRA DELLA BANDIERA */}
          <div className="cat-picker-lux">
            <button 
              className="cat-trigger-lux" 
              onClick={() => setCatOpen(!catOpen)}
              style={{ padding: 0, background: 'none', border: 'none', gap: '0.6rem' }}
            >
              <LayoutGrid size={20} />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>{t('CATEGORIES') || 'CATEGORIE'}</span>
              <ChevronDown size={14} style={{ transform: catOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>
            
            <AnimatePresence>
              {catOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.98 }} 
                  className="cat-dropdown-lux"
                >
                  {dynamicCategories.map((cat) => (
                    <div key={cat} className="cat-item-lux" onClick={() => { scrollToSection(cat.replace(/\s+/g, '-').toLowerCase()); setCatOpen(false); }}>
                      {t(cat) || cat}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lang-picker-box">
            <div className="lang-current-lux" onClick={() => setLangOpen(!langOpen)}>
              <img src={currentLang.flag} alt={currentLang.name} className="flag-main-lux" />
              <ChevronDown size={14} className="chevron-lux" />
            </div>

            <AnimatePresence>
              {langOpen && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="lang-dropdown-lux">
                  {languages.map((l) => (
                    <div key={l.code} className="lang-item-lux" onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}>
                      <img src={l.flag} alt={l.name} className="flag-mini-lux" />
                      <span>{l.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="search-box-wrap" style={{ position: 'relative' }}>
            <button className="icon-btn-lux" onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => document.getElementById('search-input')?.focus(), 100); }}><Search size={20} /></button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} style={{ position: 'absolute', top: 'calc(100% + 20px)', right: '-50px', width: '380px', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '24px', zIndex: 9999, border: '1px solid #eee', cursor: 'default' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                    <Search size={20} color="#999" style={{ marginRight: '15px' }} />
                    <input id="search-input" type="text" placeholder={t('search_placeholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', fontSize: '1.1rem', fontWeight: 600, border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Outfit', sans-serif", color: '#000' }} autoComplete="off" />
                    {searchQuery.length > 0 && <X size={20} color="#999" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />}
                  </div>
                  
                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '400px', overflowY: 'auto' }}>
                    {searchQuery.trim().length > 1 && products.filter(p => (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                      <Link to={`/product/${p.id}`} key={p.id} onClick={() => { setSearchOpen(false); setSearchQuery(''); }} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', borderRadius: '12px', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.background='#f9f9f9'} onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}>
                        <div style={{ width: '56px', height: '56px', background: '#f8f8f8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', flexShrink: 0 }}>
                          <img src={p.image || 'https://via.placeholder.com/60'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.2, color: '#000' }}>{p.name}</span>
                      </Link>
                    ))}
                    {searchQuery.trim().length > 1 && products.filter(p => (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                      <div style={{ textAlign: 'center', color: '#999', fontSize: '0.95rem', padding: '20px 0' }}>
                        {t('no_results')}
                      </div>
                    )}
                    {searchQuery.trim().length <= 1 && (
                      <div style={{ textAlign: 'center', color: '#ccc', fontSize: '0.95rem', padding: '20px 0' }}>
                        {t('type_to_search')}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="cart-lux" onClick={() => setCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--primary)', color: '#fff', padding: '0.7rem 1.4rem', borderRadius: '50px', cursor: 'pointer', border: 'none', fontWeight: 700 }}>
            <ShoppingBag size={20} />
            <span>({totalCartItems})</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            style={{
              position: 'fixed', bottom: '40px', left: '50%',
              background: 'var(--primary)', color: '#fff', padding: '12px 24px',
              borderRadius: '50px', fontSize: '1rem', fontWeight: 700,
              zIndex: 99999, boxShadow: '0 10px 30px rgba(120, 190, 32, 0.4)',
              pointerEvents: 'none'
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 10000, backdropFilter: 'blur(5px)' }} onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '450px', height: '100%', background: '#fff', zIndex: 10001, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>{t('cart_title', { count: totalCartItems })}</h2>
                <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000' }}><X size={28} /></button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#999', marginTop: '50px', fontSize: '1.2rem', fontWeight: 600 }}>{t('cart_empty')}</div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                      <div style={{ width: '85px', height: '85px', background: '#f8f8f8', borderRadius: '16px', padding: '12px', flexShrink: 0 }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 800, lineHeight: 1.2 }}>{item.name}</h4>
                        {item.flavor && <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>{t('flavor_label')}: {item.flavor}</p>}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>£{(item.price * item.quantity).toFixed(2)}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#f8f8f8', padding: '6px 12px', borderRadius: '50px' }}>
                            <button onClick={() => updateCartQty(item.id, item.flavor, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1.2rem' }}>-</button>
                            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.quantity}</span>
                            <button onClick={() => updateCartQty(item.id, item.flavor, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1.2rem' }}>+</button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.flavor)} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.color='#ff4d4f'} onMouseLeave={(e)=>e.currentTarget.style.color='#aaa'}><X size={20} /></button>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div style={{ padding: '30px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.4rem', fontWeight: 900 }}>
                    <span>{t('checkout_total')}</span>
                    <span>£{totalCartPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                    style={{ width: '100%', padding: '1.3rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '24px', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 20px rgba(120, 190, 32, 0.2)', transition: 'transform 0.2s' }} 
                    onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-2px)'} 
                    onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}
                  >
                    {t('procedi')}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>



      <Routes>
        <Route path="/" element={<Home products={products} t={t} addToCart={addToCart} />} />
        <Route path="/product/*" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} />} />
        <Route path="/products/*" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} totalItems={totalCartItems} totalPrice={totalCartPrice} navigate={navigate} t={t} />} />
        <Route path="/policies/refund-policy" element={<RefundPolicy />} />
        <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/policies/terms-of-service" element={<TermsOfService />} />
        <Route path="/pages/do-not-sell-or-share-my-personal-information" element={<DoNotSell />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/policies/contact-information" element={<Contact />} />
      </Routes>

      <footer className="footer-lux" style={{ borderTop: '1px solid #1a1a1a', background: 'var(--text-main)', color: 'white' }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem 3rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
            <div>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img src="/herbalife-logo.png" alt="Herbalife Logo" style={{ height: '36px', filter: 'brightness(0) invert(1)', marginBottom: '1.5rem', cursor: 'pointer' }} />
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem', maxWidth: '380px' }}>
                <a href="https://wa.me/41763665607" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#25D366', color: '#fff', textDecoration: 'none', padding: '14px 24px', borderRadius: '50px', fontSize: '1rem', fontWeight: 800, transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  {t('whatsapp_contact')}
                </a>

                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.08)', padding: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', marginTop: '0.5rem' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '10px' }}>
                    <Mail size={18} color="#999" />
                    <input type="email" placeholder={t('hero_email_placeholder')} style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.95rem', color: '#fff' }} className="footer-email-input" />
                  </div>
                  <button style={{ background: 'var(--primary)', color: '#fff', padding: '0.8rem 1.4rem', borderRadius: '50px', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} className="footer-email-btn">
                    <span>{t('hero_join')}</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>{t('quick_links')}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <li><Link to="/policies/refund-policy" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s', ':hover': { color: '#fff' } }}>{t('policy_refund')}</Link></li>
                <li><Link to="/policies/privacy-policy" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('policy_privacy')}</Link></li>
                <li><Link to="/policies/terms-of-service" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('policy_terms')}</Link></li>
                <li><Link to="/pages/do-not-sell-or-share-my-personal-information" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('policy_nosell')}</Link></li>
                <li><Link to="/pages/contact" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('policy_contact')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #333', paddingTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <PaymentIcons />
            <p style={{ color: '#666', fontSize: '0.8rem', textAlign: 'center', lineHeight: 1.8 }}>
              © 2026, Giangiacomo Cristanelli · <Link to="/policies/privacy-policy" style={{color:'#666', textDecoration:'none'}}>{t('policy_privacy')}</Link> · <Link to="/policies/contact-information" style={{color:'#666', textDecoration:'none'}}>{t('policy_contact')}</Link> · <Link to="/policies/refund-policy" style={{color:'#666', textDecoration:'none'}}>{t('policy_refund')}</Link> · <Link to="/policies/terms-of-service" style={{color:'#666', textDecoration:'none'}}>{t('policy_terms')}</Link>
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .navbar { z-index: 5000 !important; }
        .nav-actions-lux { display: flex; align-items: center; gap: 2rem; }
        .lang-picker-box { position: relative; cursor: pointer; padding: 10px 0; }
        .lang-current-lux { display: flex; align-items: center; gap: 6px; }
        .flag-main-lux { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border); }
        .lang-dropdown-lux { position: absolute; top: 100%; right: 0; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); border: 1px solid #eee; padding: 6px; min-width: 160px; z-index: 9999; }
        .lang-item-lux { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; transition: background 0.2s; font-size: 0.85rem; }
        .lang-item-lux:hover { background: #f5f5f5; }
        .flag-mini-lux { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; }
        
        .icon-btn-lux { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; }
        .cart-lux { display: flex; align-items: center; gap: 10px; background: var(--primary); color: #fff; padding: 0.7rem 1.4rem; border-radius: 50px; cursor: pointer; border: none; font-weight: 700; }
        
        .hero-sub { color: var(--primary); font-weight: 700; letter-spacing: 4px; text-transform: uppercase; font-size: 0.9rem; }
        .hero-title-lux { font-family: 'Outfit', sans-serif; font-size: 5.5rem; font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; }
        .hero-p-lux { color: #666; font-size: 1.25rem; max-width: 800px; margin: 0 auto 3.5rem; line-height: 1.7; }
        
        .hero-email-form { display: flex; background: white; padding: 0.5rem; border-radius: 50px; max-width: 580px; margin: 0 auto; box-shadow: 0 15px 45px rgba(0,0,0,0.06); border: 1px solid #eee; }
        .email-input-wrap { flex: 1; display: flex; align-items: center; padding: 0 1.5rem; gap: 10px; }
        .email-input-wrap input { border: none; outline: none; width: 100%; font-family: inherit; font-size: 1.1rem; }
        .email-join-btn { background: var(--primary); color: #fff; padding: 1rem 2.4rem; border-radius: 50px; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .category-nav { display: flex; justify-content: center; gap: 3.5rem; padding: 4.5rem 0; margin-bottom: 6rem; }
        .cat-visual-btn { width: 105px; height: 105px; border-radius: 50%; overflow: hidden; border: 3px solid #fff; box-shadow: 0 15px 35px rgba(0,0,0,0.1); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .cat-bubble:hover .cat-visual-btn { transform: translateY(-10px) scale(1.1); border-color: var(--primary); }
        .cat-btn-img { width: 100%; height: 100%; object-fit: cover; }
        .cat-btn-label { display: block; margin-top: 15px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #999; }
        .footer-lux a:hover { color: #fff !important; }
        .footer-email-input::placeholder { color: #888; }
        .footer-email-btn:hover { background: #eee !important; }
        .global-announcement-lux {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 3000;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          font-family: 'Outfit', sans-serif;
        }
        .global-announcement-lux.hide {
          transform: translateY(-100%);
        }
        .announcement-row {
          text-align: center;
          padding: 8px;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }
        .top-ann { background: #fff; color: #000; border-bottom: 1px solid #111; }
        .bot-ann { background: #a0ffea; color: #000; }
      `}</style>
    </div>
  );
};

export default App;
