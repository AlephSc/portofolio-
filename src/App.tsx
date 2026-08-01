import { MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollIntensity } from './hooks/useScrollIntensity';

import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Profile } from './components/Profile';
import { Education } from './components/Education';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LightningOverlay } from './components/LightningOverlay';
import { LoadingScreen } from './components/LoadingScreen';

type StrikeState = {
  tick: number;
  color: 'blue' | 'orange';
} | null;

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { isIntense, manualIntense, toggleManualIntense } = useScrollIntensity();

  const [showEntrance, setShowEntrance] = useState(true);
  const [entranceDone, setEntranceDone] = useState(false);
  const [strike, setStrike] = useState<StrikeState>(null);
  const prevIntense = useRef<boolean | null>(null);

  const handleEntranceComplete = useCallback(() => {
    setShowEntrance(false);
    setEntranceDone(true);
  }, []);

  const handleStrikeComplete = useCallback(() => {
    setStrike(null);
  }, []);

  // Scroll lock while loading screen is up
  useEffect(() => {
    const root = document.documentElement;
    if (showEntrance) {
      root.setAttribute('data-loading', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      root.removeAttribute('data-loading');
      document.body.style.overflow = '';
    }
    return () => {
      root.removeAttribute('data-loading');
      document.body.style.overflow = '';
    };
  }, [showEntrance]);

  useEffect(() => {
    if (!entranceDone) return;
    if (prevIntense.current === null) {
      prevIntense.current = isIntense;
      return;
    }
    if (prevIntense.current !== isIntense) {
      prevIntense.current = isIntense;
      setStrike({
        tick: Date.now(),
        color: isIntense ? 'orange' : 'blue',
      });
    }
  }, [isIntense, entranceDone]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-app-root">
        <AmbientBackground isIntense={isIntense} />

        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <main style={{ position: 'relative', zIndex: 10 }}>
          <Hero isFlipped={manualIntense} onFlip={toggleManualIntense} />
          <TechMarquee />
          <Profile />
          <Education />
          <Timeline />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />

        {showEntrance && (
          <LoadingScreen onComplete={handleEntranceComplete} />
        )}

        {strike && (
          <LightningOverlay
            key={strike.tick}
            color={strike.color}
            onComplete={handleStrikeComplete}
          />
        )}
      </div>
    </MotionConfig>
  );
}

export default App;
