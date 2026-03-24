import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
      style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', transition: 'all 0.4s', cursor: 'pointer' }}
    >
      <div className="img-box-lux" style={{ 
        background: '#fff', 
        height: '350px', 
        padding: '2rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative'
      }}>
        {!product.available && <span className="sold-out-badge">{t('sold_out')}</span>}
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ objectFit: 'contain', width: '100%', height: '100%', transition: 'transform 0.6s ease' }} 
        />
      </div>
      
      <div className="card-info-lux" style={{ padding: '1.5rem 2rem' }}>
        <span className="p-type-lux" style={{ 
          fontSize: '0.7rem', 
          letterSpacing: '3px', 
          textTransform: 'uppercase', 
          fontWeight: 700, 
          display: 'block', 
          color: 'var(--primary)',
          marginBottom: '0.8rem'
        }}>{product.type}</span>
        
        <h3 className="p-title-lux" style={{ 
          fontSize: '1.2rem', 
          fontWeight: 600, 
          lineHeight: 1.3, 
          margin: '0.4rem 0 0.8rem 0',
          color: 'var(--text-main)',
          minHeight: '2.5rem'
        }}>{product.name}</h3>

        {product.isGrouped && product.variants?.length > 1 ? (
          <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
            {product.variants.length} Opzioni / Gusti disponibili
          </span>
        ) : (
          <div style={{ height: '1rem', marginBottom: '1rem' }}></div>
        )}
        
        <div className="p-footer-lux" style={{ 
          borderTop: '1px solid #f0f0f0', 
          paddingTop: '1.2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div className="p-price-box" style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="p-price-val" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {product.isGrouped && product.variants?.length > 1 ? 'Da £' : '£'}{product.price.toFixed(2)}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart && addToCart(product); }} 
              style={{ background: '#f8f8f8', color: '#000', border: '1px solid #eee', padding: '8px 14px', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
              onMouseEnter={(e)=>e.currentTarget.style.background='#eee'} 
              onMouseLeave={(e)=>e.currentTarget.style.background='#f8f8f8'} 
              title="Aggiungi al carrello"
            >
              🛒
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart && addToCart(product, 1, null, true); }} 
              style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 800, transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
              onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 15px rgba(0,0,0,0.2)';}} 
              onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 10px rgba(0,0,0,0.1)';}}
            >
              Compra
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
