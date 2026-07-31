import type { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: "Muhammad Fajar Fristiawan",
  role: "Software Engineer",
  location: "Jombang, Jawa Timur",
  shortBio:
    "Software Engineer dengan fondasi kuat dari Lua Scripting — dulu diasah lewat scripting di game Growtopia (Executor Growlauncher), tanpa AI. Kini fokusok pada elektronika, server, dan pemecahan masalah; terasah lewat kompetisi JHIC & KRON.",
  fullBio: [
    "Saya seorang Software Engineer yang menikmati membedah masalah hingga ke akarnya. Dasar pemrograman saya lahir dari Lua Scripting: dulu saya belajar menulis script di game Growtopia menggunakan Executor Growlauncher — tanpa bantuan AI. Dari situ saya membangun fondasi logika, debugging, dan ketekunan yang masih saya bawa sampai sekarang.",
    "Di luar layar, saya sangat menyukai Elektronika, Server, dan Pemrograman. Pengalaman kompetisi (Top 30 JHIC 1.0 dan medali Perak KRON) mengajarkan ketelitian, ketenangan di bawah tekanan, dan debugging yang sistematis."
  ],
  avatarUrl: "/fajar-avatar.jpg",
  alterEgo: {
    name: "Aleph",
    role: "Elektronika · Server · Code",
    useMonogram: true,
    monogram: "A",
    quote: "Dari rangkaian ke logika — tekanan jadi bahan bakar.",
  },
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
    "Lua Scripting",
    "HTML & CSS",
    "C++",
    "Hardware",
    "Robotika",
  ],
};
