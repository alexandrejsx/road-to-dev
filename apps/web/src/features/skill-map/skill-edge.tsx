'use client';

import {
  BaseEdge,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
} from '@xyflow/react';

export type SkillFlowEdge = Edge<
  {
    fulfilled: boolean;
    highlighted: boolean;
    color: string;
    corridorY?: number;
    corridorX?: number;
  },
  'skill'
>;

function roundPath(points: [number, number][]) {
  const first = points[0];
  if (!first) return '';
  let path = `M ${first[0]} ${first[1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const previous = points[i - 1];
    const current = points[i];
    const next = points[i + 1];
    if (!previous || !current || !next) continue;
    const distanceIn = Math.hypot(
      current[0] - previous[0],
      current[1] - previous[1],
    );
    const distanceOut = Math.hypot(next[0] - current[0], next[1] - current[1]);
    const radius = Math.min(8, distanceIn / 2, distanceOut / 2);
    const before = [
      current[0] - Math.sign(current[0] - previous[0]) * radius,
      current[1] - Math.sign(current[1] - previous[1]) * radius,
    ];
    const after = [
      current[0] + Math.sign(next[0] - current[0]) * radius,
      current[1] + Math.sign(next[1] - current[1]) * radius,
    ];
    path += ` L ${before[0]} ${before[1]} Q ${current[0]} ${current[1]} ${after[0]} ${after[1]}`;
  }
  const last = points.at(-1);
  return last ? `${path} L ${last[0]} ${last[1]}` : path;
}

export function SkillEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<SkillFlowEdge>) {
  if (!data) return null;
  const [smoothPath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
    ...(data.corridorY === undefined ? {} : { centerY: data.corridorY }),
  });
  const path =
    data.corridorX !== undefined && data.corridorY !== undefined
      ? roundPath([
          [sourceX, sourceY],
          [data.corridorX, sourceY],
          [data.corridorX, data.corridorY],
          [targetX - 40, data.corridorY],
          [targetX - 40, targetY],
          [targetX, targetY],
        ])
      : smoothPath;
  return (
    <BaseEdge
      id={id}
      path={path}
      {...(markerEnd ? { markerEnd } : {})}
      interactionWidth={0}
      style={{
        stroke: data.color,
        strokeWidth: data.highlighted ? 2.5 : 1.7,
        strokeDasharray: data.fulfilled ? undefined : '5 6',
        opacity: data.highlighted || !data.fulfilled ? 1 : 0.85,
      }}
    />
  );
}
