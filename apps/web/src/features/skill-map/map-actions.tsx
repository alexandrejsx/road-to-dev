'use client';

import { createContext, useContext } from 'react';
import type { SkillId } from './types';

export const MapActionsContext = createContext<{
  selectSkill: (id: SkillId) => void;
  revealNode: (id: SkillId) => void;
} | null>(null);

export function useMapActions() {
  const actions = useContext(MapActionsContext);
  if (!actions)
    throw new Error('Skill nodes must be inside the map actions provider.');
  return actions;
}
