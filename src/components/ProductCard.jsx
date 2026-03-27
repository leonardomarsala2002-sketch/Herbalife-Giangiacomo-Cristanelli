import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronDown, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, addToCart, cartItems = [], triggerUpsell }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [selectedVariant, setSelectedVariant] = React.useState(
    product.isGrouped ? product.variants[0] : null
  );

  const price = selectedVariant ? selectedVariant.price : product.price;
  const image = selectedVariant ? selectedVariant.image : product.image;
  const flavor = selectedVariant ? selectedVariant.flavor : null;

  const [isAdding, setIsAdding] = React.useState(false);

  const isInCart = cartItems.some(item => 
    item.id === product.id && 
    (!product.isGrouped || item.flavor === flavor)
  );
  
  const cartItem = cartItems.find(item => 
    item.id === product.id && 
    (!product.isGrouped || item.flavor === flavor)
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);
    addToCart && addToCart(product, 1, flavor);
    setTimeout(() => {
      setIsAdding(false);
    }, 900);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    // Buy action triggers upsell
    triggerUpsell && triggerUpsell(product);
  };

  const updateQuantity = (e, delta) => {
    e.stopPropagation();
    if (cartItem) {
      addToCart && addToCart(product, delta, flavor);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01, boxShadow: '0 25px 60px rgba(0,0,0,0.1)' }}
      viewport={{ once: true }}
      className="card-lux"
      onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}
      style={{ 
        borderRadius: '35px', overflow: 'hidden', cursor: 'pointer', background: '#fff',
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column'
      }}
    >
      <div style={{ width: '100%', aspectRatio: '1/1', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {!product.available && <span className="sold-out-badge">{t('sold_out')}</span>}
        <img src={image} alt={product.name} style={{ objectFit: 'contain', width: '100%', height: '100%', transition: 'all 0.4s ease' }} />
      </div>
      
      <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>{t(product.type) || product.type}</span>
        
        <div style={{ minHeight: '3.2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.1, margin: '0 0 10px', color: '#000', letterSpacing: '-0.02em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</h3>
        </div>

        {product.isGrouped && (
          <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
             <select 
               onClick={(e) => e.stopPropagation()}
               onChange={(e) => {
                 const v = product.variants.find(v => v.flavor === e.target.value);
                 if (v) setSelectedVariant(v);
               }}
               value={flavor}
               style={{ width: '100%', background: '#fafafa', padding: '8px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, color: '#666', border: '1px solid #f0f0f0', appearance: 'none', cursor: 'pointer' }}
             >
               {product.variants.map(v => (
                 <option key={v.id} value={v.flavor}>{v.flavor}</option>
               ))}
             </select>
             <ChevronDown size={14} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.3 }} />
          </div>
        )}

        <div style={{ marginTop: 'auto' }}>
          {/* PRICE ABOVE BUTTON */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.8rem', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', color: '#ddd', textDecoration: 'line-through', fontWeight: 700 }}>£{(price * 1.2).toFixed(2)}</span>
              <span style={{ fontSize: '1.7rem', fontWeight: 900, color: '#000', letterSpacing: '-0.03em' }}>£{price.toFixed(2)}</span>
            </div>

            {/* QUANTITY BADGE ABOVE BUTTON RIGHT side */}
            <AnimatePresence>
              {isInCart && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  style={{ 
                    position: 'absolute', right: 0, bottom: '2px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: '#f0fff4', padding: '5px 12px', 
                    borderRadius: '50px', border: '1.5px solid var(--primary)',
                    zIndex: 2, boxShadow: '0 5px 15px rgba(120, 190, 32, 0.1)'
                  }}
                >
                  <div onClick={(e) => updateQuantity(e, -1)} style={{ cursor: 'pointer', color: 'var(--primary)' }}><Minus size={12} strokeWidth={4} /></div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)', minWidth: '12px', textAlign: 'center' }}>{cartItem.quantity}</span>
                  <div onClick={(e) => updateQuantity(e, 1)} style={{ cursor: 'pointer', color: 'var(--primary)' }}><Plus size={12} strokeWidth={4} /></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            onClick={isInCart ? handleBuyClick : handleAddToCart}
            className="full-width-pulsing-btn"
            animate={{ 
              scale: isAdding ? [1, 0.98, 1] : [1, 1.02, 1],
              boxShadow: (isAdding || isInCart) 
                ? ['0 4px 15px rgba(120, 190, 32, 0.3)', '0 8px 25px rgba(120, 190, 32, 0.5)', '0 4px 15px rgba(120, 190, 32, 0.3)']
                : ['0 4px 10px rgba(120, 190, 32, 0.05)', '0 6px 15px rgba(120, 190, 32, 0.15)', '0 4px 10px rgba(120, 190, 32, 0.05)']
            }}
            transition={{ 
              scale: isAdding ? { duration: 0.2 } : { duration: 2, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              width: '100%', padding: '0.85rem', 
              background: (isAdding || isInCart) ? 'var(--primary)' : '#fff',
              color: (isAdding || isInCart) ? '#fff' : 'var(--primary)',
              border: '2px solid var(--primary)', borderRadius: '50px', 
              fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px',
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
            }}
          >
            {/* LINEAR CART CROSSING ANIMATION */}
            {isAdding && (
              <motion.div
                initial={{ left: '-20%' }}
                animate={{ left: '120%' }}
                transition={{ duration: 0.8, ease: "linear" }}
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 2, pointerEvents: 'none', color: '#fff' }}
              >
                <ShoppingCart size={22} fill="currentColor" />
              </motion.div>
            )}

            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {!isAdding && !isInCart && <ShoppingCart size={16} />}
              <span>{isInCart ? (t('buy_now') || 'Compra ora') : (t('add_to_cart') || 'Aggiungi al carrello')}</span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
