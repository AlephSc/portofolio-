import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, MapPin, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profile';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-header">
            <div className="section-label">
              <Mail size={16} />
              <span>Mari Terhubung</span>
            </div>
            <h2 className="contact-title">Mulai Diskusi Teknis atau Kolaborasi Proyek</h2>
            <p className="contact-subtitle">
              Saya selalu terbuka untuk mendiskusikan arsitektur web, tantangan sistem performa tinggi, atau peluang kerja sama.
            </p>
          </div>

          <div className={`contact-actions-grid ${profileData.contactEmail ? '' : 'contact-actions-single'}`}>
            {/* Direct Email Card */}
            {profileData.contactEmail && (
              <div className="email-action-box">
                <div className="box-icon-circle">
                  <Mail size={24} />
                </div>
                <div className="box-info">
                  <span className="info-label">Alamat Email Langsung</span>
                  <span className="email-address">{profileData.contactEmail}</span>
                </div>
                <div className="box-buttons">
                  <button onClick={handleCopyEmail} className="btn btn-secondary copy-btn">
                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    <span>{copied ? 'Tersalin!' : 'Salin Email'}</span>
                  </button>
                  <a
                    href={`mailto:${profileData.contactEmail}`}
                    className="btn btn-primary mail-btn"
                  >
                    <Send size={16} />
                    <span>Kirim Pesan</span>
                  </a>
                </div>
              </div>
            )}

            {/* Social Links & Location */}
            <div className="social-links-box">
              {profileData.location && (
                <div className="location-strip">
                  <MapPin size={18} className="loc-icon" />
                  <span>Berbasis di {profileData.location} (Waktu WIB / UTC+7)</span>
                </div>
              )}

              <div className="social-buttons-list">
                {profileData.socials.map((soc, sIdx) => (
                  <a
                    key={sIdx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    {soc.platform === 'GitHub' && <GithubIcon size={20} />}
                    {soc.platform === 'LinkedIn' && <LinkedinIcon size={20} />}
                    {soc.platform === 'Email' && <Mail size={20} />}
                    <div className="social-text">
                      <span className="social-platform">{soc.platform}</span>
                      <span className="social-username">@{soc.username}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-primary);
        }

        .contact-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 3.5rem 3rem;
          box-shadow: var(--shadow-subtle);
        }

        @media (max-width: 768px) {
          .contact-card {
            padding: 2rem 1.5rem;
          }
        }

        .contact-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3rem auto;
        }

        .contact-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
        }

        .contact-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .contact-actions-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2.5rem;
          align-items: center;
        }

        .contact-actions-single {
          grid-template-columns: 1fr;
        }

        @media (max-width: 868px) {
          .contact-actions-grid {
            grid-template-columns: 1fr;
          }
        }

        .email-action-box {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-medium);
          border-radius: 14px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .box-icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background-color: var(--color-accent-glow);
          color: var(--color-accent);
          transition: var(--transition-color-shift);
        }

        .box-info {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-family: var(--font-mono);
          font-size: 0.775rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .email-address {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.2rem;
        }

        .box-buttons {
          display: flex;
          gap: 0.85rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .social-links-box {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .location-strip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding: 0.85rem 1.25rem;
          border-radius: 10px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
        }

        .loc-icon {
          color: var(--color-accent);
        }

        .social-buttons-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 10px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          border-color: var(--color-accent);
          transform: translateX(4px);
        }

        .social-text {
          display: flex;
          flex-direction: column;
        }

        .social-platform {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .social-username {
          font-family: var(--font-mono);
          font-size: 0.775rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};
