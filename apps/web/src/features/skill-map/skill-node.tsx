'use client';

import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { Icon } from '@road-to-dev/ui/components/icon';
import { PixelIcon } from '@road-to-dev/ui/components/pixel-icon';
import {
  categories,
  statusLabels,
  statusIcons,
  type SkillDefinition,
  type SkillStatus,
} from './types';
import { useMapActions } from './map-actions';

export type SkillFlowNode = Node<
  {
    skill: SkillDefinition;
    status: SkillStatus;
  },
  'skill'
>;

export function SkillNode({ data, selected }: NodeProps<SkillFlowNode>) {
  const { skill, status } = data;
  const { selectSkill, revealNode } = useMapActions();
  return (
    <div data-category={skill.category}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      <button
        id={`skill-${skill.id}`}
        className="skill-node nodrag nopan"
        data-status={status}
        data-selected={selected}
        aria-label={`${skill.name}, ${categories[skill.category].name}, ${statusLabels[status]}`}
        aria-pressed={selected}
        onClick={() => selectSkill(skill.id)}
        onFocus={() => revealNode(skill.id)}
      >
        <PixelIcon name={skill.icon} size={48} />
        <span className="skill-node-name">{skill.name}</span>
        <span className="skill-node-status">
          <Icon name={statusIcons[status]} size={13} />
          {statusLabels[status]}
        </span>
      </button>
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}
