import { useState, useEffect, useCallback } from 'react';

export function useScrollIntensity() {
  const [scrollIntense, setScrollIntense] = useState(false);
  const [manualIntense, setManualIntense] = useState(false);

  // Scroll-driven: true when any intense trigger sits near viewport center
  useEffect(() => {
    const check = () => {
      const els = document.querySelectorAll('[data-intense-trigger="true"]');
      let any = false;
      const vh = window.innerHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.6 && r.bottom > vh * 0.4) any = true;
      });
      setScrollIntense(any);
    };

    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  const isIntense = scrollIntense || manualIntense;

  // Apply global data-mode → CSS @property transitions handle the smooth shift
  useEffect(() => {
    const root = document.documentElement;
    if (isIntense) root.setAttribute('data-mode', 'intense');
    else root.removeAttribute('data-mode');
  }, [isIntense]);

  const toggleManualIntense = useCallback(() => {
    setManualIntense(prev => !prev);
  }, []);

  return { isIntense, manualIntense, toggleManualIntense };
}
