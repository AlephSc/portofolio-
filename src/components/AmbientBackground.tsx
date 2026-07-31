import React from 'react';

interface AmbientBackgroundProps {
  isIntense: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ isIntense }) => {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />

      <div className={`ambient-bg ${isIntense ? 'ambient-intense' : ''}`} aria-hidden="true">
        <div className="ambient-bg__base" />
        {/* Square grid — nirvan-style */}
        <div className="ambient-bg__grid" />
        {/* Electrical / PCB-style traces */}
        <div className="ambient-bg__circuit" />
        <svg className="ambient-bg__traces" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* Horizontal bus lines */}
          <path d="M0 160 H420 M480 160 H720 M780 160 H1200" className="trace-line" />
          <path d="M0 320 H180 M240 320 H560 M620 320 H900 M960 320 H1200" className="trace-line" />
          <path d="M0 520 H300 M360 520 H640 M700 520 H1000 M1060 520 H1200" className="trace-line" />
          <path d="M0 680 H200 M260 680 H500 M560 680 H820 M880 680 H1200" className="trace-line" />
          {/* Vertical stubs / vias */}
          <path d="M180 160 V320" className="trace-line" />
          <path d="M420 160 V240" className="trace-line" />
          <path d="M560 320 V520" className="trace-line" />
          <path d="M720 160 V320" className="trace-line" />
          <path d="M900 320 V520" className="trace-line" />
          <path d="M640 520 V680" className="trace-line" />
          <path d="M300 520 V600" className="trace-line" />
          <path d="M1000 520 V680" className="trace-line" />
          {/* Junction nodes */}
          <circle cx="180" cy="160" r="3.5" className="trace-node" />
          <circle cx="180" cy="320" r="3.5" className="trace-node" />
          <circle cx="420" cy="160" r="3.5" className="trace-node" />
          <circle cx="560" cy="320" r="3.5" className="trace-node" />
          <circle cx="560" cy="520" r="3.5" className="trace-node" />
          <circle cx="720" cy="160" r="3.5" className="trace-node" />
          <circle cx="720" cy="320" r="3.5" className="trace-node" />
          <circle cx="900" cy="320" r="3.5" className="trace-node" />
          <circle cx="900" cy="520" r="3.5" className="trace-node" />
          <circle cx="640" cy="520" r="3.5" className="trace-node" />
          <circle cx="640" cy="680" r="3.5" className="trace-node" />
          <circle cx="300" cy="520" r="3.5" className="trace-node" />
          <circle cx="1000" cy="520" r="3.5" className="trace-node" />
          <circle cx="1000" cy="680" r="3.5" className="trace-node" />
        </svg>

        <div className="ambient-bg__glow ambient-bg__glow--a" />
        <div className="ambient-bg__glow ambient-bg__glow--b" />
        <div className="ambient-bg__glow ambient-bg__glow--c" />

        <div className="ambient-bg__vignette" />
      </div>
    </>
  );
};
