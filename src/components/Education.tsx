import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School } from 'lucide-react';
import { educationData } from '../data/education';

export const Education: React.FC = () => {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [pipeVisible, setPipeVisible] = useState(false);

  useEffect(() => {
    const el = roadmapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPipeVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="section education-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <GraduationCap size={16} />
            <span>Jalur Pendidikan</span>
          </div>
          <h2 className="section-title">Roadmap Sekolah</h2>
          <p className="section-subtitle">
            Jejak formal dari dasar hingga kejuruan telekomunikasi — fondasi sebelum kompetisi dan eksperimen teknis.
          </p>
        </motion.div>

        <div className="education-roadmap" ref={roadmapRef}>
          {/* Curved connecting pipe — desktop horizontal path */}
          <svg
            className="edu-pipe edu-pipe-desktop"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="edu-pipe-base"
              d="M 80 60 C 200 60, 220 60, 333 60 S 467 60, 500 60 S 600 60, 667 60 S 800 60, 920 60"
              fill="none"
            />
            <path
              className={`edu-pipe-draw smooth-pipe-path ${pipeVisible ? 'pipe-visible' : ''}`}
              d="M 80 60 C 180 28, 250 92, 333 60 S 420 20, 500 60 S 580 100, 667 60 S 780 30, 920 60"
              fill="none"
            />
            <circle className={`edu-pipe-dot ${pipeVisible ? 'dot-on' : ''}`} cx="80" cy="60" r="5" style={{ transitionDelay: '0.05s' }} />
            <circle className={`edu-pipe-dot ${pipeVisible ? 'dot-on' : ''}`} cx="500" cy="60" r="5" style={{ transitionDelay: '0.55s' }} />
            <circle className={`edu-pipe-dot ${pipeVisible ? 'dot-on' : ''}`} cx="920" cy="60" r="5" style={{ transitionDelay: '1.05s' }} />
          </svg>

          {/* Vertical connecting pipe — mobile */}
          <svg
            className="edu-pipe edu-pipe-mobile"
            viewBox="0 0 40 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="edu-pipe-base"
              d="M 20 4 V 96"
              fill="none"
            />
            <path
              className={`edu-pipe-draw smooth-pipe-path ${pipeVisible ? 'pipe-visible' : ''}`}
              d="M 20 4 C 8 20, 32 36, 20 50 S 8 70, 20 96"
              fill="none"
            />
          </svg>

          {educationData.map((item, idx) => (
            <motion.article
              key={item.id}
              className="edu-card glass-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="edu-node" aria-hidden="true">
                <span className="edu-node-inner" />
              </div>
              <div className="edu-stage-badge">{item.stage}</div>
              <div className="edu-card-body">
                <div className="edu-icon-wrap">
                  <School size={20} />
                </div>
                <h3 className="edu-school">{item.school}</h3>
                {item.location && (
                  <p className="edu-location">{item.location}</p>
                )}
                {item.note && (
                  <p className="edu-note">{item.note}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .education-section {
          background-color: var(--bg-secondary);
          position: relative;
        }

        .education-roadmap {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          position: relative;
          align-items: stretch;
          padding-top: 1.25rem;
        }

        .edu-pipe {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          overflow: visible;
        }

        .edu-pipe-desktop {
          display: none;
          top: 0;
          left: 4%;
          right: 4%;
          width: 92%;
          height: 72px;
        }

        .edu-pipe-mobile {
          display: none;
        }

        .edu-pipe-base {
          stroke: var(--timeline-line);
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .edu-pipe-draw {
          stroke: var(--color-accent);
          stroke-width: 2.75;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 6px var(--color-accent-glow));
          transition: stroke 0.7s ease;
        }

        .smooth-pipe-path {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          transition:
            stroke-dashoffset 1.65s cubic-bezier(0.25, 1, 0.5, 1),
            stroke 0.7s ease;
        }

        .smooth-pipe-path.pipe-visible {
          stroke-dashoffset: 0;
        }

        .edu-pipe-dot {
          fill: var(--bg-card);
          stroke: var(--color-accent);
          stroke-width: 2;
          opacity: 0;
          transform-origin: center;
          transition: opacity 0.4s ease, fill 0.7s ease, stroke 0.7s ease;
        }

        .edu-pipe-dot.dot-on {
          opacity: 1;
          fill: var(--color-accent);
        }

        @media (min-width: 900px) {
          .edu-pipe-desktop {
            display: block;
          }
        }

        .edu-card {
          position: relative;
          z-index: 1;
          padding: 1.5rem 1.35rem 1.6rem;
          border-radius: 12px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .edu-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
        }

        .edu-node {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          transition: border-color 0.7s ease;
        }

        .edu-node-inner {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 8px var(--color-accent);
          transition: background 0.7s ease, box-shadow 0.7s ease;
        }

        .edu-stage-badge {
          display: inline-flex;
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent);
          background: var(--color-accent-glow);
          border: 1px solid rgba(var(--color-accent-rgb), 0.35);
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          transition: color 0.7s ease, background 0.7s ease, border-color 0.7s ease;
        }

        .edu-card-body {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .edu-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent-glow);
          color: var(--color-accent);
          margin-bottom: 0.25rem;
          transition: background 0.7s ease, color 0.7s ease;
        }

        .edu-school {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .edu-location {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .edu-note {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-top: 0.35rem;
        }

        @media (max-width: 899px) {
          .education-roadmap {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            padding-top: 0;
            padding-left: 1.75rem;
          }

          .edu-pipe-desktop {
            display: none;
          }

          .edu-pipe-mobile {
            display: block;
            top: 0;
            bottom: 0;
            left: 0;
            width: 28px;
            height: 100%;
          }

          .edu-pipe-mobile .smooth-pipe-path {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
          }

          .edu-pipe-mobile .smooth-pipe-path.pipe-visible {
            stroke-dashoffset: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smooth-pipe-path {
            stroke-dashoffset: 0 !important;
            transition: none !important;
          }
          .edu-pipe-dot {
            opacity: 1;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
