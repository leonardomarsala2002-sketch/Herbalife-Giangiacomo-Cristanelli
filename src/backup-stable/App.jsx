import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, ArrowUpRight, ChevronDown, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductCard from './components/ProductCard';
import './App.css';

const App = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png' }
  ];

  const categories = [
    { id: 'kits', name: t('cat_kits'), img: '/kits_banner.png' },
    { id: 'shakes', name: t('cat_shakes'), img: '/shakes_banner.png' },
    { id: 'protein', name: t('cat_protein'), img: '/protein_banner.png' },
    { id: 'tea_aloe', name: t('cat_tea_aloe'), img: '/tea_aloe_banner.png' },
    { id: 'sport', name: t('cat_sport'), img: '/sport_banner.png' },
    { id: 'skin', name: t('cat_skin'), img: '/skin_banner.png' },
    { id: 'snacks', name: t('cat_snacks'), img: '/snacks_banner.png' },
    { id: 'accessories', name: t('cat_accessories'), img: '/accessories_banner.png' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchShopify = async () => {
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
        const formatted = result.data.products.edges.map(({node}) => ({
          id: node.id,
          name: node.title,
          type: node.productType || 'Wellness',
          price: parseFloat(node.variants.edges[0]?.node.price.amount || 0),
          available: node.availableForSale,
          image: node.images.edges[0]?.node.url || 'https://via.placeholder.com/600',
        }));
        setProducts(formatted);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchShopify();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
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

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} style={{cursor: 'pointer'}}>
          <img src="/herbalife-logo.png" alt="Herbalife Logo" className="main-logo" style={{height: scrolled ? '35px' : '48px', transition: 'all 0.3s'}} />
        </div>
        
        <div className="nav-actions-lux">
          <div className="lang-picker-box" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <div className="lang-current-lux">
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

          <button className="icon-btn-lux"><Search size={20} /></button>
          <button className="cart-lux">
            <ShoppingBag size={20} />
            <span>(2)</span>
          </button>
        </div>
      </nav>

      <div className="container" style={{maxWidth: '1400px', margin: '0 auto', padding: '0 2rem'}}>
        <section className="hero-lux" style={{textAlign: 'center', padding: '12rem 0 6rem'}}>
          <span className="hero-sub">{t('hero_sub')}</span>
          <h1 className="hero-title-lux" style={{margin: '1.5rem 0 2.5rem'}}>{t('hero_title')}</h1>
          <p className="hero-p-lux">{t('hero_p')}</p>
          
          <div className="hero-email-form">
            <div className="email-input-wrap">
              <Mail size={20} className="mail-icon-lux" />
              <input type="email" placeholder={t('hero_email_placeholder')} />
            </div>
            <button className="email-join-btn">
              {t('hero_join')} <ArrowUpRight size={18} />
            </button>
          </div>
        </section>

        <div className="category-nav">
          {categories.map((cat) => (
            <div key={cat.id} className="cat-bubble" onClick={() => scrollTo(cat.id)}>
              <div className="cat-visual-btn">
                <img src={cat.img} alt={cat.name} className="cat-btn-img" />
              </div>
              <span className="cat-btn-label">{cat.name}</span>
            </div>
          ))}
        </div>

        {categories.map((cat) => {
          const catProducts = products.filter(p => {
             const keywords = {
              kits: ['Kit', 'Bundle', 'Pack', 'Programme', '21 Day', 'Burn'],
              shakes: ['Formula 1', 'Shake', 'Meal Replacement'],
              protein: ['Protein', 'PDM', 'Drink Mix', 'Vegan'],
              tea_aloe: ['Tea', 'Aloe', 'Beverage', 'LiftOff'],
              sport: ['H24', 'Sport', 'Rebuild', 'CR7', 'Hydrate', 'Performance'],
              skin: ['SKIN', 'Face', 'Body', 'Eye Gel', 'Moisturiser', 'Collagen'],
              snacks: ['Bar', 'Chips', 'Savory', 'Snack'],
              accessories: ['Shaker', 'Scoop', 'Container', 'Spoon', 'Bottle', 'Measure', 'Mix']
            };
            return keywords[cat.id]?.some(k => p.name.includes(k));
          });
          if (catProducts.length === 0) return null;
          return (
            <div key={cat.id} id={cat.id} className="section-wrapper-lux" style={{marginBottom: '12rem'}}>
              <section className="section-header-box" style={{width: '100%', height: '450px', borderRadius: '40px', overflow: 'hidden', position: 'relative', marginBottom: '4.5rem'}}>
                <img src={cat.img} alt={cat.name} className="cat-banner-img" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <div className="cat-banner-overlay" style={{position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65), transparent)', display: 'flex', alignItems: 'center', padding: '0 6rem'}}>
                  <div>
                    <span className="premium-tag-lux" style={{color: 'var(--primary)', background: 'rgba(0,0,0,0.6)', padding: '6px 16px', borderRadius: '4px', backdropFilter: 'blur(10px)', fontWeight: 800, letterSpacing: '2px'}}>{t('premium_formula')}</span>
                    <h2 className="section-title-lux" style={{color: 'white', fontSize: '4.5rem', margin: '15px 0', textShadow: '0 5px 35px rgba(0,0,0,0.4)'}}>{cat.name}</h2>
                  </div>
                </div>
              </section>
              <div className="grid-lux">
                {catProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="footer-lux">
        <div className="container" style={{maxWidth: '1400px', margin: '0 auto', padding: '0 2rem'}}>
          <img src="/herbalife-logo.png" alt="Herbalife Logo" style={{height: '40px', filter: 'brightness(0) invert(1)', marginBottom: '2rem'}} />
          <p style={{color: '#999'}}>Premium nutrition for the modern human experience.</p>
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
        .cart-lux { display: flex; align-items: center; gap: 10px; background: #000; color: #fff; padding: 0.7rem 1.4rem; border-radius: 50px; cursor: pointer; border: none; font-weight: 700; }
        
        .hero-sub { color: var(--primary); font-weight: 700; letter-spacing: 4px; text-transform: uppercase; font-size: 0.9rem; }
        .hero-title-lux { font-family: 'Outfit', sans-serif; font-size: 5.5rem; font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; }
        .hero-p-lux { color: #666; font-size: 1.25rem; max-width: 800px; margin: 0 auto 3.5rem; line-height: 1.7; }
        
        .hero-email-form { display: flex; background: white; padding: 0.5rem; border-radius: 50px; max-width: 580px; margin: 0 auto; box-shadow: 0 15px 45px rgba(0,0,0,0.06); border: 1px solid #eee; }
        .email-input-wrap { flex: 1; display: flex; align-items: center; padding: 0 1.5rem; gap: 10px; }
        .email-input-wrap input { border: none; outline: none; width: 100%; font-family: inherit; font-size: 1.1rem; }
        .email-join-btn { background: #000; color: #fff; padding: 1rem 2.4rem; border-radius: 50px; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .category-nav { display: flex; justify-content: center; gap: 3.5rem; padding: 4.5rem 0; margin-bottom: 6rem; }
        .cat-visual-btn { width: 105px; height: 105px; border-radius: 50%; overflow: hidden; border: 3px solid #fff; box-shadow: 0 15px 35px rgba(0,0,0,0.1); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .cat-bubble:hover .cat-visual-btn { transform: translateY(-10px) scale(1.1); border-color: var(--primary); }
        .cat-btn-img { width: 100%; height: 100%; object-fit: cover; }
        .cat-btn-label { display: block; margin-top: 15px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #999; }
      `}</style>
    </div>
  );
}

export default App;
