import type { ComponentProps } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Circle,
  Clock3,
  Info,
  LocateFixed,
  LockKeyhole,
  Map,
  Minus,
  Play,
  Plus,
  X,
} from 'lucide-react';

const icons = {
  close: X,
  check: Check,
  lock: LockKeyhole,
  arrow: ArrowRight,
  chevron: ChevronRight,
  plus: Plus,
  minus: Minus,
  fit: LocateFixed,
  play: Play,
  progress: Clock3,
  map: Map,
  info: Info,
  circle: Circle,
} as const;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  size = 18,
  ...props
}: Omit<ComponentProps<'svg'>, 'name'> & { name: IconName; size?: number }) {
  const Component = icons[name];
  return (
    <Component size={size} strokeWidth={1.7} aria-hidden="true" {...props} />
  );
}
