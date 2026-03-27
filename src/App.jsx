import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';
import { ShoppingCart, Search, ArrowUpRight, ChevronDown, Mail, X, ArrowLeft, Phone, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductCard from './components/ProductCard';
import { RefundPolicy, PrivacyPolicy, TermsOfService, DoNotSell, Contact } from './components/Policies';
import { PaymentIcons } from './components/PaymentIcons';
import './App.css';

// Helper for smooth scrolling
const slugify = (text) => {
  if (!text) return "";
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};


const MemberDisclosure = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
      }}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        style={{
          background: 'white',
          width: '100%', maxWidth: '850px',
          borderRadius: '4px',
          padding: '4px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        <div style={{ border: '3px solid #78BE20', padding: '40px 30px', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute', top: '15px', right: '15px',
              background: '#78BE20', color: 'white', border: 'none',
              width: '24px', height: '24px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '14px', fontWeight: '900'
            }}
          >
            x
          </button>
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <p style={{ color: '#666', fontSize: '0.95rem', margin: '0 0 10px' }}>This website is operated by the following Herbalife Independent Member:</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#000' }}>Giangiacomo Cristanelli</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px' }}>EXISTING CUSTOMER?</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444' }}>
                Your one-to-one relationship with your personal Member is key to meeting your nutrition goals. 
                If Giangiacomo Cristanelli is not your personal Member, we encourage you to purchase 
                your products from your existing Member. Alternatively, <span onClick={onClose} style={{ fontWeight: 800, textDecoration: 'underline', cursor: 'pointer' }}>click here</span> to continue.
              </p>
            </div>
            <div style={{ height: '100%', background: '#eee' }} />
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px' }}>ALREADY A MEMBER?</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444' }}>To purchase via your own account please visit MyHerbalife.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UpsellModal = ({ isOpen, onClose, product, products, addToCart, navigate, t, createCheckout }) => {
  if (!isOpen || !product) return null;

  const handleCheckoutOriginal = () => {
    onClose();
    if (window.location.pathname === '/checkout') {
       createCheckout && createCheckout();
    } else {
       navigate('/checkout');
    }
  };

  const handleAddAndCheckout = (upsellProd) => {
    addToCart(upsellProd, 1, null, false, true); // isUpsell=true
    onClose();
    if (window.location.pathname === '/checkout') {
       createCheckout && createCheckout();
    } else {
       navigate('/checkout');
    }
  };

  const suggested = products
    .filter(p => (p.type === product.type || p.type === 'Accessories') && p.id !== product.id)
    .slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100001,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(15px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
      }}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        style={{ width: '100%', maxWidth: '850px', position: 'relative' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="premium-tag-lux" style={{ color: 'var(--primary)', letterSpacing: '8px', fontWeight: 900, fontSize: '0.9rem', display: 'block', marginBottom: '1.5rem', textTransform: 'uppercase' }}>OFFERTA EXCLUSIVA</span>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#000' }}>
            Completa il tuo kit e <span style={{ color: 'var(--primary)' }}>risparmia il 20%</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1.5rem', fontWeight: 600 }}>Aggiungi uno di questi prodotti consigliati e ricevi uno sconto immediato del 20% sul totale aggiunto.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {suggested.map(p => (
            <div key={p.id} className="upsell-card-lux" style={{ background: '#fff', padding: '2.5rem', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)', display: 'flex', gap: '25px', alignItems: 'center', position: 'relative' }}>
              <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 10px' }}>{p.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through' }}>£{p.price.toFixed(2)}</span>
                  <span style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: 900 }}>£{(p.price * 0.8).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => handleAddAndCheckout(p)}
                  style={{ marginTop: '15px', background: 'var(--primary)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(120, 190, 32, 0.2)' }}
                >
                  Aggiungi e vai al pagamento
                </button>
              </div>
              <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#ff4d4d', color: '#fff', padding: '5px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 900 }}>-20%</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={handleCheckoutOriginal} style={{ fontSize: '1rem', fontWeight: 800, color: '#888', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            No grazie, procedi senza sconto
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};




const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.lenis) {
    window.lenis.start();
    window.lenis.scrollTo(el, { offset: -100, duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return true;
};

const Home = ({ products, t, addToCart, cartItems, scrollYProgress, triggerUpsell }) => {
  const navigate = useNavigate();
  
  // LOGO SCROLL ANIMATIONS: -20% in Hero (0.8) -> +60% in Sections (1.6)
  // Animation finishes much faster (10% of total scroll) to be ready for the first section
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1.6]);
  const logoBlur = useTransform(scrollYProgress, [0, 0.1], [0, 10]);
  
  // HERO CONTENT GRADUAL VANISH ON SCROLL: Drifts up and fades out
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -200]);
  
  const catPriority = [t('cat_kits'), t('cat_shakes'), t('cat_protein'), t('cat_tea_aloe'), t('cat_sport'), t('cat_skin'), t('cat_snacks'), t('cat_accessories')];
  const dynamicCategories = [...new Set(products.map(p => p.type).filter(type => typeof type === 'string' && type.trim() !== ''))]
    .sort((a, b) => {
      const idxA = catPriority.indexOf(a);
      const idxB = catPriority.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

  const popularProducts = products.filter(p => [
    'Formula 1 Nutritional Shake Mix',
    'Herbal Tea Concentrate',
    'Aloe Concentrate',
    'Formula 1 Free From',
    'High Protein Iced Coffee'
  ].some(name => (p.name || '').includes(name) || (p.originalTitle || '').includes(name))).slice(0, 6);

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
      <section className="hero-lux" style={{ textAlign: 'center', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'visible' }}>
        
        {/* Background Logo Dynamic */}
        <motion.div 
           className="hero-bg-icon-lux" 
           style={{ 
             position: 'fixed', 
             top: '60%', 
             left: '50%', 
             transformOrigin: 'center center',
             x: '-50%',
             y: '-50%',
             width: '85vh', 
             height: '85vh', 
             opacity: 0.15, 
             pointerEvents: 'none', 
             zIndex: 0,
             scale: logoScale,
             mixBlendMode: 'multiply',
             filter: useTransform(logoBlur, b => `blur(${b}px)`)
           }}
        >
          <motion.img 
            src="/herbalife-official-precise.png" 
            alt="Official Herbalife Logo"
            animate={{ 
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </motion.div>


        <motion.div 
           className="hero-content-lux" 
           style={{ 
             position: 'relative', 
             zIndex: 2,
             opacity: heroOpacity,
             y: heroY,
             scale: heroScale
           }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="hero-title-lux"
            style={{ 
              fontFamily: "'Mrs Saint Delafield', cursive", 
              fontSize: '8.5rem', 
              fontWeight: 400, 
              lineHeight: 0.9,
              marginBottom: '0px',
              color: '#1a1a1a',
              textTransform: 'none'
            }}
          >
            {t('hero_title')}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p style={{ 
              fontFamily: "'Outfit', sans-serif", 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              letterSpacing: '5px', 
              textTransform: 'uppercase', 
              color: '#888',
              marginBottom: '3rem',
              marginTop: '-65px'
            }}>
              Giangiacomo Cristanelli
            </p>
 
            <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.98 }}
               style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: 'var(--primary)', color: '#fff', padding: '1.2rem 2.8rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1rem', boxShadow: '0 15px 35px rgba(120, 190, 32, 0.25)', border: 'none' }}
               onClick={() => {
                 const firstSection = dynamicCategories[0];
                 if (firstSection) {
                    const el = document.getElementById(slugify(firstSection));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                 }
               }}
            >
              <span>{t('hero_view_products') || 'Visualizza i prodotti'}</span>
              <ChevronDown size={22} strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
 
      <div style={{ height: '8rem' }} /> {/* Extra spacing before catalog */}
 
      {dynamicCategories.map((catName) => {
        const catProducts = products.filter(p => p.type === catName);
        if (catProducts.length === 0) return null;
        const sectionId = slugify(catName);

        return (
          <motion.div 
            key={sectionId} id={sectionId} className="section-wrapper-lux" 
            style={{ marginBottom: '6rem', position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="dynamic-section-title-lux" style={{ marginBottom: '4rem', paddingLeft: '1rem', borderLeft: '4px solid var(--primary)' }}>
              <span className="premium-tag-lux" style={{ color: 'var(--primary)', letterSpacing: '4px', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' }}>{t('premium_formula')}</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginTop: '10px' }}>{catName}</h2>
            </div>
            <div className="grid-lux">
              {catProducts.map(p => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} cartItems={cartItems} triggerUpsell={triggerUpsell} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const ProductPage = ({ products, loading, t, quantity, setQuantity, addToCart, cartItems, triggerUpsell }) => {
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
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCartDetail = () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart && addToCart(product, quantity, currentFlavor, false); // Just add to cart silently first
    setTimeout(() => {
      setIsAdding(false);
    }, 900);
  };

  useEffect(() => {
    // Redundant - handled in App component
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

  const isInCart = cartItems.some(item => 
    item.id === product.id && 
    (!product.isGrouped || item.flavor === currentFlavor)
  );

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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.1rem', color: '#999', textDecoration: 'line-through', fontWeight: 700, opacity: 0.7, marginBottom: '5px' }}>
                £{(currentPrice * 1.2).toFixed(2)}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="price-tag-lux" style={{ display: 'inline-block', background: 'var(--primary)', color: '#fff', padding: '10px 24px', borderRadius: '16px', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>
                  £{currentPrice.toFixed(2)}
                </div>
                {isInCart && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#f0fff4', padding: '8px 20px', borderRadius: '50px', border: '2px solid var(--primary)' }}>
                    <div onClick={(e) => { e.stopPropagation(); addToCart && addToCart(product, -1, currentFlavor); }} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', width: '25px', textAlign: 'center' }}>−</div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)', minWidth: '20px', textAlign: 'center' }}>
                       {cartItems.find(i => i.id === product.id && (!product.isGrouped || i.flavor === currentFlavor))?.quantity || 1}
                    </span>
                    <div onClick={(e) => { e.stopPropagation(); addToCart && addToCart(product, 1, currentFlavor); }} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', width: '25px', textAlign: 'center' }}>+</div>
                  </div>
                )}
              </div>
            </div>
            
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '3rem' }}>
            <motion.button 
              onClick={(e) => {
                e.stopPropagation();
                if (isInCart) {
                  // "Compra ora" -> trigger upsell
                  triggerUpsell(product);
                } else {
                  // "Aggiungi al carrello" -> silent add
                  handleAddToCartDetail();
                }
              }}
              className={`cart-btn-main-lux ${isAdding || isInCart ? 'active' : ''}`}
              animate={{ 
                scale: [1, 1.04, 1],
                boxShadow: (isAdding || isInCart) 
                  ? ['0 6px 25px rgba(120, 190, 32, 0.5)', '0 12px 35px rgba(120, 190, 32, 0.7)', '0 6px 25px rgba(120, 190, 32, 0.5)']
                  : ['0 4px 15px rgba(120, 190, 32, 0.1)', '0 8px 25px rgba(120, 190, 32, 0.3)', '0 4px 15px rgba(120, 190, 32, 0.1)']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ 
                flex: 1, 
                padding: '1.2rem', 
                background: (isAdding || isInCart) ? 'var(--primary)' : '#fff', 
                color: (isAdding || isInCart) ? '#fff' : 'var(--primary)', 
                border: '2px solid var(--primary)', 
                borderRadius: '50px', 
                fontSize: '1.1rem', 
                fontWeight: 800, 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '15px', 
                whiteSpace: 'nowrap',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.5s ease, color 0.5s ease'
              }} 
            >
              {/* LINEAR CART CROSSING */}
              {isAdding && (
                <motion.div
                  initial={{ left: '-20%' }}
                  animate={{ left: '120%' }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    color: '#fff'
                  }}
                >
                  <ShoppingCart size={28} fill="currentColor" />
                </motion.div>
              )}

              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                {!isAdding && !isInCart && <ShoppingCart size={22} />}
                <motion.span 
                  animate={isAdding ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {isInCart ? (t('buy_now') || 'Compra ora') : (t('add_to_cart') || 'Aggiungi al carrello')}
                </motion.span>
              </span>
            </motion.button>
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

const Checkout = ({ cartItems, totalItems, totalPrice, navigate, t, createCheckout, triggerUpsell }) => {
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
                  <p style={{ margin: 0, fontWeight: 800, display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {item.quantity} x 
                    <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.85rem' }}>£{(item.price * 1.2).toFixed(2)}</span>
                    <span>£{item.price.toFixed(2)}</span>
                  </p>
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
              <span style={{ color: totalPrice < 65 ? 'var(--text-main)' : 'var(--primary)', fontWeight: 800 }}>
                {totalPrice < 65 ? '£8.00' : t('free')}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>
            <span>{t('total')}</span>
            <span>£{(totalPrice + (totalPrice < 65 ? 8 : 0)).toFixed(2)}</span>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', color: '#666' }}>{t('secure_payments')}</span>
            <PaymentIcons />
          </div>

          <button style={{ width: '100%', padding: '1.4rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 30px rgba(120, 190, 32, 0.3)', transition: 'all 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'} onClick={() => triggerUpsell()}>
            {t('pay_now')}
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryStickyBar = ({ categories, scrolled, t, location, navigate, scrollToSection }) => {
  // ICON MAPPING FOR CATEGORY BUBBLES
  const iconMap = {
    [t('cat_kits')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/colaz_mix_2000_1000px_488bd7b0-8c29-4702-86ee-9279090b848c.png", // Balanced Breakfast Kit
    [t('cat_shakes')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/f1_vaniglia_2000x2000_f9f65839-8472-4648-9363-2252c8846353.png", // F1 Shake
    [t('cat_protein')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/PDM_2000x2000_27f10da9-f642-4f38-89c5-3a7cb4587630.png", // PDM
    [t('cat_tea_aloe')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/inf_lim_2000_2000px_f30abbdc-881c-425d-bb86-d250f2fb9f60.png", // Tea
    [t('cat_sport')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/h24_cr7_2000x2000_91b1eb8e-4286-44ca-873b-e3c3b5fa7757.png", // Sport H24
    [t('cat_skin')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/Herbal_Aloe_bath_and_body_ritual_set_main_e-com.png", // Skin
    [t('cat_snacks')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/chips_cipolla_2000_2000px_60cb469c-5056-4dc4-b14e-98aecc51c911.png", // Snacks
    [t('cat_accessories')]: "https://cdn.shopify.com/s/files/1/0611/5891/6263/products/super_shaker_mix_2000_2000px_9876f2d2-8182-4aa8-93ea-872e482382fe.png" // Accessories
  };

  return (
    <motion.div 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky-bubble-bar ${scrolled ? 'is-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: scrolled ? 'calc(1rem + 72px + 12px)' : 'calc(100px + 72px + 15px)', 
        left: '50%',
        transform: 'translateX(-50%)',
        width: scrolled ? '95%' : '90%',
        maxWidth: '1200px',
        zIndex: 4900,
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(35px) saturate(180%)',
        borderRadius: '80px', // Extra round
        border: '1.5px solid rgba(120, 190, 32, 0.1)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
        padding: '10px 2.5rem',
        height: '105px', // Tall enough for bubbles + labels
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
    >
      <div style={{ 
        display: 'flex', 
        gap: '2.5rem', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflowX: 'auto', 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        width: '100%',
        height: '100%',
        padding: '0 10px'
      }}>
        {categories.map(cat => (
          <motion.div
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const sectionId = slugify(cat);
              if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: sectionId } });
              } else {
                scrollToSection(sectionId);
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              flexShrink: 0,
              minWidth: '70px'
            }}
          >
            <div style={{ 
              width: '55px', 
              height: '55px', 
              borderRadius: '50%', 
              background: '#fff', 
              border: '2.5px solid #fff',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
              padding: '6px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e)=>e.currentTarget.style.borderColor='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.borderColor='#fff'}>
              <img src={iconMap[cat] || 'https://via.placeholder.com/60'} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ 
              fontSize: '0.6rem', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.8px', 
              color: '#333',
              textAlign: 'center',
              width: '100%',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>{cat}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
const App = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showDisclosure, setShowDisclosure] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('herbalife_disclosure_seen');
    if (!hasSeen) {
      setShowDisclosure(true);
    }
  }, []);

  const handleCloseDisclosure = () => {
    localStorage.setItem('herbalife_disclosure_seen', 'true');
    setShowDisclosure(false);
  };
  const [langOpen, setLangOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selFlavors, setSelFlavors] = useState({ shakes: [], teas: [] });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellTarget, setUpsellTarget] = useState(null);

  const triggerUpsell = (targetProduct = null) => {
    if (!targetProduct && cartItems.length > 0) {
      setUpsellTarget(cartItems[0]);
    } else {
      setUpsellTarget(targetProduct);
    }
    setShowUpsell(true);
  };



  const catPriority = [t('cat_kits'), t('cat_shakes'), t('cat_protein'), t('cat_tea_aloe'), t('cat_sport'), t('cat_skin'), t('cat_snacks'), t('cat_accessories')];
  const dynamicCategories = [...new Set(products.map(p => p.type).filter(type => typeof type === 'string' && type.trim() !== ''))]
    .sort((a, b) => {
      const idxA = catPriority.indexOf(a);
      const idxB = catPriority.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

  const addToCart = (product, qty = 1, flavor = null, buyNow = false, isUpsell = false) => {
    let finalVariantId = product.variantId;
    let finalImage = product.image;
    let finalPrice = isUpsell ? product.price * 0.8 : product.price;

    if (product.isGrouped && flavor) {
      const match = product.variants.find(v => v.flavor === flavor);
      if (match) {
        finalVariantId = match.variantId;
        finalImage = match.image;
        if (!isUpsell) finalPrice = match.price;
        else finalPrice = match.price * 0.8;
      }
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.flavor === flavor);
      if (existing) {
        const newQty = existing.quantity + qty;
        if (newQty <= 0) {
          return prev.filter(item => !(item.id === product.id && item.flavor === flavor));
        }
        return prev.map(item => item === existing ? { ...item, quantity: newQty } : item);
      }
      if (qty <= 0) return prev;
      return [...prev, { ...product, variantId: finalVariantId, price: finalPrice, image: finalImage, quantity: qty, flavor, isUpsell }];
    });

    if (buyNow) {
      setCartOpen(false);
      navigate('/checkout');
    } else {
      setToastType(qty > 0 ? 'success' : 'error');
      setToastMessage(qty > 0 ? (t('add_to_cart') + ' ✓') : (t('removed_from_cart') || 'Tolto dal carrello'));
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const removeFromCart = (id, flavor) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.flavor === flavor)));
    setToastType('error');
    setToastMessage(t('removed_from_cart') || 'Tolto dal carrello');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateCartQty = (id, flavor, delta) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id && item.flavor === flavor);
      if (existing) {
        const newQty = existing.quantity + delta;
        
        if (newQty <= 0) {
          setToastType('error');
          setToastMessage(t('removed_from_cart') || 'Tolto dal carrello');
          setTimeout(() => setToastMessage(null), 3000);
          return prev.filter(item => !(item.id === id && item.flavor === flavor));
        }

        if (delta > 0) {
          setToastType('success');
          setToastMessage(t('add_to_cart') + ' ✓');
          setTimeout(() => setToastMessage(null), 3000);
        }

        return prev.map(item => item === existing ? { ...item, quantity: newQty } : item);
      }
      return prev;
    });
  };

  const createCheckout = async () => {
    const SHOP = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
    const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
    
    // Prepare lines for the modern Cart API
    const lines = cartItems
      .filter(item => item.variantId || (item.id && item.id.includes('ProductVariant')))
      .map(item => ({
        merchandiseId: item.variantId || item.id,
        quantity: item.quantity
      }));

    if (lines.length === 0) {
      alert("Nessun prodotto valido nel carrello per il checkout.");
      return;
    }

    const mutation = `
      mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            code
            field
            message
          }
        }
      }
    `;

    try {
      const response = await fetch(`https://${SHOP}/api/2024-04/graphql.json?t=${Date.now()}`, {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          query: mutation,
          variables: { input: { lines } }
        })
      });
      const result = await response.json();
      console.log('Shopify Cart Checkout Full Result:', result);
      
      const res = result.data?.cartCreate;
      if (res?.cart?.checkoutUrl) {
        window.location.href = res.cart.checkoutUrl;
      } else if (res?.userErrors?.length > 0) {
        const errors = res.userErrors.map(e => e.message).join('\n');
        alert('Shopify Cart Error:\n' + errors);
      } else if (result.errors) {
        alert('Shopify GraphQL Error:\n' + result.errors.map(e => e.message).join('\n'));
      } else {
        alert('Errore imprevisto durante la creazione del carrello Shopify.');
      }
    } catch (e) {
      console.error(e);
      alert('Impossibile collegarsi a Shopify: ' + e.message);
    }
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
      const currentLang = i18n.language.toUpperCase(); // IT, EN, etc.
      
      const query = `
        query getProducts($language: LanguageCode) @inContext(language: $language) {
          products(first: 250) {
            edges {
              node {
                id
                title
                description
                productType
                availableForSale
                variants(first: 20) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
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
        }
      `;
      try {
        const response = await fetch(`https://${SHOP}/api/2024-04/graphql.json?t=${Date.now()}`, {
          method: 'POST',
          headers: {
            'X-Shopify-Storefront-Access-Token': TOKEN,
            'Content-Type': 'application/json',
            'Accept-Language': i18n.language
          },
          body: JSON.stringify({ 
            query,
            variables: { language: currentLang }
          })
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
          'Instant Herbal Beverage': 'prod_tea',
          'Protein Drink Mix': 'prod_pdm',
          'Super Shaker': 'prod_shaker',
          'Balanced Breakfast Kit': 'prod_kit_colazione',
          'Protein Chips': 'prod_chips',
          'Protein Bar': 'prod_bars_snack',
          'Tri Blend Select': 'prod_tri_blend'
        };

        const translateKeywords = (str) => {
          if (!str) return str;
          // Avoid redundant replacements for Kits & Packs
          if (str.toLowerCase().includes('kit') && str.toLowerCase().includes('pack')) {
            return t('cat_kits');
          }
          let result = str;
          const keywords = [
            "Meal Replacement", "Meal Bar", "Personal Care", "Sports Drink", "Energy Drink", 
            "Herbal Beverage", "Skin Supplement", "Sports Supplement", "Protein Bar", "Protein Snack", 
            "Protein Supplement", "Ideal Breakfast", "Nutritional Shake Mix", "Protein Drink",
            "Accessory", "Skincare", "Wellness Drink", "Supplement", "Bundle", "Shaker", "Green"
          ];
          keywords.forEach(kw => {
            const regex = new RegExp(kw, 'gi');
            const translation = t(kw);
            if (translation && translation !== kw) {
              result = result.replace(regex, translation);
            }
          });
          return result;
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
          // If Shopify provides a translated title, trust it.
          // We only use PRODUCT_MAP to find the i18n key for grouping if needed.
          const mappedNameKey = Object.keys(PRODUCT_MAP).find(k => k === node.title || t(PRODUCT_MAP[k]) === node.title);
          const mappedTypeKey = Object.keys(CAT_MAP).find(k => k === node.productType || t(CAT_MAP[k]) === node.productType);
          
          const firstVariant = node.variants.edges[0]?.node;
          
          return {
            id: node.id,
            variantId: firstVariant?.id,
            name: translateKeywords(node.title), // TRUST SHOPIFY TRANSLATION + KEYWORD FALLBACK
            originalTitle: node.title,
            description: node.description || t('premium_formula'), // TRUST SHOPIFY TRANSLATION
            type: (mappedTypeKey ? t(CAT_MAP[mappedTypeKey]) : translateKeywords(node.productType) || t('Wellness')), // TRUST SHOPIFY TRANSLATION
            price: parseFloat(firstVariant?.price.amount || 0),
            available: node.availableForSale && firstVariant?.availableForSale,
            image: node.images.edges[0]?.node.url || 'https://via.placeholder.com/600',
            gallery: node.images.edges.map(e => e.node.url),
            allVariants: node.variants.edges.map(e => ({
              id: e.node.id,
              title: e.node.title,
              price: parseFloat(e.node.price.amount),
              available: e.node.availableForSale
            }))
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
            let existingGrp = groupedProducts.find(p => p.originalTitle === matchedBase && Math.abs(p.price - product.price) < 0.01);
            if (existingGrp) {
              existingGrp.variants.push({
                id: product.id,
                variantId: product.variantId,
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
                originalName: product.name,
                name: t(PRODUCT_MAP[matchedBase]) || matchedBase,
                originalTitle: matchedBase,
                isGrouped: true,
                variants: [{
                  id: product.id,
                  variantId: product.variantId,
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

        groupedProducts.sort((a, b) => (a.originalTitle || a.name || "").localeCompare(b.originalTitle || b.name || ""));

        setProducts(groupedProducts || []);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchShopify();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t, i18n.language]);

  // Reset page state on navigation
  useLayoutEffect(() => {
    setQuantity(1);
    
    // Check if we need to scroll to a section (passed via state)
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        const success = scrollToSection(location.state.scrollTo);
        if (success) {
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 300); // Wait for products to load/render
      return; 
    }

    // Crucial: Use immediate scroll for page changes to avoid seeing the bottom
    if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.lang-picker-box') && langOpen) {
        setLangOpen(false);
      }
      if (!event.target.closest('.search-box-wrap') && searchOpen) {
        setSearchOpen(false);
      }
      if (!event.target.closest('.cat-picker-lux') && catOpen) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    if (catOpen || searchOpen) {
      document.documentElement.classList.add('no-scroll-lux');
      if (window.lenis) window.lenis.stop();
    } else {
      document.documentElement.classList.remove('no-scroll-lux');
      if (window.lenis) window.lenis.start();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.documentElement.classList.remove('no-scroll-lux');
      if (window.lenis) window.lenis.start();
    };
  }, [langOpen, searchOpen, catOpen]);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="app">
      <AnimatePresence>
        {showDisclosure && <MemberDisclosure onClose={handleCloseDisclosure} />}
        {showUpsell && (
          <UpsellModal 
            key="upsell"
            isOpen={showUpsell} 
            onClose={() => setShowUpsell(false)} 
            product={upsellTarget} 
            products={products}
            addToCart={addToCart}
            navigate={navigate}
            t={t}
            createCheckout={createCheckout}
          />
        )}
      </AnimatePresence>

      {/* GLOBAL FULL-WIDTH ANNOUNCEMENT BANNER - VISIBILE QUANDO NON SCROLLATO IN TUTTE LE PAGINE */}
      <div className={`global-announcement-lux ${scrolled ? 'hide' : ''}`}>
        <div className="announcement-row top-ann">
          {t('announcement_top_row')}
        </div>
        <div className="announcement-row bot-ann">
          {t('announcement_bottom_row')}
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(35px) saturate(180%)',
        WebkitBackdropFilter: 'blur(35px) saturate(180%)'
      }}>
        {/* SVG BORDER CHASE EFFECT - DUAL BEAMS */}
        <div style={{ position: 'absolute', inset: -2, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 0 }}>
          <svg width="calc(100% + 4px)" height="calc(100% + 4px)" style={{ position: 'absolute', top: -2, left: -2 }}>
            <rect 
              x="2.5" y="2.5" 
              width="calc(100% - 5px)" height="calc(100% - 5px)" 
              pathLength="100"
              rx={window.innerWidth <= 1024 ? 20 : (scrolled ? 24 : 40)} 
              fill="none" 
              stroke="var(--primary)" 
              strokeWidth="1.5" 
              strokeDasharray="40 10 40 10"
              style={{
                strokeDashoffset: 100,
                animation: 'borderChase 12s linear infinite'
              }}
            />
          </svg>
          <style>{`
            @keyframes borderChase {
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>

        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="logo-container" style={{ cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/herbalife-logo.png" alt="Herbalife Logo" className="logo-lux" style={{ height: scrolled ? '28px' : '38px', transition: 'all 0.4s' }} />
        </Link>

        <div className="nav-actions-lux">
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
            <button className="icon-btn-lux search-trigger-lux" onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => document.getElementById('search-input')?.focus(), 100); }}><Search size={22} /></button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="search-dropdown-lux" style={{ position: 'absolute', top: 'calc(100% + 20px)', right: '-50px', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', padding: '24px', zIndex: 9999, border: '1px solid #eee', cursor: 'default' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                    <Search size={20} color="#999" style={{ marginRight: '15px' }} />
                    <input id="search-input" type="text" placeholder={t('search_placeholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', fontSize: '1.1rem', fontWeight: 600, border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Outfit', sans-serif", color: '#000' }} autoComplete="off" />
                    {searchQuery.length > 0 && <X size={20} color="#999" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />}
                  </div>
                  
                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '400px', overflowY: 'auto', scrollbarWidth: 'none' }} data-lenis-prevent>
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
          <motion.button 
            className="cart-lux" 
            onClick={() => setCartOpen(true)} 
            animate={totalCartItems > 0 ? {
              scale: [1, 1.05, 1],
              boxShadow: ['0 4px 15px rgba(120, 190, 32, 0.2)', '0 8px 30px rgba(120, 190, 32, 0.4)', '0 4px 15px rgba(120, 190, 32, 0.2)']
            } : { scale: 1, boxShadow: 'none' }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: totalCartItems > 0 ? 'var(--primary)' : '#fff', 
              color: totalCartItems > 0 ? '#fff' : 'var(--primary)', 
              padding: '0.7rem 1.4rem', 
              borderRadius: '50px', 
              cursor: 'pointer', 
              border: totalCartItems > 0 ? 'none' : '2px solid var(--primary)', 
              fontWeight: 800,
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            <ShoppingCart size={20} />
            <span>({totalCartItems})</span>
          </motion.button>
        </div>
      </nav>

      <CategoryStickyBar 
        categories={dynamicCategories} 
        scrolled={scrolled} 
        t={t} 
        location={location} 
        navigate={navigate} 
        scrollToSection={scrollToSection} 
      />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            style={{
              position: 'fixed', bottom: '40px', left: '50%',
              background: toastType === 'error' ? '#ff4d4d' : 'var(--primary)', 
              color: '#fff', padding: '12px 24px',
              borderRadius: '50px', fontSize: '1rem', fontWeight: 700,
              zIndex: 99999, 
              boxShadow: toastType === 'error' ? '0 10px 30px rgba(255, 77, 77, 0.4)' : '0 10px 30px rgba(120, 190, 32, 0.4)',
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
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.8rem', fontWeight: 600 }}>£{(item.price * 1.2 * item.quantity).toFixed(2)}</span>
                            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>£{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
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
                    onClick={() => { setCartOpen(false); triggerUpsell(); }}
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
        <Route path="/" element={<Home products={products} t={t} addToCart={addToCart} cartItems={cartItems} scrollYProgress={scrollYProgress} triggerUpsell={triggerUpsell} />} />
        <Route path="/product/*" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} cartItems={cartItems} triggerUpsell={triggerUpsell} />} />
        <Route path="/products/*" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} cartItems={cartItems} triggerUpsell={triggerUpsell} />} />
        <Route path="/product/:id" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} cartItems={cartItems} triggerUpsell={triggerUpsell} />} />
        <Route path="/products/:id" element={<ProductPage products={products} loading={loading} t={t} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} cartItems={cartItems} triggerUpsell={triggerUpsell} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} totalItems={totalCartItems} totalPrice={totalCartPrice} navigate={navigate} t={t} createCheckout={createCheckout} triggerUpsell={triggerUpsell} />} />
        <Route path="/policies/refund-policy" element={<RefundPolicy />} />
        <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/policies/terms-of-service" element={<TermsOfService />} />
        <Route path="/pages/do-not-sell-or-share-my-personal-information" element={<DoNotSell />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/policies/contact-information" element={<Contact />} />
      </Routes>

      <footer className="footer-lux" style={{ borderTop: '1px solid #1a1a1a', background: 'var(--text-main)', color: 'white', position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="container" 
          style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem 3rem' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
            <div>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none', marginBottom: '2.5rem' }}>
                <img src="/herbalife-logo.png" alt="Herbalife Logo" style={{ height: '36px', filter: 'brightness(0) invert(1)', cursor: 'pointer' }} />
                <div style={{ width: '1px', height: '100px', background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ textAlign: 'left', lineHeight: 1.6, fontSize: '0.85rem', color: '#888' }}>
                  <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.2rem', marginBottom: '4px' }}>Giangiacomo Cristanelli</div>
                  <div style={{ fontStyle: 'normal' }}>Via al Poggio 5, 6834 Morbio Inferiore</div>
                  <div style={{ fontStyle: 'normal' }}>Ticino, Svizzera</div>
                  <div style={{ marginTop: '8px', fontWeight: 700, color: 'var(--primary)' }}>Tel: +41 763665607</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>info@hlshopnow.com</div>
                </div>
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
        </motion.div>
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
        .global-announcement-lux .announcement-row {
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default App;
