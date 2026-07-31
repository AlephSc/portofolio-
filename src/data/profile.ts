import type { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: "Muhammad Fajar Fristiawan",
  role: "Software Engineer",
  location: "Jombang, Jawa Timur",
  shortBio: "Software Engineer yang suka membedah masalah — dari elektronika & hardware hingga server, Lua, dan rekayasa prompt AI. Ketajaman teknis terasah lewat kompetisi JHIC dan KRON.",
  fullBio: [
    "Saya seorang Software Engineer yang menikmati membedah masalah hingga ke akarnya. Di luar layar, saya sangat menyukai Elektronika, Server, dan Pemrograman — tiga hobi yang saling mengisi: hardware, infrastruktur, dan logika kode.",
    "Dari menulis kode Lua hingga merancang prompt yang efektif untuk model AI, saya percaya pemahaman fondasi yang kuat adalah kunci setiap solusi yang tahan lama. Pengalaman kompetisi (Top 30 JHIC 1.0 dan medali Perak KRON) mengajarkan ketelitian, ketenangan di bawah tekanan, dan debugging yang sistematis."
  ],
  // Filename baru memaksa bypass cache production (Vercel/CDN/browser)
  avatarUrl: "/fajar-avatar.jpg",
  stats: [
    { label: "Kompetisi", value: "2", subtext: "JHIC & KRON" },
    { label: "JHIC 1.0", value: "Top 30", subtext: "Finalis" },
    { label: "KRON", value: "Perak", subtext: "Medali Robotika" }
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com/AlephSc", username: "AlephSc" },
    { platform: "WhatsApp", url: "https://wa.me/6281515135960", username: "081515135960" },
    { platform: "Instagram", url: "https://instagram.com/alepjir", username: "alepjir" },
    { platform: "Email", url: "mailto:alephsc25@gmail.com", username: "alephsc25@gmail.com" }
  ],
  contactEmail: "alephsc25@gmail.com",
  tags: [
    "Elektronika",
    "Server",
    "Pemrograman",
    "Lua",
    "HTML & CSS",
    "C++",
    "Hardware",
    "Robotika",
  ],
};
