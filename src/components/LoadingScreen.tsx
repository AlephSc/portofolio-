import React, { useCallback, useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

/** Full sequence length (hold closed + draw + open panels) */
const SEQUENCE_MS = 2200;

const TRISULA_PATHS = [
  'M 50 0 L 48 10 L 40 24 L 32 42 L 24 62 L 18 80 L 14 100',
  'M 50 0 L 50 16 L 52 30 L 48 48 L 51 66 L 49 82 L 50 100',
  'M 50 0 L 52 10 L 60 24 L 68 42 L 76 62 L 82 80 L 86 100',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Gate animations until after mount so CSS keyframes always fire (avoids first-paint miss)
  const [ready, setReady] = useState(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCompleteRef.current();
  }, []);

  useEffect(() => {
    // Double rAF: ensure browser has painted the closed panels before animating
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setReady(true));
    });

    const t = setTimeout(finish, SEQUENCE_MS);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t);
    };
  }, [finish]);

  return (
    <div
      className={`loading-screen${ready ? ' ls-ready' : ''}`}
      aria-busy="true"
      aria-label="Memuat portofolio"
      role="status"
    >
      {/* Solid dark halves — always visible from first paint */}
      <div className="ls-panel ls-panel-left" />
      <div className="ls-panel ls-panel-right" />

      <div className="ls-axis" aria-hidden="true">
        {/* Static full-height seam so something is always visible */}
        <div className="ls-seam" />
        <div className="ls-crack" />
        <div className="ls-crack-glow" />

        <svg
          className="ls-trisula"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Wide glow underlay */}
          {TRISULA_PATHS.map((d, i) => (
            <path
              key={`g-${i}`}
              d={d}
              className="ls-trisula-glow"
              pathLength={100}
              style={{ animationDelay: `${80 + i * 50}ms` }}
            />
          ))}
          {TRISULA_PATHS.map((d, i) => (
            <path
              key={`c-${i}`}
              d={d}
              className="ls-trisula-path"
              pathLength={100}
              style={{ animationDelay: `${80 + i * 50}ms` }}
            />
          ))}
        </svg>
      </div>

      <button type="button" className="ls-skip" onClick={finish}>
        Lewati
      </button>

      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          z-index: 20000;
          overflow: hidden;
          pointer-events: auto;
          background: #05070c;
        }

        .ls-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50.2%;
          background: #0A0D12;
          z-index: 1;
          will-change: transform;
          /* stay closed until .ls-ready */
          transform: translateX(0);
        }

        .ls-panel-left {
          left: 0;
          box-shadow: inset -1px 0 0 rgba(96, 165, 250, 0.35);
        }

        .ls-panel-right {
          right: 0;
          box-shadow: inset 1px 0 0 rgba(96, 165, 250, 0.35);
        }

        /* Only start open after ready — prevents "already finished" first paint */
        .loading-screen.ls-ready .ls-panel-left {
          animation: ls-panel-open-left 0.75s cubic-bezier(0.76, 0, 0.24, 1) 1.05s forwards;
        }
        .loading-screen.ls-ready .ls-panel-right {
          animation: ls-panel-open-right 0.75s cubic-bezier(0.76, 0, 0.24, 1) 1.05s forwards;
        }

        @keyframes ls-panel-open-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-102%); }
        }
        @keyframes ls-panel-open-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(102%); }
        }

        .ls-axis {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        /* Always-on thin seam so the split is visible even before anim */
        .ls-seam {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          margin-left: -1px;
          background: rgba(96, 165, 250, 0.45);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
          opacity: 0.7;
        }

        .ls-crack {
          position: absolute;
          top: 0;
          left: 50%;
          width: 4px;
          height: 0;
          margin-left: -2px;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #dbeafe 15%,
            #60a5fa 45%,
            #3b82f6 80%,
            transparent 100%
          );
          box-shadow:
            0 0 10px #93c5fd,
            0 0 28px #3b82f6,
            0 0 60px rgba(59, 130, 246, 0.7);
          opacity: 0;
        }

        .ls-crack-glow {
          position: absolute;
          top: 0;
          left: 50%;
          width: 64px;
          height: 0;
          margin-left: -32px;
          background: linear-gradient(
            180deg,
            rgba(147, 197, 253, 0.5),
            rgba(59, 130, 246, 0.25),
            transparent
          );
          filter: blur(8px);
          opacity: 0;
        }

        .loading-screen.ls-ready .ls-crack,
        .loading-screen.ls-ready .ls-crack-glow {
          animation: ls-crack-grow 1s cubic-bezier(0.2, 0.85, 0.2, 1) forwards;
        }

        @keyframes ls-crack-grow {
          0% {
            height: 0;
            opacity: 1;
          }
          70% {
            height: 100%;
            opacity: 1;
          }
          100% {
            height: 100%;
            opacity: 0;
          }
        }

        .ls-trisula {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .ls-trisula-glow,
        .ls-trisula-path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          opacity: 0;
        }

        .ls-trisula-glow {
          stroke: #3b82f6;
          stroke-width: 6;
          filter: blur(3px);
        }

        .ls-trisula-path {
          stroke: #f0f9ff;
          stroke-width: 3.2;
          filter:
            drop-shadow(0 0 6px #fff)
            drop-shadow(0 0 16px #60a5fa)
            drop-shadow(0 0 36px #3b82f6);
        }

        .loading-screen.ls-ready .ls-trisula-glow,
        .loading-screen.ls-ready .ls-trisula-path {
          animation: ls-trisula-draw 0.95s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        @keyframes ls-trisula-draw {
          0% {
            stroke-dashoffset: 100;
            opacity: 1;
          }
          65% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        .ls-skip {
          position: absolute;
          bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
          right: max(1.25rem, env(safe-area-inset-right, 0px));
          z-index: 5;
          min-height: 44px;
          min-width: 88px;
          padding: 0.55rem 1.15rem;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.45);
          background: rgba(10, 13, 18, 0.9);
          color: #cbd5e1;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .ls-skip:hover {
          color: #f1f5f9;
          border-color: #60a5fa;
        }

        .ls-skip:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 3px;
        }

        @media (max-width: 768px) {
          .ls-trisula-path { stroke-width: 4; }
          .ls-trisula-glow { stroke-width: 8; }
          .ls-crack { width: 3px; margin-left: -1.5px; }
        }
      `}</style>
    </div>
  );
};
