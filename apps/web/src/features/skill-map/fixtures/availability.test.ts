import { describe, expect, it } from 'vitest';
import { getFixtureStatus, isFixtureRequirementMet } from './availability';
import { progress } from './progress';
import { skills } from './skills';
import type { SkillId } from '../types';

describe('pré-requisitos da demonstração local', () => {
  it('exige o nível mínimo mesmo quando a meta anterior já foi atingida', () => {
    expect(progress.skills.variables.stage).toBe('achieved');
    expect(getFixtureStatus(skills.conditions, progress)).toBe('locked');
    expect(
      getFixtureStatus(skills.conditions, {
        ...progress,
        skills: {
          ...progress.skills,
          variables: { stage: 'achieved', level: 2 },
        },
      }),
    ).toBe('available');
  });

  it('combina requisitos de categorias diferentes e mantém entradas independentes', () => {
    expect(getFixtureStatus(skills['first-program'], progress)).toBe(
      'available',
    );
    expect(
      getFixtureStatus(skills['first-program'], {
        ...progress,
        skills: {
          ...progress.skills,
          decompose: { stage: 'developing', level: 0 },
        },
      }),
    ).toBe('locked');
    expect(getFixtureStatus(skills.prompts, progress)).toBe('available');
    expect(isFixtureRequirementMet({ skillId: 'decompose' }, progress)).toBe(
      false,
    );
    expect(
      isFixtureRequirementMet(
        { skillId: 'decompose', minimumLevel: 1 },
        progress,
      ),
    ).toBe(true);
  });

  it('mantém o grafo da fixture sem ciclos ou referências inexistentes', () => {
    const visited = new Set<SkillId>();
    const path = new Set<SkillId>();
    function visit(id: SkillId) {
      expect(skills[id], `Referência inexistente: ${id}`).toBeDefined();
      expect(path.has(id), `Ciclo em ${id}`).toBe(false);
      if (visited.has(id)) return;
      path.add(id);
      for (const requirement of skills[id].prerequisites)
        visit(requirement.skillId);
      path.delete(id);
      visited.add(id);
    }
    for (const skill of Object.values(skills)) visit(skill.id);
  });
});
