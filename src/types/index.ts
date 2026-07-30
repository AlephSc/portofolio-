export type Theme = 'dark' | 'light';

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  shortBio: string;
  fullBio: string[];
  avatarUrl: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  socials: {
    platform: string;
    url: string;
    username: string;
  }[];
  contactEmail: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  quarter?: string;
  title: string;
  category: 'Foundation' | 'Breakthrough' | 'High Stakes' | 'Architecture' | 'Current Focus' | 'Competition';
  role: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics?: string;
  isIntenseMoment?: boolean; // Triggers intense orange state when scrolled into view
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  description: string;
  architecture: string;
  technologies: string[];
  status: 'Production' | 'Active Development' | 'Completed';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Exploring';
    description?: string;
    iconName?: string;
  }[];
}
