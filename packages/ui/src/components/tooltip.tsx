'use client';

import { Tooltip as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';

export function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  return (
    <Primitive.Provider delayDuration={350}>
      <Primitive.Root>
        <Primitive.Trigger asChild>{children}</Primitive.Trigger>
        <Primitive.Portal>
          <Primitive.Content
            sideOffset={8}
            className="z-[70] max-w-64 rounded-md border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-sm"
          >
            {content}
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </Primitive.Provider>
  );
}
