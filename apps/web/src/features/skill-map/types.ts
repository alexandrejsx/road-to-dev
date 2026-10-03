import type { PixelIconName } from '@road-to-dev/ui/lib/pixel-assets';
import type { IconName } from '@road-to-dev/ui/components/icon';

export type CategoryId = 'knowledge' | 'strategy' | 'creation';
export type SkillId =
  | 'logic'
  | 'variables'
  | 'conditions'
  | 'decompose'
  | 'debug'
  | 'plan'
  | 'first-program'
  | 'project'
  | 'prompts';
export type SkillStatus = 'available' | 'developing' | 'achieved' | 'locked';
export type Activity = {
  id: string;
  name: string;
  type: 'Leitura' | 'Exercício' | 'Prática';
  description: string;
};
export type Prerequisite = { skillId: SkillId; minimumLevel?: number };
export type SkillDefinition = {
  id: SkillId;
  name: string;
  category: CategoryId;
  world: 'inicial';
  icon: PixelIconName;
  description: string;
  prerequisites: readonly Prerequisite[];
  activities: readonly Activity[];
  rewards: { xp: number; coins: number; item?: string };
};
export type SkillProgress = {
  stage: 'not-started' | 'developing' | 'achieved';
  level: number;
};
export type ProgressSnapshot = {
  skills: Readonly<Record<SkillId, SkillProgress>>;
  activities: Readonly<
    Record<string, 'not-started' | 'developing' | 'achieved'>
  >;
};

export const categories = {
  knowledge: { name: 'Conhecimento', icon: 'book' },
  strategy: { name: 'Estratégia', icon: 'compass' },
  creation: { name: 'Criação', icon: 'terminal' },
} as const;

export const statusLabels: Record<SkillStatus, string> = {
  available: 'Disponível',
  developing: 'Em desenvolvimento',
  achieved: 'Meta atingida',
  locked: 'Bloqueada',
};

export const statusIcons: Record<SkillStatus, IconName> = {
  available: 'circle',
  developing: 'progress',
  achieved: 'check',
  locked: 'lock',
};
