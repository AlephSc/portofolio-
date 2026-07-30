import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ChevronRight } from 'lucide-react';
import { skillsData } from '../data/skills';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(skillsData[0].id);

  const currentCategory = skillsData.find(c => c.id === activeCategory) || skillsData[0];

  return (
    <section id="skills" className="section skills-section">
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
            <Cpu size={16} />
            <span>Kedalaman Rekayasa Perangkat Lunak</span>
          </div>
          <h2 className="section-title">Keahlian & Penguasaan Teknis</h2>
          <p className="section-subtitle">
            Daftar penguasaan alat, framework, dan metodologi yang dikelompokkan secara terstruktur berdasarkan kedalaman pengalaman nyata.
          </p>
        </motion.div>

        <motion.div
          className="skills-layout"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Category Selector */}
          <div className="skills-sidebar">
            {skillsData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`skill-cat-btn ${activeCategory === cat.id ? 'skill-cat-active' : ''}`}
              >
                <div className="cat-btn-content">
                  <span className="cat-btn-title">{cat.categoryName}</span>
                  <span className="cat-btn-count">{cat.skills.length} Topik</span>
                </div>
                <ChevronRight size={18} className="cat-btn-arrow" />
              </button>
            ))}
          </div>

          {/* Right Skills Grid */}
          <div className="skills-content-area">
            <div className="skills-category-banner">
              <h3 className="cat-heading">{currentCategory.categoryName}</h3>
              <p className="cat-description">{currentCategory.description}</p>
            </div>

            <div className="skills-items-grid">
              {currentCategory.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-card">
                  <div className="skill-card-top">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className={`skill-level-badge ${skill.level === 'Advanced' ? 'level-advanced' : 'level-proficient'}`}>
                      {skill.level}
                    </span>
                  </div>

                  {skill.description && (
                    <p className="skill-desc">{skill.description}</p>
                  )}

                  {/* Level indicator bar */}
                  <div className="skill-progress-track">
                    <div
                      className="skill-progress-fill"
                      style={{
                        width: skill.level === 'Advanced' ? '92%' : '76%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-secondary);
        }

        .skills-layout {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 2.5rem;
          align-items: start;
        }

        @media (max-width: 868px) {
          .skills-layout {
            grid-template-columns: 1fr;
          }
        }

        .skills-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .skill-cat-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          text-align: left;
          transition: all 0.25s ease;
        }

        .skill-cat-btn:hover {
          border-color: var(--border-medium);
          transform: translateX(4px);
        }

        .skill-cat-active {
          border-color: var(--color-accent);
          background-color: var(--bg-tertiary);
          box-shadow: 0 4px 15px var(--color-accent-glow);
        }

        .cat-btn-title {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cat-btn-count {
          font-family: var(--font-mono);
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        .cat-btn-arrow {
          color: var(--text-muted);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .skill-cat-active .cat-btn-arrow {
          color: var(--color-accent);
          transform: translateX(3px);
        }

        .skills-content-area {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 2.25rem;
          box-shadow: var(--shadow-subtle);
        }

        .skills-category-banner {
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .cat-heading {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .cat-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .skills-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .skill-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: all 0.2s ease;
        }

        .skill-card:hover {
          border-color: var(--color-accent);
        }

        .skill-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .skill-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .skill-level-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .level-advanced {
          background-color: var(--color-accent-glow);
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
        }

        .level-proficient {
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-medium);
        }

        .skill-desc {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .skill-progress-track {
          width: 100%;
          height: 4px;
          background-color: var(--bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
          margin-top: auto;
        }

        .skill-progress-fill {
          height: 100%;
          background-color: var(--color-accent);
          border-radius: 2px;
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
        }
      `}</style>
    </section>
  );
};
