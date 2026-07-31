import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import type { Theme } from '../types';
import { profileData } from '../data/profile';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'education', 'journey', 'projects', 'skills', 'contact'];
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
    { id: 'education', label: 'Sekolah' },
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
        <button onClick={() => scrollToSection('home')} className="navbar-brand" aria-label="Go to Home">
          <span className="brand-dot" />
          <span className="brand-name">{profileData.name}</span>
        </button>

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

        <div className="navbar-actions">
          <button
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

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
          gap: 1rem;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          min-height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .brand-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: var(--color-accent);
          transition: var(--transition-color-shift);
          box-shadow: 0 0 10px var(--color-accent);
          flex-shrink: 0;
        }

        .navbar-menu-desktop {
          display: flex;
          align-items: center;
          gap: 1.35rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .navbar-menu-desktop {
            display: none;
          }
        }

        .nav-link {
          position: relative;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.2s ease;
          padding: 0.35rem 0;
          min-height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
        }

        .nav-link:hover, .nav-link-active {
          color: var(--text-primary);
        }

        .active-line {
          position: absolute;
          bottom: 2px;
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
          gap: 0.65rem;
          flex-shrink: 0;
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .theme-toggle-btn:hover {
          border-color: var(--color-accent);
          background-color: var(--bg-tertiary);
        }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
        }

        @media (max-width: 1024px) {
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
          gap: 0.35rem;
        }

        .mobile-nav-link {
          text-align: left;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.75rem 0;
          min-height: 44px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .mobile-nav-active {
          color: var(--color-accent);
        }
      `}</style>
    </header>
  );
};
