import type { HobbyItem } from '../types';

export const hobbiesData: HobbyItem[] = [
  {
    id: 'hobby-elektronika',
    name: 'Elektronika',
    description: 'Merakit, mengamati, dan memahami rangkaian — dari komponen dasar hingga sistem yang hidup di atas hardware nyata.',
    iconName: 'circuit',
  },
  {
    id: 'hobby-server',
    name: 'Server',
    description: 'Mengotak-atik software server, mempelajari cara kerja hosting, dan menjalankan game server lewat cloud provider atau VPS — dari setup hingga coba-coba konfigurasi.',
    iconName: 'server',
  },
  {
    id: 'hobby-programming',
    name: 'Pemrograman',
    description: 'Menulis logika, memecah masalah, dan mengubah ide menjadi kode yang bisa dijalankan — dari Lua hingga script utilitas.',
    iconName: 'code',
  },
];
