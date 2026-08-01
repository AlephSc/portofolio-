import React, { useCallback, useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

/** Curtain split — panels hold, then open left/right. No trisula. */
const SEQUENCE_MS = 1600;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [ready, setReady] = useState(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCompleteRef.current();
  }, []);

  useEffect(() => {
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
      <div className="ls-panel ls-panel-left" />
      <div className="ls-panel ls-panel-right" />

      <div className="ls-seam" aria-hidden="true" />

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
        }

        .ls-panel-left {
          left: 0;
          box-shadow: inset -1px 0 0 rgba(96, 165, 250, 0.35);
        }
        .ls-panel-right {
          right: 0;
          box-shadow: inset 1px 0 rgba(96, 165, 250, 0.35);
        }

        .loading-screen.ls-ready .ls-panel-left {
          animation: ls-panel-open-left 0.75s cubic-bezier(0.76, 0, 0.24, 1) 0.55s forwards;
        }
        .loading-screen.ls-ready .ls-panel-right {
          animation: ls-panel-open-right 0.75s cubic-bezier(0.76, 0, 0.24, 1) 0.55s forwards;
        }

        @keyframes ls-panel-open-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-102%); }
        }
        @keyframes ls-panel-open-right {
          0%   { transform: translateX(0); }
          100% { transform: translateX(102%); }
        }

        .ls-seam {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          margin-left: -1px;
          background: rgba(96, 165, 250, 0.4);
          box-shadow: 0 10px rgba(59, 130, 246, 0.5);
          opacity: 0.6;
          z-index: 2;
          pointer-events: none;
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
      `}</style>
    </div>
  );
};
