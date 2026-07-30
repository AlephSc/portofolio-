import type { TimelineItem } from '../types';

export const experiencesData: TimelineItem[] = [
  {
    id: 'exp-jhic',
    year: '2025',
    quarter: 'Agustus',
    title: 'JHIC 1.0 — Top 30',
    category: 'Competition',
    role: 'Finalis Top 30',
    description: 'Mengikuti kompetisi JHIC 1.0 dan berhasil menembus peringkat 30 besar di antara peserta lain.',
    highlights: [
      'Menembus Top 30 pada JHIC 1.0',
      'Menyelesaikan serangkaian tantangan problem solving & debugging di bawah tekanan waktu'
    ],
    technologies: ['Problem Solving', 'Debugging', 'Algoritma'],
    metrics: 'Top 30 JHIC 1.0',
    isIntenseMoment: false
  },
  {
    id: 'exp-kron',
    year: '2025',
    quarter: 'Oktober',
    title: 'Kompetisi Robotika Nusantara (KRON) — Medali Perak',
    category: 'Competition',
    role: 'Medalis Perak',
    description: 'Bertanding di Kompetisi Robotika Nusantara (KRON) dan meraih medali perak sebagai pengakuan prestasi.',
    highlights: [
      'Meraih medali Perak di Kompetisi Robotika Nusantara (KRON)',
      'Membangun dan memprogram sistem robotika yang stabil di lapangan'
    ],
    technologies: ['Robotika', 'Pemrograman', 'Sistem Terkendali'],
    metrics: 'Medali Perak KRON',
    isIntenseMoment: true
  }
];
