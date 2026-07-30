import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root">
      <div className="container footer-container">
        <div className="footer-left">
          <span className="footer-brand">{profileData.name}</span>
          <span className="footer-copy">
            © {new Date().getFullYear()} — Dirancang & dikembangkan secara personal tanpa template AI.
          </span>
        </div>

        <div className="footer-right">
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Kembali ke atas">
            <span>Kembali ke Atas</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-root {
          padding: 2.5rem 0;
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-subtle);
        }

        .footer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .footer-brand {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .footer-copy {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .back-to-top-btn:hover {
          color: var(--text-primary);
          border-color: var(--color-accent);
          background-color: var(--bg-tertiary);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
};
