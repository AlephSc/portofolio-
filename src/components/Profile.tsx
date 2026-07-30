import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Code2, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { profileData } from '../data/profile';

export const Profile: React.FC = () => {
  const corePrinciples = [
    {
      icon: <Code2 size={20} />,
      title: 'Prinsip Kualitas Kode',
      description: 'Menulis kode yang eksplisit, teruji, dan dapat dipahami oleh siapapun dalam tim. Mengutamakan kesederhanaan daripada keandalan semu.'
    },
    {
      icon: <Cpu size={20} />,
      title: 'Kesadaran Performa Hardware',
      description: 'Memahami bahwa software berjalan di atas hardware nyata. Mengoptimalkan siklus CPU, penggunaan memori, dan latency I/O.'
    },
    {
      icon: <Zap size={20} />,
      title: 'Iterasi & Ketahanan',
      description: 'Menghadapi tantangan rumit dan bug misterius dengan pendekatan hipotetis-empiris tanpa mudah menyerah.'
    },
    {
      icon: <ShieldCheck size={20} />,
      title: 'Keamanan & Aksesibilitas',
      description: 'Membangun aplikasi web yang inklusif untuk semua pengguna dengan standar WCAG serta enkripsi data yang aman.'
    }
  ];

  return (
    <section id="about" className="section profile-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <UserCheck size={16} />
            <span>Tentang & Filosofi</span>
          </div>
          <h2 className="section-title">Profil & Cara Saya Bekerja</h2>
          <p className="section-subtitle">
            Kombinasi antara dedikasi teknis mendalam dan fokus pada nilai nyata solusi perangkat lunak.
          </p>
        </motion.div>

        <motion.div
          className="profile-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Narrative Column */}
          <div className="profile-story-card">
            <h3 className="story-heading">Latar Belakang & Filosofi</h3>
            
            {profileData.fullBio.map((paragraph, index) => (
              <p key={index} className="story-paragraph">
                {paragraph.split(' ').map((word, wIdx) => {
                  const isKeyword = [
                    'perangkat', 'lunak', 'komputasi', 'performa', 'bersih', 'skala',
                    're-rendering', 'optimasi', 'latency', 'dedikasi', 'arsitektur'
                  ].some(kw => word.toLowerCase().includes(kw));

                  if (isKeyword) {
                    return (
                      <span key={wIdx} className="keyword-highlight">
                        {word}{' '}
                      </span>
                    );
                  }
                  return word + ' ';
                })}
              </p>
            ))}

            {/* Quick Skill Tags Summary */}
            <div className="profile-tags-group">
              <span className="tag tag-accent">Full-Stack Engineering</span>
              <span className="tag">Systems Performance</span>
              <span className="tag">Clean Architecture</span>
              <span className="tag">TypeScript Ecosystem</span>
              <span className="tag">Event-Driven Design</span>
            </div>
          </div>

          {/* Right Core Principles Column */}
          <div className="profile-principles-list">
            {corePrinciples.map((item, idx) => (
              <div key={idx} className="principle-card">
                <div className="principle-icon-wrapper">
                  {item.icon}
                </div>
                <div className="principle-content">
                  <h4 className="principle-title">{item.title}</h4>
                  <p className="principle-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .profile-section {
          background-color: var(--bg-primary);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2.5rem;
          align-items: start;
        }

        @media (max-width: 968px) {
          .profile-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .profile-story-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 2.25rem;
          box-shadow: var(--shadow-subtle);
        }

        .story-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.75rem;
        }

        .story-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background-color: var(--color-accent);
          border-radius: 2px;
          transition: var(--transition-color-shift);
        }

        .story-paragraph {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .keyword-highlight {
          color: var(--text-primary);
          font-weight: 600;
        }

        .profile-tags-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .profile-principles-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .principle-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          transition: all 0.25s ease;
        }

        .principle-card:hover {
          border-color: var(--color-accent);
          transform: translateX(4px);
        }

        .principle-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background-color: var(--color-accent-glow);
          color: var(--color-accent);
          flex-shrink: 0;
          transition: var(--transition-color-shift);
        }

        .principle-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .principle-description {
          font-size: 0.925rem;
          line-height: 1.55;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
};
