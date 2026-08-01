import React, { useEffect, useRef, useState } from 'react';
import { Route } from 'lucide-react';
import { experiencesData } from '../data/experiences';
import { TimelineCard } from './TimelineCard';

export const Timeline: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = document.getElementById('journey');
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalHeight = rect.height;
        const scrollOffset = windowHeight - rect.top;
        const progress = Math.min(
          Math.max(scrollOffset / (totalHeight + windowHeight * 0.5), 0),
          1
        );
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="journey" className="section timeline-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <Route size={16} />
            <span>Alur Perjalanan & Timeline</span>
          </div>
          <h2 className="section-title">Rekam Perjalanan & Kompetisi</h2>
          <p className="section-subtitle">
            Jejak kompetisi dan pencapaian yang membentuk cara berpikir teknis saya.
          </p>
        </div>

        <div className="timeline-container">
          {/* CSS rail — left: 50% desktop / 20px mobile, same axis as .timeline-node */}
          <div className="timeline-rail" aria-hidden="true">
            <div
              className="timeline-rail-progress"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          <div className="timeline-items-list">
            {experiencesData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-section {
          background-color: transparent;
          position: relative;
        }

        .timeline-container {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
          padding: 2rem 0;
          /* Shared axis: desktop center, mobile left gutter (matches .timeline-node) */
          --timeline-axis: 50%;
        }

        @media (max-width: 768px) {
          .timeline-container {
            --timeline-axis: 16px;
          }
        }

        .timeline-rail {
          position: absolute;
          top: 0;
          bottom: 0;
          left: var(--timeline-axis);
          width: 3px;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 1;
          background-color: var(--timeline-line);
          border-radius: 2px;
          overflow: hidden;
        }

        .timeline-rail-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 0;
          background-color: var(--color-accent);
          border-radius: 2px;
          box-shadow: 0 0 10px var(--color-accent);
          transition: height 0.15s linear, background-color 0.7s ease, box-shadow 0.7s ease;
        }

        .timeline-items-list {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          position: relative;
          z-index: 2;
        }

        .timeline-item-wrapper {
          display: flex;
          position: relative;
        }

        .timeline-item-wrapper.item-even {
          justify-content: flex-start;
          padding-right: calc(50% + 2.5rem);
        }

        .timeline-item-wrapper.item-odd {
          justify-content: flex-end;
          padding-left: calc(50% + 2.5rem);
        }

        @media (max-width: 768px) {
          .timeline-item-wrapper.item-even,
          .timeline-item-wrapper.item-odd {
            justify-content: flex-start;
            /* 16px axis + half node (16px) + gap */
            padding-left: 2.75rem;
            padding-right: 0;
          }
        }

        .timeline-node {
          position: absolute;
          left: var(--timeline-axis);
          top: 1.75rem;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--bg-card);
          border: 2px solid var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          z-index: 3;
          transition: all 0.3s ease, left 0s;
          box-shadow: 0 0 15px var(--color-accent-glow);
        }

        .node-inner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-accent);
        }

        .node-intense {
          background-color: #FF5500;
          border-color: #FF5500;
          color: #FFFFFF;
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.6);
        }

        @media (prefers-reduced-motion: no-preference) {
          .node-intense {
            animation: pulse-node 2.4s infinite ease-in-out;
          }
        }

        @keyframes pulse-node {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 16px rgba(255, 85, 0, 0.45);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            box-shadow: 0 0 22px rgba(255, 85, 0, 0.7);
          }
        }

        .timeline-card {
          border-radius: 14px;
          padding: 1.75rem;
          width: 100%;
        }

        .card-intense-style {
          border-left: 4px solid #FF5500 !important;
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .year-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .year-badge {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-accent);
          transition: var(--transition-color-shift);
        }

        .quarter-badge {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .category-tag {
          font-family: var(--font-mono);
          font-size: 0.725rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .category-intense {
          background-color: rgba(255, 85, 0, 0.15);
          color: #FF5500;
          border: 1px solid rgba(255, 85, 0, 0.3);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .card-role {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .role-arrow {
          color: var(--color-accent);
        }

        .card-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.15rem;
        }

        .card-highlights {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .check-icon {
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .metric-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.9rem;
          border-radius: 6px;
          background-color: var(--color-accent-glow);
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          font-family: var(--font-mono);
          font-size: 0.825rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          transition: var(--transition-color-shift);
        }

        .card-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        /* Prevent layout thrash from motion + transform pulse */
        .timeline-item-wrapper {
          will-change: auto;
        }
      `}</style>
    </section>
  );
};
