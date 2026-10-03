'use client';

import { Badge } from '@road-to-dev/ui/components/badge';
import { Button } from '@road-to-dev/ui/components/button';
import { Icon } from '@road-to-dev/ui/components/icon';
import { PixelIcon } from '@road-to-dev/ui/components/pixel-icon';
import { ScrollArea } from '@road-to-dev/ui/components/scroll-area';
import { Separator } from '@road-to-dev/ui/components/separator';
import { SheetTitle, SheetDescription } from '@road-to-dev/ui/components/sheet';
import {
  getFixtureStatus,
  isFixtureRequirementMet,
} from './fixtures/availability';
import { progress } from './fixtures/progress';
import { skills } from './fixtures/skills';
import {
  categories,
  statusLabels,
  statusIcons,
  type Activity,
  type SkillDefinition,
  type SkillId,
} from './types';

type DetailsProps = {
  skill: SkillDefinition;
  modal: boolean;
  onClose: () => void;
  onSelect: (id: SkillId) => void;
  onActivity: (activity: Activity) => void;
};

export function SkillDetailsPanel({
  skill,
  modal,
  onClose,
  onSelect,
  onActivity,
}: DetailsProps) {
  const status = getFixtureStatus(skill, progress);
  const requirements = skill.prerequisites;
  const met = requirements.filter((requirement) =>
    isFixtureRequirementMet(requirement, progress),
  ).length;
  const nextActivity =
    skill.activities.find(
      (activity) => progress.activities[activity.id] !== 'achieved',
    ) ?? skill.activities[0];
  const Heading = modal ? SheetTitle : 'h2';
  const Description = modal ? SheetDescription : 'p';

  function handlePrimaryAction() {
    if (status === 'locked') {
      const pending = requirements.find(
        (requirement) => !isFixtureRequirementMet(requirement, progress),
      );
      if (pending) onSelect(pending.skillId);
    } else if (nextActivity) onActivity(nextActivity);
  }

  return (
    <div className="skill-details" data-category={skill.category}>
      <div className="details-topline">
        <span>DETALHES DA SKILL</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Fechar detalhes da skill"
        >
          <Icon name="close" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="details-body">
          <div className="detail-emblem">
            <PixelIcon name={skill.icon} size={48} />
          </div>
          <Heading
            {...(modal ? {} : { id: 'skill-details-title' })}
            className="detail-title"
          >
            {skill.name}
          </Heading>
          <div className="detail-badges">
            <Badge className="category-badge">
              {categories[skill.category].name}
            </Badge>
            <span className="detail-status">
              <Icon name={statusIcons[status]} size={14} />
              {statusLabels[status]}
            </span>
          </div>
          <Description className="detail-description">
            {skill.description}
          </Description>
          <span className="level-caption">
            Nível atual <strong>{progress.skills[skill.id].level}</strong>
            <span aria-hidden="true"> · </span>Desenvolvimento gradual
          </span>
          <Separator />

          <section
            aria-labelledby="requirements-title"
            className="detail-section"
          >
            <div className="section-heading">
              <h3 id="requirements-title">Pré-requisitos</h3>
              {requirements.length > 0 && (
                <span>
                  {met} de {requirements.length}
                </span>
              )}
            </div>
            {requirements.length === 0 ? (
              <p className="independent-message">
                <Icon name="check" size={16} />
                Entrada livre. Sem pré-requisitos.
              </p>
            ) : (
              <ul className="requirement-list">
                {requirements.map((requirement) => {
                  const source = skills[requirement.skillId];
                  const satisfied = isFixtureRequirementMet(
                    requirement,
                    progress,
                  );
                  return (
                    <li key={source.id}>
                      <button
                        className="requirement-button"
                        onClick={() => onSelect(source.id)}
                        aria-label={`Explorar requisito ${source.name}, ${satisfied ? 'atendido' : 'pendente'}${requirement.minimumLevel === undefined ? '' : `, nível mínimo ${requirement.minimumLevel}, atual ${progress.skills[source.id].level}`}`}
                      >
                        <span
                          className={
                            satisfied
                              ? 'requirement-met'
                              : 'requirement-pending'
                          }
                        >
                          <Icon name={satisfied ? 'check' : 'lock'} size={17} />
                        </span>
                        <span className="requirement-copy">
                          <strong>{source.name}</strong>
                          <span>
                            {requirement.minimumLevel === undefined
                              ? 'Meta atingida'
                              : `Nível ${requirement.minimumLevel} · atual ${progress.skills[source.id].level}`}
                            <span className="sr-only">
                              {' '}
                              — {satisfied ? 'Atendido' : 'Pendente'}
                            </span>
                          </span>
                        </span>
                        <Icon name="chevron" size={15} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          <Separator />

          <section
            aria-labelledby="activities-title"
            className="detail-section"
          >
            <div className="section-heading">
              <h3 id="activities-title">Atividades</h3>
              <span>{skill.activities.length}</span>
            </div>
            <ol className="activity-list">
              {skill.activities.map((activity, index) => {
                const state = progress.activities[activity.id] ?? 'not-started';
                const activityLabel =
                  status === 'locked'
                    ? 'Bloqueada'
                    : state === 'achieved'
                      ? 'Concluída'
                      : state === 'developing'
                        ? 'Em andamento'
                        : 'A iniciar';
                return (
                  <li key={activity.id}>
                    <button
                      className="activity-button"
                      disabled={status === 'locked'}
                      onClick={() => onActivity(activity)}
                      aria-label={`${activity.name} — ${activity.type}, ${activityLabel}`}
                    >
                      <span className="activity-number">
                        {state === 'achieved' ? (
                          <Icon name="check" size={15} />
                        ) : (
                          String(index + 1).padStart(2, '0')
                        )}
                      </span>
                      <span className="activity-copy">
                        <strong>{activity.name}</strong>
                        <span>
                          {activity.type}
                          <span aria-hidden="true"> · </span>
                          {activityLabel}
                        </span>
                      </span>
                      <Icon
                        name={status === 'locked' ? 'lock' : 'chevron'}
                        size={14}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
          <Separator />

          <section aria-labelledby="rewards-title" className="detail-section">
            <div className="section-heading">
              <h3 id="rewards-title">Recompensas</h3>
              <span>Exemplo</span>
            </div>
            <div className="reward-values">
              <div>
                <strong>
                  {skill.rewards.xp}
                  <span> XP</span>
                </strong>
                <span>Experiência</span>
              </div>
              <div>
                <strong>
                  <PixelIcon name="coin" size={24} />
                  {skill.rewards.coins}
                </strong>
                <span>Moedas</span>
              </div>
            </div>
            {skill.rewards.item && (
              <p className="reward-item">
                <PixelIcon name="project" size={24} />
                {skill.rewards.item}
              </p>
            )}
          </section>
        </div>
      </ScrollArea>
      <div className="details-footer">
        {status === 'locked' && (
          <p>
            Desenvolva os requisitos pendentes para seguir por este caminho.
          </p>
        )}
        <Button className="w-full" onClick={handlePrimaryAction}>
          {status === 'locked'
            ? 'Explorar requisitos'
            : status === 'developing'
              ? 'Continuar'
              : status === 'achieved'
                ? 'Revisitar'
                : 'Começar'}
          <Icon name="arrow" size={17} />
        </Button>
        <span className="demo-caption">
          Prévia local · progresso não é salvo
        </span>
      </div>
    </div>
  );
}
