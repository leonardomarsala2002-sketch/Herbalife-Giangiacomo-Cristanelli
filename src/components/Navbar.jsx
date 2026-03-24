import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'glass is-scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo">
          <span className="logo-text">HERBA<span className="accent">LIFE</span></span>
          <span className="logo-sub">Distributore Indipendente</span>
        </div>

        <div className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Prodotti</a>
          <a href="#" className="nav-link">Chi Siamo</a>
          <a href="#" className="nav-link">Contatti</a>
        </div>

        <div className="nav-actions">
          <button className="nav-icon"><User size={20} /></button>
          <button className="nav-icon"><Heart size={20} /></button>
          <div className="cart-container">
            <button className="nav-icon cart-btn">
              <ShoppingCart size={20} />
              <span className="cart-count">3</span>
            </button>
          </div>
          <button className="nav-icon mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
          >
            <a href="#" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#" onClick={() => setIsOpen(false)}>Prodotti</a>
            <a href="#" onClick={() => setIsOpen(false)}>Chi Siamo</a>
            <a href="#" onClick={() => setIsOpen(false)}>Contatti</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .is-scrolled {
          padding: 0.8rem 0;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: var(--black);
        }

        .logo-text .accent {
          color: var(--primary);
        }

        .logo-sub {
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          color: var(--secondary);
          margin-top: 2px;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
        }

        @media (max-width: 968px) {
          .nav-links {
            display: none;
          }
        }

        .nav-link {
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--secondary);
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: width 0.3s;
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .nav-icon {
          background: transparent;
          color: var(--black);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .nav-icon:hover {
          transform: scale(1.1);
          color: var(--primary);
        }

        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: var(--primary);
          color: var(--white);
          font-size: 0.6rem;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-btn {
          display: none;
        }

        @media (max-width: 968px) {
          .mobile-menu-btn {
            display: flex;
          }
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-top: 1px solid var(--gray-100);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }

        .mobile-menu a {
          font-weight: 700;
          font-size: 1.2rem;
          text-transform: uppercase;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
