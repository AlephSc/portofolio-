import { useState, useEffect, useCallback, useRef } from 'react';

/** Interval ganti warna global biru ↔ oranye */
const ALTERNATE_MS = 10_000;

/**
 * Dual-palette cycle:
 * - false  → biru (default / focus)
 * - true   → oranye (intense)
 *
 * Auto-toggle setiap 10 detik (selalu aktif — ini theme shift, bukan motion).
 * Flip foto profil tetap bisa toggle manual dan mereset timer.
 */
export function useScrollIntensity() {
  const [isIntense, setIsIntense] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAlternate = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIsIntense(prev => !prev);
    }, ALTERNATE_MS);
  }, [clearTimer]);

  // Apply global data-mode for CSS palette
  useEffect(() => {
    const root = document.documentElement;
    if (isIntense) {
      root.setAttribute('data-mode', 'intense');
    } else {
      root.removeAttribute('data-mode');
    }
  }, [isIntense]);

  // Start auto-cycle on mount; always run (color alternation is intentional UX)
  useEffect(() => {
    startAlternate();
    return () => clearTimer();
  }, [startAlternate, clearTimer]);

  const toggleManualIntense = useCallback(() => {
    setIsIntense(prev => !prev);
    startAlternate();
  }, [startAlternate]);

  return {
    isIntense,
    /** alias: same as isIntense — used by Hero flip state */
    manualIntense: isIntense,
    toggleManualIntense,
  };
}
