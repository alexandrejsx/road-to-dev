import type { ProgressSnapshot } from '../types';

/** Fixed presentation snapshot. Nothing in the UI grants or persists rewards. */
export const progress: ProgressSnapshot = {
  skills: {
    logic: { stage: 'achieved', level: 2 },
    variables: { stage: 'achieved', level: 1 },
    conditions: { stage: 'not-started', level: 0 },
    decompose: { stage: 'developing', level: 1 },
    debug: { stage: 'not-started', level: 0 },
    plan: { stage: 'not-started', level: 0 },
    'first-program': { stage: 'not-started', level: 0 },
    project: { stage: 'not-started', level: 0 },
    prompts: { stage: 'not-started', level: 0 },
  },
  activities: {
    'logic-patterns': 'achieved',
    'variables-values': 'achieved',
    'decompose-read': 'achieved',
    'decompose-parts': 'developing',
  },
};

export const demoBalances = { xp: '1.280', coins: '240' } as const;
