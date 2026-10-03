'use client';

import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '../lib/utils';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'icon';
  asChild?: boolean;
};

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button';
  return (
    <Component
      data-slot="button"
      className={cn(
        'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-180 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-primary text-primary-foreground hover:bg-[var(--rtd-primary-hover)]',
        variant === 'secondary' &&
          'border border-border bg-card text-foreground hover:bg-muted',
        variant === 'ghost' &&
          'text-muted-foreground hover:bg-muted hover:text-foreground',
        size === 'icon' ? 'size-11' : 'px-4 py-3',
        className,
      )}
      {...props}
    />
  );
}
