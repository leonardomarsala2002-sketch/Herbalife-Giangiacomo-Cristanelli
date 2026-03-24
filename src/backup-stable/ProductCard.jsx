import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product, onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-lux"
      onClick={() => onClick(product)}
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
          margin: '0.4rem 0 1rem 0',
          color: 'var(--text-main)',
          minHeight: '3rem'
        }}>{product.name}</h3>
        
        <div className="p-footer-lux" style={{ 
          borderTop: '1px solid #f0f0f0', 
          paddingTop: '1.2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div className="p-price-box" style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
            <span className="p-price-label" style={{ fontSize: '0.8rem', color: '#999', fontWeight: 500 }}>{t('price')}</span>
            <span className="p-price-val" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>£{product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
