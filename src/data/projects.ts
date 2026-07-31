import type { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-leptopia-portfolio',
    title: 'Leptopia — Personal Portfolio',
    subtitle: 'Visual narrative portfolio dengan emotion-driven color system',
    year: '2026',
    category: 'Frontend / Architecture',
    description:
      'Website portofolio pribadi pertama saya. Dibangun sebagai single-page app yang menceritakan perjalanan teknis lewat scroll, timeline kompetisi, roadmap pendidikan, dan mode warna biru ↔ oranye — live di domain kustom leptopia.web.id (Vercel).',
    architecture:
      'React 19 + TypeScript + Vite. Styling murni CSS Custom Properties (tanpa Tailwind). Mode warna global via html[data-mode] + @property transition. Konten data-driven di src/data/* terpisah dari komponen UI. Hosting Vercel + custom domain.',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Framer Motion',
      'CSS Variables',
      'Vercel',
    ],
    status: 'Production',
    githubUrl: 'https://github.com/AlephSc/portofolio-',
    liveUrl: 'https://leptopia.web.id',
    featured: true,
    highlights: [
      'Emotion color system: biru (focus) ↔ oranye (intense), flip foto + auto cycle',
      'Timeline kompetisi JHIC & KRON, roadmap sekolah, hobi elektronika/server/code',
      'Dark/light mode dengan localStorage; MotionConfig reduced-motion',
      'Deploy production di Vercel dengan domain leptopia.web.id',
    ],
  },
];
