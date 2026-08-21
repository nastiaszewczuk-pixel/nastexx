export type TabId = 'ABOUT' | 'EXP' | 'SKILLS' | 'COMMS' | 'REEL';

export interface TabOption {
  id: TabId;
  label: string;
  code: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  metrics?: string;
  points: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
