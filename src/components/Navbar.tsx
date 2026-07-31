import React, { useState, useEffect } from 'react';
import { Sun, Moon, Flame, Menu, X } from 'lucide-react';
import type { Theme } from '../types';
import { profileData } from '../data/profile';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  isIntense: boolean;
  onToggleManualIntense: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  isIntense,
  onToggleManualIntense,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'journey', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Utama' },
    { id: 'about', label: 'Profil' },
    { id: 'journey', label: 'Perjalanan' },
    { id: 'projects', label: 'Proyek' },
    { id: 'skills', label: 'Keahlian' },
    { id: 'contact', label: 'Kontak' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <button onClick={() => scrollToSection('home')} className="navbar-brand" aria-label="Go to Home">
          <span className="brand-dot" />
          <span className="brand-name">{profileData.name}</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="navbar-menu-desktop">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`nav-link ${activeSection === link.id ? 'nav-link-active' : ''}`}
            >
              {link.label}
              {activeSection === link.id && <span className="active-line" />}
            </button>
          ))}
        </nav>

        {/* Actions (Theme & Intensity Toggle) */}
        <div className="navbar-actions">
          {/* Emotion / Intensity Mode Switch */}
          <button
            onClick={onToggleManualIntense}
            className={`intensity-toggle-btn ${isIntense ? 'intensity-toggle-active' : ''}`}
            title={isIntense ? 'State: Intense / Aggressive Growth (Orange)' : 'State: Normal / Focused'}
            aria-label="Toggle Emotion Intensity Mode"
          >
            <Flame className="intensity-icon" size={16} />
            <span className="intensity-label">
              {isIntense ? 'Intense' : 'Focus'}
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="container mobile-menu-content">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`mobile-nav-link ${activeSection === link.id ? 'mobile-nav-active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
          padding: 1.25rem 0;
          border-bottom: 1px solid transparent;
        }

        .navbar-scrolled {
          background-color: rgba(var(--bg-primary-rgb), 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.85rem 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .brand-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: var(--color-accent);
          transition: var(--transition-color-shift);
          box-shadow: 0 0 10px var(--color-accent);
        }

        .navbar-menu-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        @media (max-width: 868px) {
          .navbar-menu-desktop {
            display: none;
          }
        }

        .nav-link {
          position: relative;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.2s ease;
          padding: 0.25rem 0;
        }

        .nav-link:hover, .nav-link-active {
          color: var(--text-primary);
        }

        .active-line {
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--color-accent);
          border-radius: 2px;
          transition: var(--transition-color-shift);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .intensity-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.75rem;
          border-radius: 20px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-medium);
          transition: all 0.3s ease;
        }

        .intensity-toggle-active {
          background-color: rgba(255, 85, 0, 0.15);
          color: #FF6A00;
          border-color: #FF6A00;
          box-shadow: 0 0 12px rgba(255, 85, 0, 0.3);
        }

        .intensity-icon {
          transition: transform 0.3s ease;
        }

        .intensity-toggle-active .intensity-icon {
          transform: scale(1.15);
          color: #FF5500;
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          transition: all 0.2s ease;
        }

        .theme-toggle-btn:hover {
          border-color: var(--color-accent);
          background-color: var(--bg-tertiary);
        }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
        }

        @media (max-width: 868px) {
          .mobile-menu-btn {
            display: flex;
          }
        }

        .mobile-menu-drawer {
          position: fixed;
          top: 65px;
          left: 0;
          right: 0;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-medium);
          padding: 1.5rem 0;
          box-shadow: var(--shadow-subtle);
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-link {
          text-align: left;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.5rem 0;
        }

        .mobile-nav-active {
          color: var(--color-accent);
        }
      `}</style>
    </header>
  );
};
