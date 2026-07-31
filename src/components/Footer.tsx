import React from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { GithubIcon } from './Icons';
import { profileData } from '../data/profile';

const FOOTER_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    value: 'AlephSc',
    href: 'https://github.com/AlephSc',
    external: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '0815-1513-5960',
    href: 'https://wa.me/6281515135960',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@alepjir',
    href: 'https://instagram.com/alepjir',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'alephsc25@gmail.com',
    href: 'mailto:alephsc25@gmail.com',
    external: false,
  },
] as const;

function LinkIcon({ id }: { id: string }) {
  if (id === 'github') return <GithubIcon size={16} />;
  if (id === 'email') return <Mail size={16} />;
  if (id === 'whatsapp') return <Phone size={16} />;
  // Instagram — simple glyph via CSS circle mark
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

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
            © {new Date().getFullYear()} — Portofolio pribadi · Software Engineer
          </span>
        </div>

        <nav className="footer-links" aria-label="Kontak & sosial">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="footer-link"
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              title={`${link.label}: ${link.value}`}
            >
              <span className="footer-link-icon">
                <LinkIcon id={link.id} />
              </span>
              <span className="footer-link-text">
                <span className="footer-link-label">{link.label}</span>
                <span className="footer-link-value">{link.value}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="footer-right">
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Kembali ke atas">
            <span>Kembali ke Atas</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-root {
          position: relative;
          z-index: 10;
          padding: 2.75rem 0 2.5rem;
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-subtle);
        }

        .footer-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.75rem 2rem;
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 200px;
        }

        .footer-brand {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .footer-copy {
          font-size: 0.85rem;
          color: var(--text-muted);
          max-width: 280px;
          line-height: 1.45;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem 0.85rem;
          flex: 1 1 280px;
          justify-content: center;
        }

        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.55rem 0.85rem;
          border-radius: 10px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          text-decoration: none;
          transition: border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease, transform 0.2s ease;
          min-height: 44px;
        }

        .footer-link:hover {
          border-color: var(--color-accent);
          color: var(--text-primary);
          background-color: var(--bg-card-hover);
          transform: translateY(-2px);
        }

        .footer-link-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          flex-shrink: 0;
          transition: color 0.7s ease;
        }

        .footer-link-text {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
          line-height: 1.2;
        }

        .footer-link-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .footer-link-value {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: inherit;
        }

        .footer-right {
          display: flex;
          align-items: center;
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          min-height: 44px;
          border-radius: 8px;
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-to-top-btn:hover {
          color: var(--text-primary);
          border-color: var(--color-accent);
          background-color: var(--bg-tertiary);
          transform: translateY(-2px);
        }

        @media (max-width: 720px) {
          .footer-container {
            flex-direction: column;
            align-items: stretch;
          }

          .footer-links {
            justify-content: flex-start;
          }

          .footer-right {
            justify-content: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};
