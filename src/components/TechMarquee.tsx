import React from 'react';

export const TechMarquee: React.FC = () => {
  const line1 = [
    'HTML', 'CSS', 'C++', 'Python', 'Lua', 'Debugging',
    'Problem Solving', 'AI Prompt Engineering', 'Hardware Basics',
    'Elektronika', 'Server', 'Pemrograman',
  ];

  const line2 = [
    'JHIC 1.0 Top 30', 'KRON Medali Perak', 'Robotika',
    'SMK Telekomunikasi', 'Jombang', 'Circuit Thinking',
    'Systems Curiosity', 'Clean Code Habits', 'Under Pressure Debugging',
  ];

  return (
    <div className="tech-marquee-section">
      <div className="marquee-outer">
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        {/* Row 1: Left to Right */}
        <div className="marquee-track marquee-ltr">
          {[...line1, ...line1].map((item, idx) => (
            <span key={idx} className="marquee-tag tag-accent">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Right to Left */}
      <div className="marquee-outer" style={{ marginTop: '0.75rem' }}>
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        <div className="marquee-track marquee-rtl">
          {[...line2, ...line2].map((item, idx) => (
            <span key={idx} className="marquee-tag tag-secondary">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .tech-marquee-section {
          padding: 2.5rem 0;
          position: relative;
          background-color: color-mix(in srgb, var(--bg-primary) 55%, transparent);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .marquee-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
        }

        .marquee-track {
          display: flex;
          gap: 0.85rem;
          width: max-content;
          will-change: transform;
        }

        .marquee-ltr {
          animation: marquee-ltr-anim 38s linear infinite;
        }

        .marquee-rtl {
          animation: marquee-rtl-anim 44s linear infinite;
        }

        .marquee-outer:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-ltr-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-rtl-anim {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-fade-left {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 120px;
          background: linear-gradient(to right, var(--bg-primary), transparent);
          z-index: 2;
          pointer-events: none;
        }

        .marquee-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 120px;
          background: linear-gradient(to left, var(--bg-primary), transparent);
          z-index: 2;
          pointer-events: none;
        }

        .marquee-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 0.825rem;
          font-weight: 500;
          white-space: nowrap;
          user-select: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid var(--border-subtle);
        }

        .marquee-tag:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
        }

        .tag-secondary {
          background-color: var(--bg-card);
          color: var(--text-secondary);
        }

        .marquee-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent);
          box-shadow: 0 0 6px var(--color-accent);
        }
      `}</style>
    </div>
  );
};
