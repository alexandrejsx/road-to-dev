import type { CategoryId, SkillId } from './types';

export const NODE_WIDTH = 176;
export const NODE_HEIGHT = 136;

export const regions: Record<
  CategoryId,
  { x: number; y: number; width: number; height: number }
> = {
  knowledge: { x: 0, y: 0, width: 336, height: 640 },
  strategy: { x: 384, y: 0, width: 336, height: 640 },
  creation: { x: 768, y: 0, width: 336, height: 640 },
};

export const positions: Record<SkillId, { x: number; y: number }> = {
  logic: { x: 64, y: 112 },
  variables: { x: 120, y: 296 },
  conditions: { x: 64, y: 480 },
  decompose: { x: 456, y: 112 },
  debug: { x: 504, y: 296 },
  plan: { x: 448, y: 480 },
  prompts: { x: 896, y: 112 },
  'first-program': { x: 840, y: 296 },
  project: { x: 896, y: 480 },
};

type EdgeRoute = {
  sourceHandle: 'bottom' | 'right';
  targetHandle: 'top' | 'left';
  corridorY?: number;
  corridorX?: number;
};

/** Routing metadata only. Edges themselves are derived from prerequisite IDs. */
export const crossCategoryRoutes: Partial<
  Record<`${SkillId}:${SkillId}`, EdgeRoute>
> = {
  'variables:debug': { sourceHandle: 'right', targetHandle: 'left' },
  'variables:first-program': {
    sourceHandle: 'right',
    targetHandle: 'left',
    corridorY: 276,
    corridorX: 360,
  },
  'decompose:first-program': {
    sourceHandle: 'bottom',
    targetHandle: 'top',
    corridorY: 260,
  },
};
