import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Compass, Sparkles, Activity, Award } from 'lucide-react';
import { profileData } from '../data/profile';

const ROLES = ['Software Engineer', 'Lua Programmer', 'AI Prompt Engineer'];

export const Hero: React.FC<{ isFlipped: boolean; onFlip: () => void }> = ({ isFlipped, onFlip }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = ROLES[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length < targetText.length) {
        setDisplayText(targetText.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(targetText.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText.length === targetText.length) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        {/* Left Column: Text & Narrative */}
        <motion.div
          className="hero-text-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-status-pill hero-mask-pulse">
            <span className="status-dot" />
            <Activity size={13} className="text-emerald-400" />
            <span>Tersedia untuk tantangan & arsitektur sistem komputasi</span>
          </div>

          <h1 className="hero-name">
            {profileData.name}
          </h1>

          <div className="hero-role">
            <Terminal size={22} className="hero-role-icon" />
            <span className="typing-text">{displayText}</span>
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-description">
            {profileData.shortBio}
          </p>

          <div className="hero-cta-group">
            <button
              onClick={() => scrollToSection('journey')}
              className="btn btn-primary hero-btn"
            >
              <span>Jelajahi Perjalanan</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-secondary hero-btn"
            >
              <Compass size={18} />
              <span>Hubungi Saya</span>
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="hero-stats-strip">
            {profileData.stats.slice(0, 3).map((stat, idx) => (
              <div key={idx} className="hero-stat-item">
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Flippable Profile Card */}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="flip-hint">
            {isFlipped ? '// identitas intense' : '// klik untuk flip'}
          </span>

          <div
            className={`portrait-flip ${isFlipped ? 'is-flipped' : ''}`}
            onClick={onFlip}
            role="button"
            tabIndex={0}
            aria-label="Balik kartu profil"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onFlip();
              }
            }}
          >
            {/* FRONT — normal identity */}
            <div className="portrait-face portrait-front cyber-photo-glitch">
              <div className="portrait-border-glow" />
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="portrait-image"
                loading="eager"
              />
              <div className="scanlines-overlay" />
              <div className="portrait-badge">
                <Sparkles size={14} className="badge-icon" />
                <span>Personal Engineering Story</span>
              </div>
            </div>

            {/* BACK — intense identity */}
            <div className="portrait-face portrait-back">
              <div className="back-scanlines" />
              <div className="back-corner back-corner-tl" />
              <div className="back-corner back-corner-tr" />
              <div className="back-corner back-corner-bl" />
              <div className="back-corner back-corner-br" />
              <div className="back-content">
                <span className="back-tag">// intense mode</span>
                <h3 className="back-name">Fajar<br />Fristiawan</h3>
                <span className="back-role">Software Engineer</span>
                <div className="back-medal">
                  <Award size={18} />
                  <span>Perak — KRON 2025</span>
                </div>
                <p className="back-quote">"Tekanan jadi bahan bakar."</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 9rem;
          padding-bottom: 5rem;
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3.5rem;
          align-items: center;
        }

        @media (max-width: 968px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
        }

        .hero-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0.95rem;
          border-radius: 20px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-medium);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 968px) {
          .hero-status-pill {
            margin: 0 auto 1.5rem auto;
          }
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 10px #10B981;
        }

        .hero-name {
          font-size: clamp(2.75rem, 5.5vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .hero-role {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: clamp(1.2rem, 2.2vw, 1.5rem);
          font-weight: 600;
          color: var(--color-accent);
          margin-bottom: 1.5rem;
          min-height: 2.2rem;
          transition: var(--transition-color-shift);
        }

        @media (max-width: 968px) {
          .hero-role {
            justify-content: center;
          }
        }

        .hero-role-icon {
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .cursor-blink {
          font-family: var(--font-mono);
          font-weight: 300;
          color: var(--color-accent);
          animation: blink 1s step-end infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-description {
          font-size: 1.15rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 580px;
          margin-bottom: 2.25rem;
        }

        @media (max-width: 968px) {
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        @media (max-width: 968px) {
          .hero-cta-group {
            justify-content: center;
          }
        }

        .hero-btn {
          min-width: 180px;
        }

        .hero-stats-strip {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 968px) {
          .hero-stats-strip {
            justify-content: center;
            gap: 1.5rem;
          }
        }

        .hero-stat-item {
          display: flex;
          flex-direction: column;
        }

        .hero-stat-value {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .hero-stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.25rem;
        }

        .hero-image-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          position: relative;
          perspective: 1100px;
          gap: 0.6rem;
        }

        @media (max-width: 968px) {
          .hero-image-container {
            align-items: center;
          }
        }

        .flip-hint {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          opacity: 0.65;
          transition: color 0.5s ease, opacity 0.3s ease;
        }

        .portrait-flip {
          width: 100%;
          max-width: 380px;
          aspect-ratio: 1 / 1.1;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.4, 0.2, 0.2, 1);
          cursor: pointer;
        }

        .portrait-flip.is-flipped {
          transform: rotateY(180deg);
        }

        .portrait-flip:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 5px;
          border-radius: 18px;
        }

        .portrait-face {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-medium);
          background-color: var(--bg-card);
          box-shadow: var(--shadow-subtle);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .portrait-back {
          transform: rotateY(180deg);
          display: flex;
          align-items: flex-end;
          background:
            radial-gradient(ellipse at center, transparent 30%, rgba(120, 20, 0, 0.45) 100%),
            linear-gradient(160deg, #14060a 0%, #0c0407 100%);
          border-color: rgba(255, 85, 0, 0.35);
        }

        .back-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.22) 50%);
          background-size: 100% 4px;
          opacity: 0.35;
          z-index: 2;
        }

        .back-corner {
          position: absolute;
          width: 34px;
          height: 34px;
          z-index: 5;
        }

        .back-corner-tl { top: 0; left: 0; border-top: 2px solid rgba(255, 85, 0, 0.6); border-left: 2px solid rgba(255, 85, 0, 0.6); border-top-left-radius: 16px; }
        .back-corner-tr { top: 0; right: 0; border-top: 2px solid rgba(255, 85, 0, 0.45); border-right: 2px solid rgba(255, 85, 0, 0.45); border-top-right-radius: 16px; }
        .back-corner-bl { bottom: 0; left: 0; border-bottom: 2px solid rgba(255, 85, 0, 0.45); border-left: 2px solid rgba(255, 85, 0, 0.45); border-bottom-left-radius: 16px; }
        .back-corner-br { bottom: 0; right: 0; border-bottom: 2px solid rgba(255, 85, 0, 0.6); border-right: 2px solid rgba(255, 85, 0, 0.6); border-bottom-right-radius: 16px; }

        .back-content {
          position: relative;
          z-index: 4;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          width: 100%;
        }

        .back-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: rgba(255, 107, 133, 0.7);
        }

        .back-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.85rem;
          line-height: 1;
          color: #ff6a00;
          text-shadow: 0 0 25px rgba(255, 85, 0, 0.5);
          letter-spacing: -0.02em;
        }

        .back-role {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: rgba(255, 200, 170, 0.8);
          text-transform: uppercase;
        }

        .back-medal {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          background: rgba(255, 85, 0, 0.12);
          border: 1px solid rgba(255, 85, 0, 0.35);
          color: #ff8a3d;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          width: fit-content;
        }

        .back-quote {
          margin-top: 0.85rem;
          font-style: italic;
          font-size: 0.85rem;
          color: rgba(255, 180, 150, 0.7);
        }

        .portrait-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .cyber-photo-glitch:hover .portrait-image {
          animation: photo-rgb-glitch 2.5s ease-in-out infinite;
        }

        @keyframes photo-rgb-glitch {
          0%, 100% { filter: contrast(108%) brightness(0.95); transform: translate(0); }
          3% { filter: contrast(140%) brightness(1.1) drop-shadow(-4px 0 #00e5ff) drop-shadow(4px 0 #ff2846); transform: translate(-2px, 1px); }
          6% { filter: contrast(120%) brightness(1.05) drop-shadow(4px 0 #00e5ff) drop-shadow(-4px 0 #ff2846); transform: translate(2px, -1px); }
          9%, 50% { filter: contrast(108%) brightness(0.95); transform: translate(0); }
          53% { filter: contrast(150%) brightness(1.15) drop-shadow(-5px 0 #00e5ff) drop-shadow(5px 0 #ff2846); transform: translate(3px, 0); }
          56% { filter: contrast(108%) brightness(0.95); transform: translate(0); }
        }

        .scanlines-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
          background-size: 100% 4px;
          opacity: 0.4;
          z-index: 2;
        }

        .portrait-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          box-shadow: inset 0 0 0 1px var(--color-accent-glow);
          z-index: 3;
          transition: var(--transition-color-shift);
        }

        .portrait-badge {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          background-color: rgba(10, 13, 18, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-primary);
          z-index: 4;
        }

        .badge-icon {
          color: var(--color-accent);
        }
      `}</style>
    </section>
  );
};
