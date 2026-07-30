import React from 'react';

interface AmbientBackgroundProps {
  isIntense: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ isIntense }) => {
  return (
    <>
      {/* Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Ambient BG */}
      <div className={`ambient-bg ${isIntense ? 'ambient-intense' : ''}`} aria-hidden="true">
        <div className="ambient-bg__base" />
        <div className="ambient-bg__grid" />

        {/* Floating Glowing Orbs */}
        <div className="ambient-bg__glow ambient-bg__glow--a" />
        <div className="ambient-bg__glow ambient-bg__glow--b" />
        <div className="ambient-bg__glow ambient-bg__glow--c" />

        <div className="ambient-bg__vignette" />
      </div>
    </>
  );
};
