import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, CircuitBoard, Server, Code2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { hobbiesData } from '../data/hobbies';

const hobbyIcons = {
  circuit: <CircuitBoard size={20} />,
  server: <Server size={20} />,
  code: <Code2 size={20} />,
} as const;

export const Profile: React.FC = () => {
  const tags = profileData.tags ?? [
    'Elektronika',
    'Server',
    'Pemrograman',
    'Lua Scripting', 'Growtopia',
  ];

  const keywords = [
    'elektronika', 'server', 'pemrograman', 'hardware', 'lua', 'ai',
    'kompetisi', 'jhic', 'kron', 'debugging', 'fondasi',
  ];

  return (
    <section id="about" className="section profile-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <UserCheck size={16} />
            <span>Tentang & Minat</span>
          </div>
          <h2 className="section-title">Profil & Hobi</h2>
          <p className="section-subtitle">
            Software, hardware, dan infrastruktur — tiga jalur yang saya nikmati di luar maupun di dalam kompetisi.
          </p>
        </motion.div>

        <motion.div
          className="profile-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="profile-story-card">
            <h3 className="story-heading">Latar Belakang</h3>

            {profileData.fullBio.map((paragraph, index) => (
              <p key={index} className="story-paragraph">
                {paragraph.split(' ').map((word, wIdx) => {
                  const isKeyword = keywords.some(kw =>
                    word.toLowerCase().includes(kw)
                  );

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

            <div className="profile-tags-group">
              {tags.map((tag, i) => (
                <span key={tag} className={i === 0 ? 'tag tag-accent' : 'tag'}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="profile-principles-list">
            <h3 className="hobbies-heading">Hobi yang Saya Tekuni</h3>
            {hobbiesData.map((item) => (
              <div key={item.id} className="principle-card">
                <div className="principle-icon-wrapper">
                  {item.iconName ? hobbyIcons[item.iconName] : <Code2 size={20} />}
                </div>
                <div className="principle-content">
                  <h4 className="principle-title">{item.name}</h4>
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

        .story-heading,
        .hobbies-heading {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.75rem;
          font-family: var(--font-heading);
        }

        .story-heading::after,
        .hobbies-heading::after {
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
          gap: 1.1rem;
        }

        .principle-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.35rem 1.5rem;
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
          font-family: var(--font-heading);
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
