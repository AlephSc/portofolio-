import { MotionConfig } from 'framer-motion';
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

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { isIntense, manualIntense, toggleManualIntense } = useScrollIntensity();

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-app-root">
        <AmbientBackground isIntense={isIntense} />

        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
        />

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
      </div>
    </MotionConfig>
  );
}

export default App;
