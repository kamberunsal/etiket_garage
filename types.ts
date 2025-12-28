export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HERO = 'hero',
  SERVICES = 'services',
  ABOUT = 'about',
  BLOG = 'blog',
  CONTACT = 'contact'
}