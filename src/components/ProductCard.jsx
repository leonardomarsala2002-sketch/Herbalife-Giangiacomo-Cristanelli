import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, addToCart, cartItems = [] }) => {
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
    setTimeout(() => setIsAdding(false), 800);
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
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
      viewport={{ once: true }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25,
        default: { duration: 0.4 } 
      }}
      className="card-lux"
      onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}
      style={{ 
        borderRadius: '24px', 
        overflow: 'hidden', 
        cursor: 'pointer',
        background: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}
    >
      <div className="img-box-lux" style={{ 
        height: '160px', 
        padding: '0.8rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        background: 'transparent'
      }}>
        {!product.available && <span className="sold-out-badge">{t('sold_out')}</span>}
        <img 
          src={image} 
          alt={product.name} 
          style={{ objectFit: 'contain', width: '100%', height: '100%', transition: 'all 0.4s ease' }} 
        />
      </div>
      
      <div className="card-info-lux" style={{ padding: '0.6rem 0.8rem 0.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span className="p-type-lux" style={{ 
          fontSize: '0.6rem', 
          letterSpacing: '2px', 
          textTransform: 'uppercase', 
          fontWeight: 700, 
          display: 'block', 
          color: 'var(--primary)',
          marginBottom: '0.2rem'
        }}>{t(product.type) || product.type}</span>
        
        <div style={{ minHeight: '2.8rem' }}>
          <h3 className="p-title-lux" style={{ 
            fontSize: '0.95rem', 
            fontWeight: 800, 
            lineHeight: 1.25, 
            margin: '0.1rem 0 0',
            color: 'var(--text-main)',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>{product.name}</h3>
        </div>

        <div style={{ minHeight: '2.5rem', marginTop: '0.5rem' }}>
          {product.isGrouped && product.variants?.length > 1 ? (
             <div 
               className="flavor-nav-lux" 
               style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '5px', scrollbarWidth: 'none' }}
               onClick={(e) => e.stopPropagation()} // Prevent navigation when selecting flavor
             >
               {product.variants.map((v, idx) => (
                 <div 
                   key={idx}
                   onClick={() => setSelectedVariant(v)}
                   style={{ 
                     width: '18px', 
                     height: '18px', 
                     borderRadius: '50%', 
                     border: selectedVariant?.id === v.id ? '2px solid var(--primary)' : '1px solid #ddd',
                     background: '#f9f9f9',
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: '2px',
                     flexShrink: 0
                   }}
                   title={v.flavor}
                 >
                   <img src={v.image} alt={v.flavor} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                 </div>
               ))}
             </div>
          ) : null}
          {selectedVariant && (
            <span style={{ fontSize: '0.65rem', color: '#777', fontWeight: 700, display: 'block', marginTop: '4px' }}>
               {selectedVariant.flavor}
            </span>
          )}
        </div>
        
        <div className="p-footer-lux" style={{ 
          borderTop: '1px solid #f0f0f0', 
          paddingTop: '0.8rem', 
          display: 'flex', 
          flexDirection: 'column',
          gap: '12px',
          marginTop: 'auto'
        }}>
          <div className="p-price-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#999', textDecoration: 'line-through', fontWeight: 600, opacity: 0.7 }}>
                £{(price * 1.2).toFixed(2)}
              </span>
              <span className="p-price-val" style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                £{price.toFixed(2)}
              </span>
            </div>
            {isInCart && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fff4', padding: '4px 10px', borderRadius: '50px', border: '1px solid var(--primary)' }}>
                <div onClick={(e) => updateQuantity(e, -1)} style={{ cursor: 'pointer', fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', width: '20px', textAlign: 'center' }}>−</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)', minWidth: '15px', textAlign: 'center' }}>{cartItem.quantity}</span>
                <div onClick={(e) => updateQuantity(e, 1)} style={{ cursor: 'pointer', fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', width: '20px', textAlign: 'center' }}>+</div>
              </div>
            )}
          </div>
          
          <motion.button 
            onClick={(e) => { 
                e.stopPropagation(); 
                if (isInCart) { navigate('/checkout'); } else { handleAddToCart(e); }
            }}
            className={`add-cart-btn-lux ${isAdding || isInCart ? 'active' : ''}`}
            animate={{ 
              scale: [1, 1.04, 1],
              boxShadow: (isAdding || isInCart)
                ? ['0 4px 20px rgba(120, 190, 32, 0.4)', '0 10px 30px rgba(120, 190, 32, 0.6)', '0 4px 20px rgba(120, 190, 32, 0.4)']
                : ['0 4px 15px rgba(120, 190, 32, 0.1)', '0 8px 25px rgba(120, 190, 32, 0.3)', '0 4px 15px rgba(120, 190, 32, 0.1)']
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ 
              width: '100%',
              padding: '12px 15px',
              background: (isAdding || isInCart) ? 'var(--primary)' : '#fff',
              color: (isAdding || isInCart) ? '#fff' : 'var(--primary)',
              border: '2px solid var(--primary)',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
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
                <ShoppingCart size={22} fill="currentColor" />
              </motion.div>
            )}

            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {!isAdding && !isInCart && <ShoppingCart size={18} />}
              <motion.span
                animate={isAdding ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {(isAdding || isInCart) ? (t('buy_now') || 'Compra ora') : (t('add_to_cart') || 'Aggiungi al carrello')}
              </motion.span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
