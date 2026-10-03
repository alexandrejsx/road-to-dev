import type {
  Prerequisite,
  ProgressSnapshot,
  SkillDefinition,
  SkillStatus,
} from '../types';

/** Fixture adapter only. Production availability will be provided by the API. */
export function isFixtureRequirementMet(
  requirement: Prerequisite,
  snapshot: ProgressSnapshot,
): boolean {
  const current = snapshot.skills[requirement.skillId];
  if (!current) return false;
  return requirement.minimumLevel === undefined
    ? current.stage === 'achieved'
    : current.level >= requirement.minimumLevel;
}

export function getFixtureStatus(
  skill: SkillDefinition,
  snapshot: ProgressSnapshot,
): SkillStatus {
  if (
    !skill.prerequisites.every((requirement) =>
      isFixtureRequirementMet(requirement, snapshot),
    )
  )
    return 'locked';
  const current = snapshot.skills[skill.id];
  return current.stage === 'not-started' ? 'available' : current.stage;
}
