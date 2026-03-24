import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-lux"
      onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}
      style={{ borderRadius: '24px', overflow: 'hidden', transition: 'all 0.4s', cursor: 'pointer' }}
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
          src={product.image} 
          alt={product.name} 
          style={{ objectFit: 'contain', width: '100%', height: '100%', transition: 'transform 0.6s ease' }} 
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

        <div style={{ minHeight: '1.2rem', marginTop: '0.2rem' }}>
          {product.isGrouped && product.variants?.length > 1 ? (
            <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 600, display: 'block' }}>
              {product.variants.length} Opzioni Disponibili
            </span>
          ) : null}
        </div>
        
        <div className="p-footer-lux" style={{ 
          borderTop: '1px solid #f0f0f0', 
          paddingTop: '0.8rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: '10px',
          marginTop: 'auto'
        }}>
          <div className="p-price-box" style={{ flexShrink: 0 }}>
            <span className="p-price-val" style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              £{product.price.toFixed(2)}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart && addToCart(product); }} 
              className="icon-action-btn-lux"
              style={{ background: '#fff', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '8px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
              onMouseEnter={(e)=>{e.currentTarget.style.background='var(--primary)'; e.currentTarget.style.color='#fff';}} 
              onMouseLeave={(e)=>{e.currentTarget.style.background='#fff'; e.currentTarget.style.color='var(--primary)';}} 
              title={t('add_to_cart')}
            >
              <ShoppingBag size={18} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart && addToCart(product, 1, null, true); }} 
              style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 800, transition: 'all 0.3s', boxShadow: '0 4px 15px var(--primary-glow)', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.5px' }} 
              onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 20px var(--primary-glow)';}} 
              onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 15px var(--primary-glow)';}}
            >
              {t('compra') || 'Compra'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
