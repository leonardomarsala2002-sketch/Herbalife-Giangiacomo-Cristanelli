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
      // ALWAYS trigger upsell modal after adding as per user requirement
      triggerUpsell && triggerUpsell(product);
    }, 800);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    // Ensure product is in cart
    if (!isInCart) {
        addToCart && addToCart(product, 1, flavor);
    }
    // ALWAYS trigger upsell modal before checkout
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
        borderRadius: '24px', 
        overflow: 'hidden', 
        cursor: 'pointer',
        background: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="img-box-lux" style={{ 
        width: '100%',
        aspectRatio: '1/1',
        padding: '1.5rem', 
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
      
      <div className="card-info-lux" style={{ padding: '1rem 1.2rem 0.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span className="p-type-lux" style={{ 
          fontSize: '0.75rem', 
          letterSpacing: '3px', 
          textTransform: 'uppercase', 
          fontWeight: 700, 
          display: 'block', 
          color: 'var(--primary)',
          marginBottom: '0.4rem'
        }}>{t(product.type) || product.type}</span>
        
        <div style={{ minHeight: '3.5rem' }}>
          <h3 className="p-title-lux" style={{ 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            lineHeight: 1.1,
            margin: '0 0 10px',
            color: '#000',
            letterSpacing: '-0.02em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>{product.name}</h3>
        </div>

        {product.isGrouped && (
          <div className="flavor-chip-lux" style={{ marginBottom: '1.5rem' }}>
             <div style={{ background: '#f8faf9', padding: '10px 14px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, color: '#666', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eee' }} onClick={(e) => { e.stopPropagation(); }}>
               {flavor}
               <ChevronDown size={14} />
             </div>
          </div>
        )}

        <div className="p-price-box-lux" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f8f8f8' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', color: '#bbb', textDecoration: 'line-through', fontWeight: 700, marginBottom: '2px' }}>£{(price * 1.2).toFixed(2)}</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#000', letterSpacing: '-0.03em' }}>£{price.toFixed(2)}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isInCart && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f0fff4', padding: '6px 12px', borderRadius: '50px', border: '1.5px solid var(--primary)' }}>
                <div onClick={(e) => updateQuantity(e, -1)} style={{ cursor: 'pointer', fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)', width: '24px', textAlign: 'center' }}>−</div>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', minWidth: '16px', textAlign: 'center' }}>{cartItem.quantity}</span>
                <div onClick={(e) => updateQuantity(e, 1)} style={{ cursor: 'pointer', fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)', width: '24px', textAlign: 'center' }}>+</div>
              </div>
            )}
          </div>
          
          <motion.button 
            onClick={handleBuyClick}
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
              padding: '12px 20px',
              background: (isAdding || isInCart) ? 'var(--primary)' : '#fff',
              color: (isAdding || isInCart) ? '#fff' : 'var(--primary)',
              border: '2px solid var(--primary)',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {isInCart ? (t('buy_now') || 'Compra ora') : (t('add_to_cart') || 'Aggiungi')}
            {!isAdding && !isInCart && <ShoppingCart size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
