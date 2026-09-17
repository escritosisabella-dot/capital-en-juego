export interface AdminConcept {
  id: string;
  name: string;
  emoji: string;
  shortDesc: string;
  businessContext: string;
  gameContext: string;
  iconName: string;
  color: string;
}

export interface ObjectiveItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  metricLabel: string;
}

export interface GameRule {
  step: number;
  title: string;
  description: string;
  tacticalNote: string;
}

export interface CompanyProfile {
  id: 'empresa-a' | 'empresa-b';
  name: string;
  tag: string;
  badgeColor: string;
  capital: string;
  capitalCount: number;
  mission: string;
  strategyStars: number;
  teamworkStars: number;
  organizationStars: number;
  tacticalStyle: string;
  keyPairs: { role: string; focus: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campo' | 'equipos' | 'estrategia' | 'accion';
  imageUrl: string;
  caption: string;
}
