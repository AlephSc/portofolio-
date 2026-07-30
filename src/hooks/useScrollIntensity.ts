import { useState, useEffect, useCallback } from 'react';

export function useScrollIntensity() {
  const [intensity, setIntensity] = useState<number>(0); // 0.0 (Normal) to 1.0 (Intense)
  const [manualOverride, setManualOverride] = useState<boolean>(false);

  const calculateScrollIntensity = useCallback(() => {
    if (manualOverride) return;

    const intenseElements = document.querySelectorAll('[data-intense-trigger="true"]');
    if (!intenseElements || intenseElements.length === 0) {
      setIntensity(0);
      return;
    }

    const viewportHeight = window.innerHeight;
    let maxVisibilityRatio = 0;

    intenseElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Calculate how much of the intense element is near center of screen
      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = viewportHeight / 2;
      const distanceFromCenter = Math.abs(elementCenter - screenCenter);
      const activeRange = viewportHeight * 0.75;

      if (distanceFromCenter < activeRange) {
        // Ratio goes up to 1.0 when near center
        const ratio = 1 - distanceFromCenter / activeRange;
        if (ratio > maxVisibilityRatio) {
          maxVisibilityRatio = Math.min(Math.max(ratio, 0), 1);
        }
      }
    });

    // Smooth out ratio with ease curve
    const easedRatio = Math.pow(maxVisibilityRatio, 1.2);
    setIntensity(easedRatio);
  }, [manualOverride]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(calculateScrollIntensity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateScrollIntensity();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [calculateScrollIntensity]);

  // Update CSS Custom Properties whenever intensity changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--intensity-ratio', intensity.toFixed(3));

    // Base accent RGB: Teal/Emerald (13, 148, 136) in Normal state
    // Intense accent RGB: Fiery Orange (255, 85, 0) in Intense state
    const rNormal = 13, gNormal = 148, bNormal = 136;
    const rIntense = 255, gIntense = 85, bIntense = 0;

    const r = Math.round(rNormal + (rIntense - rNormal) * intensity);
    const g = Math.round(gNormal + (gIntense - gNormal) * intensity);
    const b = Math.round(bNormal + (bIntense - bNormal) * intensity);

    root.style.setProperty('--color-accent-rgb', `${r}, ${g}, ${b}`);
    root.style.setProperty('--color-accent', `rgb(${r}, ${g}, ${b})`);
    root.style.setProperty('--color-accent-glow', `rgba(${r}, ${g}, ${b}, ${0.15 + intensity * 0.35})`);
    root.style.setProperty('--contrast-boost', `${1 + intensity * 0.15}`);
  }, [intensity]);

  const toggleManualIntense = () => {
    setManualOverride(prev => {
      const next = !prev;
      if (next) {
        setIntensity(1.0);
      } else {
        setIntensity(0);
      }
      return next;
    });
  };

  return {
    intensity,
    isIntense: intensity > 0.4,
    manualOverride,
    toggleManualIntense
  };
}
