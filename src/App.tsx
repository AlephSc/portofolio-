import { MotionConfig } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useScrollIntensity } from './hooks/useScrollIntensity';

import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Profile } from './components/Profile';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { intensity, isIntense, toggleManualIntense } = useScrollIntensity();

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-app-root">
        {/* Ambient background with floating glowing orbs, noise grain & cyber grid */}
        <AmbientBackground isIntense={isIntense} />

        {/* Navigation Header */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          isIntense={isIntense}
          intensityRatio={intensity}
          onToggleManualIntense={toggleManualIntense}
        />

        {/* Main Content Sections */}
        <main style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
          <TechMarquee />
          <Profile />
          <Timeline />
          <Projects />
          <Skills />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
