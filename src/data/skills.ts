import type { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'skill-cat-languages',
    categoryName: 'Bahasa Pemrograman',
    description: 'Bahasa yang dikuasai untuk membangun logika dan sistem.',
    skills: [
      { name: 'Lua', level: 'Advanced', description: 'Penguasaan sintaks, tabel, metatables, dan coroutine' }
    ]
  },
  {
    id: 'skill-cat-fundamentals',
    categoryName: 'Dasar Pemrograman',
    description: 'Fondasi keterampilan teknis yang berlaku lintas bahasa.',
    skills: [
      { name: 'Debugging', level: 'Proficient', description: 'Analisis error, tracing alur, dan isolasi akar masalah' },
      { name: 'Problem Solving', level: 'Proficient', description: 'Dekomposisi masalah & penyusunan solusi algoritmik' }
    ]
  },
  {
    id: 'skill-cat-ai',
    categoryName: 'AI & Teknologi Modern',
    description: 'Pemanfaatan model bahasa dan teknik rekayasa prompt.',
    skills: [
      { name: 'AI Prompt Engineering', level: 'Proficient', description: 'Perancangan prompt efektif untuk model bahasa besar' }
    ]
  }
];
