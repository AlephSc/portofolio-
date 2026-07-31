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
  tags?: string[];
}

export interface EducationItem {
  id: string;
  stage: 'SD' | 'SMP' | 'SMK' | string;
  school: string;
  location?: string;
  note?: string;
}

export interface HobbyItem {
  id: string;
  name: string;
  description: string;
  iconName?: 'circuit' | 'server' | 'code';
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
  /** Visual highlight on timeline card only — does not trigger global intense mode */
  isIntenseMoment?: boolean;
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
