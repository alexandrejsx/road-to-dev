'use client';

import { ScrollArea as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function ScrollArea({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Primitive.Root
      className={cn('relative min-h-0 overflow-hidden', className)}
    >
      <Primitive.Viewport className="size-full">{children}</Primitive.Viewport>
      <Primitive.Scrollbar
        orientation="vertical"
        className="flex w-2.5 touch-none select-none p-0.5"
      >
        <Primitive.Thumb className="relative flex-1 rounded-full bg-border" />
      </Primitive.Scrollbar>
    </Primitive.Root>
  );
}
