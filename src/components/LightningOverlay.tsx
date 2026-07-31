import React, { useEffect, useMemo, useRef } from 'react';

type LightningVariant = 'entrance' | 'strike';
type LightningColor = 'blue' | 'orange';

interface LightningOverlayProps {
  variant: LightningVariant;
  color: LightningColor;
  strikeSeed?: number;
  onComplete?: () => void;
}

const TOTAL_MS: Record<LightningVariant, number> = {
  entrance: 1400,
  strike: 950,
};

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Single jagged bolt — viewBox 0 0 100 100 */
function buildStrikePath(seed: number): string {
  const rand = mulberry32(seed || 1);
  const baseX = 28 + rand() * 44;
  const segs = 9;
  let d = `M ${baseX.toFixed(1)} 0`;
  for (let i = 1; i <= segs; i++) {
    const y = (i / segs) * 100;
    const j = (rand() - 0.5) * 36;
    const x = Math.max(12, Math.min(88, baseX + j));
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

/** Trisula: three branches from top center */
function buildTrisulaPaths(): string[] {
  const zig = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');

  return [
    // left tine
    zig([
      [50, 0],
      [48, 12],
      [42, 22],
      [36, 38],
      [28, 55],
      [22, 72],
      [18, 100],
    ]),
    // center shaft
    zig([
      [50, 0],
      [50, 18],
      [52, 32],
      [48, 48],
      [51, 64],
      [49, 80],
      [50, 100],
    ]),
    // right tine
    zig([
      [50, 0],
      [52, 12],
      [58, 22],
      [64, 38],
      [72, 55],
      [78, 72],
      [82, 100],
    ]),
  ];
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export const LightningOverlay: React.FC<LightningOverlayProps> = ({
  variant,
  color,
  strikeSeed,
  onComplete,
}) => {
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const isEntrance = variant === 'entrance';
  const tintClass = color === 'orange' ? 'lo-is-orange' : 'lo-is-blue';

  const strikePath = useMemo(
    () => buildStrikePath(strikeSeed ?? Date.now()),
    [strikeSeed]
  );
  const trisulaPaths = useMemo(() => buildTrisulaPaths(), []);

  useEffect(() => {
    const delay = prefersReducedMotion() ? 40 : TOTAL_MS[variant];
    const t = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onCompleteRef.current?.();
      }
    }, delay);
    return () => clearTimeout(t);
  }, [variant]);

  return (
    <div
      className={`lightning-overlay ${tintClass} lo-${variant}`}
      aria-hidden="true"
    >
      {/* Full-screen flash */}
      <div className={`lo-flash ${isEntrance ? 'lo-flash-bright' : 'lo-flash-soft'}`} />

      {/* Falling energy band */}
      <div className="lo-band" />

      {/* Vertical crack / split line */}
      <div className="lo-crack" />

      {/* Bolt SVG */}
      <svg
        className="lo-bolt"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {isEntrance ? (
          trisulaPaths.map((d, i) => (
            <path
              key={i}
              d={d}
              className="lo-bolt-path lo-trisula-path"
              pathLength={1}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))
        ) : (
          <path
            d={strikePath}
            className="lo-bolt-path"
            pathLength={1}
          />
        )}
      </svg>

      <style>{`
        .lightning-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          pointer-events: none;
          overflow: hidden;
        }

        .lo-is-blue {
          --lo-tint: #60a5fa;
          --lo-core: #dbeafe;
          --lo-glow: rgba(59, 130, 246, 0.85);
          --lo-band: rgba(59, 130, 246, 0.45);
          --lo-flash: rgba(147, 197, 253, 0.55);
        }
        .lo-is-orange {
          --lo-tint: #ff6a00;
          --lo-core: #ffe4cc;
          --lo-glow: rgba(255, 85, 0, 0.9);
          --lo-band: rgba(255, 85, 0, 0.5);
          --lo-flash: rgba(255, 160, 80, 0.55);
        }

        /* ---- Flash ---- */
        .lo-flash {
          position: absolute;
          inset: 0;
          opacity: 0;
          will-change: opacity;
          background:
            radial-gradient(ellipse 90% 70% at 50% 20%, var(--lo-flash), transparent 70%),
            radial-gradient(ellipse 60% 40% at 50% 50%, var(--lo-band), transparent 65%);
        }
        .lo-flash-soft {
          animation: lo-flash-soft 0.28s ease-out forwards;
        }
        .lo-flash-bright {
          animation: lo-flash-bright 0.4s ease-out forwards;
        }
        @keyframes lo-flash-soft {
          0%   { opacity: 0; }
          25%  { opacity: 0.55; }
          100% { opacity: 0; }
        }
        @keyframes lo-flash-bright {
          0%   { opacity: 0; }
          20%  { opacity: 0.85; }
          55%  { opacity: 0.35; }
          100% { opacity: 0; }
        }

        /* ---- Falling band ---- */
        .lo-band {
          position: absolute;
          left: 0;
          right: 0;
          height: 28%;
          top: 0;
          transform: translateY(-100%);
          background: linear-gradient(
            180deg,
            transparent 0%,
            var(--lo-band) 40%,
            var(--lo-flash) 50%,
            var(--lo-band) 60%,
            transparent 100%
          );
          filter: blur(2px);
          will-change: transform;
          animation: lo-band-fall 0.85s cubic-bezier(0.33, 0, 0.2, 1) forwards;
        }
        .lo-entrance .lo-band {
          animation-duration: 1.15s;
        }
        @keyframes lo-band-fall {
          0%   { transform: translateY(-100%); opacity: 0.9; }
          70%  { opacity: 0.75; }
          100% { transform: translateY(380%); opacity: 0; }
        }

        /* ---- Center crack line ---- */
        .lo-crack {
          position: absolute;
          top: 0;
          left: 50%;
          width: 3px;
          height: 0;
          margin-left: -1.5px;
          background: linear-gradient(
            180deg,
            var(--lo-core),
            var(--lo-tint),
            transparent
          );
          box-shadow:
            0 0 12px var(--lo-glow),
            0 0 28px var(--lo-glow);
          animation: lo-crack-grow 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .lo-entrance .lo-crack {
          width: 4px;
          margin-left: -2px;
          animation-duration: 0.9s;
        }
        @keyframes lo-crack-grow {
          0%   { height: 0; opacity: 1; }
          70%  { height: 100%; opacity: 1; }
          100% { height: 100%; opacity: 0; }
        }

        /* ---- Bolt SVG ---- */
        .lo-bolt {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .lo-bolt-path {
          fill: none;
          stroke: var(--lo-core);
          stroke-width: 2.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          filter:
            drop-shadow(0 0 4px var(--lo-core))
            drop-shadow(0 0 12px var(--lo-glow))
            drop-shadow(0 0 28px var(--lo-glow));
          animation: lo-draw 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }
        .lo-trisula-path {
          stroke-width: 2.4;
          animation-duration: 0.85s;
        }
        .lo-entrance .lo-bolt-path {
          stroke-width: 3;
        }
        @keyframes lo-draw {
          0%   { stroke-dashoffset: 1; opacity: 1; }
          75%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        /* Secondary glow stroke under main path — via thicker duplicate not needed;
           drop-shadow handles it. */

        @media (max-width: 768px) {
          .lo-bolt-path { stroke-width: 3.4; }
          .lo-crack { width: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lightning-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
};
