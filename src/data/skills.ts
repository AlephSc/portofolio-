import type { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'skill-cat-languages',
    categoryName: 'Bahasa & Markup',
    description: 'Bahasa yang dipakai untuk membangun antarmuka, logika, dan eksperimen sistem.',
    skills: [
      { name: 'HTML', level: 'Proficient', description: 'Struktur semantik, aksesibilitas dasar, dan markup bersih' },
      { name: 'CSS', level: 'Proficient', description: 'Layout, theming, dan presentasi visual responsif' },
      { name: 'C++', level: 'Proficient', description: 'Logika program, struktur data dasar, dan pemrograman berorientasi sistem' },
      { name: 'Python', level: 'Exploring', description: 'Scripting dan eksperimen — masih dalam tahap eksplorasi' },
      {
        name: 'Lua Scripting',
        level: 'Advanced',
        description:
          'Fondasi dari scripting di game Growtopia (Executor Growlauncher) — dipelajari tanpa AI; sintaks, tabel, metatables, dan alur logika',
      },
    ],
  },
  {
    id: 'skill-cat-fundamentals',
    categoryName: 'Dasar Pemrograman',
    description: 'Fondasi keterampilan teknis yang berlaku lintas bahasa.',
    skills: [
      { name: 'Debugging', level: 'Proficient', description: 'Analisis error, tracing alur, dan isolasi akar masalah' },
      { name: 'Problem Solving', level: 'Proficient', description: 'Dekomposisi masalah & penyusunan solusi algoritmik' },
    ],
  },
  {
    id: 'skill-cat-ai',
    categoryName: 'AI & Teknologi Modern',
    description: 'Pemanfaatan model bahasa dan teknik rekayasa prompt.',
    skills: [
      { name: 'AI Prompt Engineering', level: 'Proficient', description: 'Perancangan prompt efektif untuk model bahasa besar' },
    ],
  },
];
