import type { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: "Muhammad Fajar Fristiawan",
  role: "Software Engineer",
  location: "Jombang, Jawa Timur",
  shortBio: "Software Engineer dengan fokus pada pemecahan masalah, pemrograman Lua, dan rekayasa prompt AI — ketajaman teknis terasah lewat kompetisi seperti JHIC dan KRON.",
  fullBio: [
    "Saya seorang Software Engineer yang menikmati membedah masalah hingga ke akarnya. Dari menulis kode Lua hingga merancang prompt yang efektif untuk model AI, saya percaya pemahaman fondasi yang kuat adalah kunci setiap solusi yang tahan lama.",
    "Pengalaman saya terasah melalui kompetisi: menembus Top 30 JHIC 1.0 dan meraih medali Perak di Kompetisi Robotika Nusantara (KRON). Setiap kompetisi mengajarkan ketelitian, ketenangan di bawah tekanan, dan seni debugging yang sistematis."
  ],
  avatarUrl: "/profile.jpg",
  stats: [
    { label: "Kompetisi", value: "2", subtext: "JHIC & KRON" },
    { label: "JHIC 1.0", value: "Top 30", subtext: "Finalis" },
    { label: "KRON", value: "Perak", subtext: "Medali Robotika" }
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com/AlephSc", username: "AlephSc" },
    { platform: "Email", url: "mailto:alephsc25@gmail.com", username: "alephsc25@gmail.com" }
  ],
  contactEmail: "alephsc25@gmail.com"
};
