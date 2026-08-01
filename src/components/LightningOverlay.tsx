import React, { useEffect, useRef } from 'react';

type LightningColor = 'blue' | 'orange';

interface LightningOverlayProps {
  color: LightningColor;
  onComplete?: () => void;
}

const SWEEP_MS = 800;

/** Color-change shockwave — a single energy line that sweeps top → bottom. */
export const LightningOverlay: React.FC<LightningOverlayProps> = ({
  color,
  onComplete,
}) => {
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const tintClass = color === 'orange' ? 'lo-is-orange' : 'lo-is-blue';

  useEffect(() => {
    const t = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onCompleteRef.current?.();
      }
    }, SWEEP_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`lightning-overlay ${tintClass}`} aria-hidden="true">
      <div className="lo-wave">
        <div className="lo-wave-edge" />
        <div className="lo-wave-trail" />
      </div>

      <style>{`
        .lightning-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          pointer-events: none;
          overflow: hidden;
        }

        .lo-is-blue {
          --lo-bright: #dbeafe;
          --lo-tint: #60a5fa;
          --lo-glow: rgba(59, 130, 246, 0.6);
        }
        .lo-is-orange {
          --lo-bright: #ffe4cc;
          --lo-tint: #ff6a00;
          --lo-glow: rgba(255, 85, 0, 0.6);
        }

        .lo-wave {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          transform: translateY(-100%);
          will-change: transform;
          animation: lo-sweep ${SWEEP_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .lo-wave-edge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--lo-bright) 20%,
            #ffffff 50%,
            var(--lo-bright) 80%,
            transparent
          );
          box-shadow: 0 0 10px var(--lo-tint), 0 0 24px var(--lo-glow);
        }

        .lo-wave-trail {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: linear-gradient(
            180deg,
            transparent,
            var(--lo-glow) 80%,
            var(--lo-bright) 100%
          );
          opacity: 0.35;
          filter: blur(3px);
        }

        @keyframes lo-sweep {
          0%   { transform: translateY(-100%); opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
