import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <img src="/hero.png" alt="Herbalife Lifestyle" className="hero-img" />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-content"
        >
          <div className="hero-badge">
            <Leaf size={14} className="badge-icon" />
            <span>Nutrizione di alta qualità</span>
          </div>
          <h1 className="hero-title">
            Trasforma la tua <br />
            <span className="accent">Vita Oggi</span>
          </h1>
          <p className="hero-description">
            Scopri la gamma completa di prodotti Herbalife per il controllo del peso, l'energia e il benessere quotidiano. Raggiungi i tuoi obiettivi con il nostro supporto.
          </p>
          <div className="hero-actions">
            <button className="btn-primary hero-btn">
              Esplora i Prodotti <ArrowRight size={18} className="btn-icon" />
            </button>
            <button className="btn-secondary hero-btn-alt">
              Piani Personalizzati
            </button>
          </div>

          <div className="hero-features">
            <div className="feature">
              <Shield size={20} className="feature-icon" />
              <span>Prodotti Originali</span>
            </div>
            <div className="feature">
              <Truck size={20} className="feature-icon" />
              <span>Consegna 24/48h</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero {
          height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: var(--black);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          filter: grayscale(10%) contrast(105%);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%);
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(120, 190, 32, 0.2);
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
        }

        .hero-title {
          font-size: 4.5rem;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
        }

        .hero-title .accent {
          color: var(--primary);
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--gray-300);
          margin-bottom: 2.5rem;
          max-width: 500px;
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        @media (max-width: 640px) {
          .hero-actions {
            flex-direction: column;
          }
        }

        .hero-btn {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .hero-btn-alt {
          background: transparent;
          color: var(--white);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.8rem 2rem;
          font-weight: 600;
          border-radius: 4px;
          text-transform: uppercase;
          transition: all 0.2s;
        }

        .hero-btn-alt:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--white);
        }

        .hero-features {
          display: flex;
          gap: 2.5rem;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--gray-300);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .feature-icon {
          color: var(--primary);
        }
      `}</style>
    </section>
  );
};

export default Hero;
