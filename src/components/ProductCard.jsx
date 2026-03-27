import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronDown } from 'lucide-react';

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
    }, 800);
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
        borderRadius: '32px', 
        overflow: 'hidden', 
        cursor: 'pointer',
        background: '#fff',
        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="img-box-lux" style={{ 
        width: '100%',
        aspectRatio: '1/1',
        padding: '2rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative'
      }}>
        {!product.available && <span className="sold-out-badge">{t('sold_out')}</span>}
        <img 
          src={image} 
          alt={product.name} 
          style={{ objectFit: 'contain', width: '100%', height: '100%', transition: 'all 0.4s ease' }} 
        />
      </div>
      
      <div className="card-info-lux" style={{ padding: '0 1.5rem 2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{ 
          fontSize: '0.8rem', 
          letterSpacing: '3px', 
          textTransform: 'uppercase', 
          fontWeight: 800, 
          display: 'block', 
          color: 'var(--primary)',
          marginBottom: '0.6rem'
        }}>{t(product.type) || product.type}</span>
        
        <div style={{ minHeight: '3.8rem' }}>
          <h3 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 800, 
            lineHeight: 1.2,
            margin: '0 0 15px',
            color: '#000',
            letterSpacing: '-0.02em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>{product.name}</h3>
        </div>

        {product.isGrouped && (
          <div className="flavor-chip-lux" style={{ marginBottom: '2rem', position: 'relative' }}>
             <select 
               onClick={(e) => e.stopPropagation()}
               onChange={(e) => {
                 const v = product.variants.find(v => v.flavor === e.target.value);
                 if (v) setSelectedVariant(v);
               }}
               value={flavor}
               style={{ 
                 width: '100%',
                 background: '#f4f7f6', 
                 padding: '12px 18px', 
                 borderRadius: '16px', 
                 fontSize: '0.9rem', 
                 fontWeight: 700, 
                 color: '#555', 
                 border: '1px solid #eee',
                 appearance: 'none',
                 cursor: 'pointer'
               }}
             >
               {product.variants.map(v => (
                 <option key={v.id} value={v.flavor}>{v.flavor}</option>
               ))}
             </select>
             <ChevronDown size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.3 }} />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #f2f2f2' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: '#ccc', textDecoration: 'line-through', fontWeight: 600 }}>£{(price * 1.2).toFixed(2)}</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#000', letterSpacing: '-0.03em' }}>£{price.toFixed(2)}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isInCart ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0fff4', padding: '8px 14px', borderRadius: '50px', border: '1.5px solid var(--primary)' }}>
                  <div onClick={(e) => updateQuantity(e, -1)} style={{ cursor: 'pointer', fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)', width: '20px', textAlign: 'center' }}>−</div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', minWidth: '15px', textAlign: 'center' }}>{cartItem.quantity}</span>
                  <div onClick={(e) => updateQuantity(e, 1)} style={{ cursor: 'pointer', fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)', width: '20px', textAlign: 'center' }}>+</div>
                </div>

                <motion.button 
                  onClick={handleBuyClick}
                  whileHover={{ scale: 1.05 }}
                  style={{ 
                    padding: '10px 18px',
                    background: 'var(--primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(120, 190, 32, 0.3)'
                  }}
                >
                  Compra<br/>ora
                </motion.button>
              </>
            ) : (
              <motion.button 
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                style={{ 
                  padding: '10px 22px',
                  background: '#fff',
                  color: 'var(--primary)',
                  border: '2px solid var(--primary)',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ textAlign: 'center' }}>Aggiungi al<br/>carrello</div>
                <ShoppingCart size={18} strokeWidth={2.5} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
